import { IUnifiAuthProps, UnifiAuth } from './UnifiAuth';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { axiosUrlParams, createDebugger, getUrlRepresentation, removeTrailingSlash } from './util';
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

export interface IControllerProps extends IUnifiAuthProps {
    url: string;
    strictSSL?: boolean;
    webSocketsURL?: string;
}

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
    private logged: boolean;

    public createInstance(siteName: string): AxiosInstance {
        return this._createInstance(siteName);
    }

    private _createInstance(siteName?: string): AxiosInstance {
        const instance = axios.create({
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

        if (this.auth) {
            this.auth.addInterceptorsToInstance(instance);
        } else {
            this.auth = new UnifiAuth(this.props, instance);
        }
        //else we create the controller instance

        return this.addAxiosPlugins(this.addAxiosDebugInterceptors(this.addAxiosProxyInterceptors(instance)));
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
        if (!this.logged) {
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
        this.logged = true;
        return user;
    }

    async logout(): Promise<void> {
        await this.auth.logout();
        this.auth.autoReLogin = false;
        this.logged = false;
    }

    addAxiosDebugInterceptors(instance: AxiosInstance): AxiosInstance {
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

    public buildUrl(
        pConfig: { url?: string; apiVersion?: number; site?: string; baseURL?: string; unifiOSUrl?: string },
        websockets = false
    ): AxiosRequestConfig {
        const config = { ...pConfig };
        const versionedApi = Validate.isNumber(config.apiVersion) && config.apiVersion > 1;

        if (!config.baseURL) {
            throw new ClientError('baseURL is needed in the axios instance');
        }

        if (this.unifiOs && !config.url?.includes('login') && !config.url?.includes('logout')) {
            const proxyPart = config.unifiOSUrl ?? '/proxy/network';
            config.baseURL = `${config.baseURL}${proxyPart}`;
        }

        if (config.site) {
            let siteNameSpace = 's';
            if (versionedApi) {
                siteNameSpace = 'site';
            }
            config.url = `/${websockets ? 'wss' : 'api'}/${siteNameSpace}/${config.site}${config.url}`;
        }

        if (versionedApi) {
            config.url = `/v${config.apiVersion}${config.url}`;
        }

        if (websockets) {
            const urlParsed = new URL(config.baseURL);
            urlParsed.protocol = urlParsed.protocol === 'https:' ? 'wss' : 'ws';
            config.baseURL = removeTrailingSlash(urlParsed.toString());
        }

        return config;
    }

    addAxiosProxyInterceptors(instance: AxiosInstance): AxiosInstance {
        instance.interceptors.request.use((config) => {
            return this.buildUrl(config);
        });
        return instance;
    }

    addAxiosPlugins(instance: AxiosInstance): AxiosInstance {
        // manage urlParams
        return axiosUrlParams(instance);
    }

    public getInstance(): AxiosInstance {
        return this.controllerInstance;
    }

    public on(eventName: string, cb: (...args: Array<unknown>) => unknown): this {
        if (!this.ws) {
            this._initWebSockets();
        }

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
                site: 'super'
            },
            true
        ) as AxiosRequestConfig & { url: string };
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
}
