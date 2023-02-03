import { UnifiAuth } from './UnifiAuth';
import axios, { AxiosInstance, AxiosRequestConfig, RawAxiosRequestConfig } from 'axios';
import { axiosUrlParams, checkNeedVersion, createDebugger, getUrlRepresentation, removeTrailingSlash } from './util';
import https from 'https';
import curlirize from 'axios-curlirize';
import { URL } from 'url';
import { IController } from './IController';
import { ClientError, EErrorsCodes, UnifiError } from './Errors';
import { ObjectWithPrivateValues } from './commons/ObjectWithPrivateValues';
import { Validate } from './commons/Validate';
import { UnifiWebsockets } from './WebSockets';
import { EventEmitter } from 'events';
import AxiosError from 'axios-error';
import { Site, Sites } from './Sites';
import { IUser } from './User';
import { EProxyNamespaces, IBuildUrlParams, proxyNamespace } from './interfaces';
import { DeviceFingerPrints, FingerprintsRaw } from './Clients';
import { IControllerProps } from './IControllerProps';

const axiosDebug = createDebugger('axios');
const axiosDebugVerbose = axiosDebug.extend('verbose');
const axiosCurl = axiosDebug.extend('curl');
const debug = createDebugger('Controller');

export class Controller extends ObjectWithPrivateValues implements IController {
    //
    /**
     * store array to close them all if needed, or loop on registered sockets
     * only available on unifiOS
     */
    public UnifiWebSockets: Array<UnifiWebsockets> = [];
    /**
     * global event emitter, to listen on all events
     */
    public globalWS: EventEmitter = new EventEmitter();
    /**
     * listen on super site
     */
    public superWS: UnifiWebsockets;
    public strictSSL: boolean = true;

    get sites(): Sites {
        this.needLoggedIn();
        return this._sites;
    }
    readonly controllerInstance: AxiosInstance;

    public auth: UnifiAuth;
    private readonly _sites: Sites;
    public unifiOs: boolean;
    public version?: string = '7.0.0';
    private _logged: boolean;

    public get logged(): boolean {
        return this._logged;
    }

    private set logged(value: boolean) {
        this._logged = value;
    }

    public createInstance(siteName: string, config?: RawAxiosRequestConfig): AxiosInstance {
        return this._createInstance(siteName, config);
    }

    private _createInstance(siteName?: string, config?: RawAxiosRequestConfig): AxiosInstance {
        const instance = axios.create({
            ...config,
            baseURL: removeTrailingSlash(this.props.url),
            authenticationRequest: false,
            maxRedirects: 0,
            headers: {
                Accept: 'application/json',
                ['Content-Type']: 'application/json'
            },
            httpsAgent: !this.strictSSL
                ? new https.Agent({
                      rejectUnauthorized: false
                  })
                : undefined,
            site: siteName ?? undefined
        });

        //interceptors are called in reverse order
        this.addAxiosProxyInterceptors(this.addAxiosPlugins(this.addAxiosDebugInterceptors(instance)));

        if (this.auth) {
            this.auth.addInterceptorsToInstance(instance);
        } else {
            this.auth = new UnifiAuth(this.props, instance);
        }

        return instance;
    }

    // this functions are here to delete this value from rest(...) or JSON
    protected get props(): IControllerProps {
        return this.getPrivate<IControllerProps>('props');
    }

    protected set props(value: IControllerProps) {
        this.setPrivate<IControllerProps>('props', value);
    }

    // this functions are here to delete this value from rest(...) or JSON
    public get ws(): UnifiWebsockets {
        return this.getPrivate<UnifiWebsockets>('ws');
    }

    public set ws(value: UnifiWebsockets) {
        this.setPrivate<UnifiWebsockets>('ws', value);
    }

    constructor(props: IControllerProps) {
        super();

        this.props = props;
        this.strictSSL = this.props.strictSSL ?? this.strictSSL;
        this.controllerInstance = this._createInstance();

        // prepare sub objects
        this._sites = new Sites(this);
    }

    private needLoggedIn() {
        if (!this._logged) {
            throw new ClientError('you need to login before', EErrorsCodes.NEED_LOGIN);
        }
    }

    async getSites(): Promise<Array<Site>> {
        this.needLoggedIn();
        return this._sites.list();
    }

    /**
     *
     * @param token2FA - 2FA token, will disable re-login
     */
    async login(token2FA?: string): Promise<IUser> {
        //re enable autoLogin if disabled
        this.auth.autoReLogin = true;
        const user = await this.auth.login(token2FA);
        //get unifiOs / version / and save logged status
        this.unifiOs = this.auth.unifiOs;
        this.version = await this.auth.getVersion();
        this._logged = true;
        return user;
    }

