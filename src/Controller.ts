import { IUnifiAuthProps, UnifiAuth } from './UnifiAuth';
import axios, { AxiosInstance } from 'axios';
import { createDebugger, getUrlRepresentation } from './util';
import https from 'https';
import { IUser } from './User/IUser';
import curlirize from 'axios-curlirize';
import { URL } from 'url';
import { IController } from './IController';
import { ClientError, EErrorsCodes, UnifiError } from './Errors';
import { ObjectWithPrivateValues } from './commons/ObjectWithPrivateValues';
import { Sites } from './Sites/Sites';
import { Site } from './Sites/Site';
import { Validate } from './commons/Validate';

export interface IControllerProps extends IUnifiAuthProps {
    url: string;
    strictSSL?: boolean;
}

const axiosDebug = createDebugger('axios');
const axiosDebugVerbose = axiosDebug.extend('verbose');
const axiosCurl = axiosDebug.extend('curl');
const debug = createDebugger('Controller');

export class Controller extends ObjectWithPrivateValues implements IController {
    get sites(): Sites {
        this.needLoggedIn();
        return this._sites;
    }
    readonly controllerInstance: AxiosInstance;

    public auth: UnifiAuth;
    private readonly _sites: Sites;
    public unifiOs: boolean;
    public version: string = '7.0.0';
    private logged: boolean;

    public createInstance(siteName: string): AxiosInstance {
        return this._createInstance(siteName);
    }

    private _createInstance(siteName?: string): AxiosInstance {
        const instance = axios.create({
            baseURL: this.props.url.replace(/\/$/, ''),
            authenticationRequest: false,
            maxRedirects: 0,
            headers: {
                Accept: 'application/json',
                ['Content-Type']: 'application/json'
            },
            httpsAgent:
                this.props.strictSSL === false
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

    constructor(props: IControllerProps) {
        super();

        this.props = props;

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

    async login(): Promise<IUser> {
        const user = await this.auth.login();
        this.unifiOs = this.auth.unifiOs;
        this.version = await this.auth.getVersion();
        this.logged = true;
        return user;
    }

    async logout(): Promise<void> {
        await this.auth.logout();
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
                const duration = (new Date() - response.config?.metadata?.startTime) / 1000 || null;
                const durationStr = duration ? ` in ${duration} seconds` : '';
                axiosDebug(
                    `Response from ${response.config.method} ${getUrlRepresentation(response.config)} with code ${response.status} ${
                        response.statusText
                    }${durationStr}`
                );
                axiosDebugVerbose('headers : %O', response.headers);
                axiosDebugVerbose(`headers sent : %O`, response.request._header);
                axiosDebugVerbose(`payload : %O `, response.data);
                return response;
            },
            (error) => {
                if (error.response) {
                    const rep = error.response;
                    axiosDebug(
                        `Response from ${rep.config.method} ${getUrlRepresentation(rep.config)} with code ${rep.status} ${rep.statusText}`
                    );
                    axiosDebugVerbose(`headers : %O`, rep.headers);
                    axiosDebugVerbose(`payload : %O`, rep.data);
                } else {
                    if (error.isAxiosError) {
                        debug(
                            `Response from ${error.config.method} ${getUrlRepresentation(error.config)} with code ${error.code} ${
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
                axiosCurl('err :');
            }
            axiosCurl(command);
        });

        //add error handler
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.config.isRetry) {
                    return Promise.resolve();
                }
                if (error.response) {
                    if (error.config?.clearCurl) {
                        error.config.clearCurl();
                    } else if (error.config) {
                        delete error.config.curlObject;
                        delete error.config.curlCommand;
                        delete error.config.clearCurl;
                    }
                    const meta = error.response.data?.meta;
                    error = new UnifiError(
                        meta?.msg || error.response.statusText || 'Unknown HTTP Error',
                        error.response.status,
                        meta,
                        error
                    );
                }

                return Promise.reject(error);
            }
        );
        return instance;
    }

    addAxiosProxyInterceptors(instance: AxiosInstance): AxiosInstance {
        instance.interceptors.request.use((config) => {
            const versionedApi = Validate.isNumber(config.apiVersion) && config.apiVersion > 1;

            if (this.unifiOs && !config.url.includes('login') && !config.url.includes('logout')) {
                config.baseURL += '/proxy/network';
            }

            if (config.site) {
                let siteNameSpace = 's';
                if (versionedApi) {
                    siteNameSpace = 'site';
                }
                config.url = `/api/${siteNameSpace}/${config.site}${config.url}`;
            }

            if (versionedApi) {
                config.url = `/v${config.apiVersion}${config.url}`;
            }

            return config;
        });
        return instance;
    }

    addAxiosPlugins(instance: AxiosInstance): AxiosInstance {
        // manage urlParams
        instance.interceptors.request.use((config) => {
            if (!config.url) {
                return config;
            }

            const currentUrl = new URL(config.url, config.baseURL);
            // parse pathName to implement variables
            Object.entries(config.urlParams || {}).forEach(([k, v]) => {
                currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
            });

            const authPart = currentUrl.username && currentUrl.password ? `${currentUrl.username}:${currentUrl.password}` : '';
            return {
                ...config,
                baseURL: `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
                url: currentUrl.pathname
            };
        });
        return instance;
    }

    public getInstance(): AxiosInstance {
        return this.controllerInstance;
    }
}
