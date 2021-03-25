import UnifiAuth, { IUnifiAuthProps } from './UnifiAuth';
import axios, { AxiosInstance } from 'axios';
import { createDebugger, getUrlRepresentation } from './util';
import https from 'https';
import { IUser } from './User/IUser';
import curlirize from 'axios-curlirize';
import { URL } from 'url';
import UnifiError from './Errors/UnifiError';
import Site from './Sites/Site';
import Sites from './Sites/Sites';
import { IController } from './IController';
import { ClientError, EErrorsCodes } from './Errors';

export interface IControllerProps extends IUnifiAuthProps {
    url: string;
    strictSSL?: boolean;
}

const axiosDebug = createDebugger('axios');
const axiosDebugVerbose = axiosDebug.extend('verbose');
const axiosCurl = axiosDebug.extend('curl');
const debug = createDebugger('Controller');

export default class Controller implements IController {
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

    constructor(props: IControllerProps) {
        this.controllerInstance = axios.create({
            baseURL: props.url.replace(/\/$/, ''),
            authenticationRequest: false,
            maxRedirects: 0,
            headers: {
                Accept: 'application/json',
                ['Content-Type']: 'application/json'
            },
            httpsAgent:
                props.strictSSL === false
                    ? new https.Agent({
                          rejectUnauthorized: false
                      })
                    : undefined
        });

        this.auth = new UnifiAuth(props, this.controllerInstance);
        this.addAxiosDebugInterceptors();
        this.addAxiosProxyInterceptors();
        this.addAxiosPlugins();

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

    addAxiosDebugInterceptors(): void {
        this.controllerInstance.interceptors.request.use((config) => {
            // @ts-ignore
            config.metadata = { startTime: new Date() };
            axiosDebug(`Starting Request on url ${config.method} ${getUrlRepresentation(config)}`);

            axiosDebugVerbose(`headers : %O`, config.headers);
            axiosDebugVerbose(`payload : %O`, config.data);
            return config;
        });

        this.controllerInstance.interceptors.response.use(
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

        curlirize(this.controllerInstance, (result, err) => {
            const { command } = result;
            if (err) {
                axiosCurl('err :');
            }
            axiosCurl(command);
        });

        //add error handler
        this.controllerInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.config.isRetry) {
                    return Promise.resolve();
                }
                if (error.response) {
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
    }

    addAxiosProxyInterceptors(): void {
        this.controllerInstance.interceptors.request.use((config) => {
            if (this.unifiOs && !config.url.includes('login') && !config.url.includes('logout')) {
                config.baseURL += '/proxy/network';
            }
            return config;
        });
    }

    addAxiosPlugins(): void {
        // manage urlParams
        this.controllerInstance.interceptors.request.use((config) => {
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
    }
}