    async logout(): Promise<void> {
        await this.auth.logout();
        this.auth.autoReLogin = false;
        this._logged = false;
    }

    private addAxiosDebugInterceptors(instance: AxiosInstance): AxiosInstance {
        instance.interceptors.request.use((config) => {
            // @ts-ignore
            config.metadata = { startTime: new Date() };
            axiosDebug(`Starting Request on url ${config.method} ${getUrlRepresentation(config)}`);

            axiosDebugVerbose(`headers : %O`, config.headers);
            axiosDebugVerbose(`payload : %O`, config.data);
            return config;
        });

        instance.interceptors.response.use(
            (response) => {
                // @ts-ignore
                const duration = (new Date() - response?.config?.metadata?.startTime) / 1000 || null;
                const durationStr = duration ? ` in ${duration} seconds` : '';
                axiosDebug(
                    `Response from ${response?.config?.method} ${getUrlRepresentation(response?.config)} with code ${response?.status} ${
                        response?.statusText
                    }${durationStr}`
                );
                axiosDebugVerbose('headers : %O', response?.headers);
                axiosDebugVerbose(`headers sent : %O`, response?.request?._header);
                axiosDebugVerbose(`payload : %O `, response?.data);
                return response;
            },
            (error) => {
                if (error?.response) {
                    const rep = error.response;
                    axiosDebug(
                        `Response from ${rep.config?.method} ${getUrlRepresentation(rep.config)} with code ${rep.status} ${rep.statusText}`
                    );
                    axiosDebugVerbose(`headers : %O`, rep.headers);
                    axiosDebugVerbose(`payload : %O`, rep.data);
                } else {
                    if (error?.isAxiosError) {
                        debug(
                            `Response from ${error.config?.method} ${getUrlRepresentation(error.config)} with code ${error.code} ${
                                error.message
                            }`
                        );
                    }
                }

                return Promise.reject(error);
            }
        );

        curlirize(instance, (result, err) => {
            const { command } = result;
            if (err) {
                axiosCurl('err : %O', err);
            }
            axiosCurl(command);
        });

        //add error handler
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.config?.isRetry) {
                    return Promise.resolve();
                }
                if (error?.response) {
                    if (error.config?.clearCurl) {
                        error.config.clearCurl();
                    } else if (error.config) {
                        delete error.config.curlObject;
                        delete error.config.curlCommand;
                        delete error.config.clearCurl;
                    }
                    const meta = error.response.data?.meta;
                    const message =
                        meta?.msg ||
                        error.response.data?.error ||
                        error.response.data?.errors?.join('\n\n ----- \n\n') ||
                        error.response.statusText ||
                        'Unknown HTTP Error';
                    // axios error will remove circular dependency + format a little the sub error
                    error = new UnifiError(message, error.response.status, meta, new AxiosError(error));
                }

                return Promise.reject(error);
            }
        );
        return instance;
    }

    public buildUrl(pConfig: IBuildUrlParams, websockets = false): AxiosRequestConfig {
        const versionedApi = Validate.isNumber(pConfig.apiVersion) && pConfig.apiVersion > 1;

        if (!pConfig.baseURL) {
            throw new ClientError('baseURL is needed in the axios instance');
        }

        const config: IBuildUrlParams & { baseURL: string; proxyNamespace: proxyNamespace } = {
            ...pConfig,
            url: pConfig.url,
            site: pConfig.site,
            apiVersion: pConfig.apiVersion,
            baseURL: pConfig.baseURL,
            proxyNamespace: pConfig.proxyNamespace ?? false,
            apiPart: pConfig.apiPart
        };

        if (config.url && config.url.charAt(0) !== '/') {
            throw new ClientError('url need to start with a slash /');
        }

        // use a unifi proxy namespace ?
        // && !config.url?.includes('login') && !config.url?.includes('logout')
        if (this.unifiOs && config.proxyNamespace) {
            config.baseURL = `${config.baseURL}/proxy/${config.proxyNamespace}`;
        }

        if (!config.url) {
            return config;
        }

        //get the site part of the url
        let sitePart = '';
        if (config.site) {
            let siteNameSpace = 's';
            if (versionedApi) {
                siteNameSpace = 'site';
            }
            sitePart = `/${siteNameSpace}/${config.site}`;
        }

        //get the api version part
        let apiVersionPart = '';
        if (versionedApi) {
            apiVersionPart = `/v${config.apiVersion}`;
        }

        //manage the apiPart
        let apiPart = '';
        if (config.apiPart === true || (!websockets && config.apiVersion)) {
            apiPart = '/api';
        } else if (config.apiPart) {
            apiPart = `/${config.apiPart}`;
        } else if (websockets && config.apiPart !== false) {
            apiPart = '/wss';
        }

        if (websockets) {
            const urlParsed = new URL(config.baseURL);
            urlParsed.protocol = urlParsed.protocol === 'https:' ? 'wss' : 'ws';
            config.baseURL = removeTrailingSlash(urlParsed.toString());
        }

        // if not unifiOs, all the request are "in the network namespace"
        let apiVersionPrefix = false;
        if (config.proxyNamespace === EProxyNamespaces.NETWORK || !this.unifiOs) {
            apiVersionPrefix = true;
        }

        config.url = (apiVersionPrefix ? apiVersionPart : '') + apiPart + (!apiVersionPrefix ? apiVersionPart : '') + sitePart + config.url;

        return config;
    }

    private addAxiosProxyInterceptors(instance: AxiosInstance): AxiosInstance {
        instance.interceptors.request.use((config) => {
            return {
                ...this.buildUrl(config),
                headers: config.headers
            };
        });
        return instance;
    }

    private addAxiosPlugins(instance: AxiosInstance): AxiosInstance {
        // manage urlParams
        return axiosUrlParams(instance);
    }

    public getInstance(): AxiosInstance {
        return this.controllerInstance;
    }

    // websockets
    public on(eventName: string, cb: (...args: Array<unknown>) => unknown): this {
        this._initWebSockets();

        this.ws.on(eventName, cb);
        return this;
    }

    private _initWebSockets(): this {
        //already init
        if (this.superWS) {
            return this;
        }
        this.needLoggedIn();
        let wsUrl;
        if (this.props.webSocketsURL) {
            wsUrl = removeTrailingSlash(this.props.webSocketsURL);
        } else {
            const urlParsed = new URL(this.props.url);
            urlParsed.protocol = urlParsed.protocol === 'https:' ? 'wss' : 'ws';
            wsUrl = removeTrailingSlash(urlParsed.toString());
        }

        if (this.unifiOs) {
            this.ws = new UnifiWebsockets({
                controller: this,
                strictSSL: this.strictSSL,
                url: `${wsUrl}/api/ws/system`,
                isController: true
            });
        } else {
            const error = () =>
                new ClientError('controller websockets are only available on unifiOS', EErrorsCodes.UNIFI_CONTROLLER_TYPE_MISMATCH);

            Object.defineProperty(this, 'ws', {
                get: () => {
                    throw error();
                },
                set: () => {
                    throw error();
                }
            });
        }

        //build super WS
        const superWSConfig = this.buildUrl(
            {
                baseURL: this.controllerInstance.defaults.baseURL,
                url: '/events',
                site: 'super',
                proxyNamespace: EProxyNamespaces.NETWORK
            },
            true
        ) as RawAxiosRequestConfig & { url: string };
        const superUrl = `${superWSConfig.baseURL}${superWSConfig.url}`;
        this.superWS = new UnifiWebsockets({
            controller: this,
            strictSSL: this.strictSSL,
            url: superUrl.toString(),
            isController: false
        });

        return this;
    }

    public async initWebSockets(): Promise<void> {
        this._initWebSockets();
        await Promise.all([this.unifiOs ? this.ws.initWebSockets() : Promise.resolve(), this.superWS.initWebSockets()]);
    }

    /**
     *
     * @param folder - not sure about it, but some number can return different results
     * seems to return https://static.ubnt.com/fingerprint/:folder/devicelist.json
     * tested with 0 1 2
     */
    public async getDevicesFingerPrints(folder: 0 | 1 | 2 | number = 0): Promise<DeviceFingerPrints> {
        const fingerprintsRaw = (
            await this.getInstance().get<FingerprintsRaw>('/fingerprint_devices/:folder', {
                apiVersion: 2,
                proxyNamespace: EProxyNamespaces.NETWORK,
                urlParams: {
                    source: (folder ?? 0).toString()
                }
            })
        ).data;

        return new DeviceFingerPrints(fingerprintsRaw);
    }

    public async reboot(): Promise<void> {
        checkNeedVersion(this, undefined, true, 'Controller.reboot');
        //on UDM, return 204
        await this.controllerInstance.post<undefined>('/api/system/reboot');
    }
}
