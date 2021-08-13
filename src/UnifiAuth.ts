import { AxiosInstance, AxiosResponse } from 'axios';
import { createDebugger } from './util';
import { IUser } from './User';
import setCookieParser from 'set-cookie-parser';
import { IncomingMessage } from 'http';
import cookie, { CookieSerializeOptions } from 'cookie';
import jwt from 'jsonwebtoken';
import { ClientError, EErrorsCodes } from './Errors';
import { Validate } from './commons/Validate';
import { ObjectWithPrivateValues } from './commons/ObjectWithPrivateValues';

export interface IUnifiAuthProps {
    rememberMe?: boolean;
    username: string;
    password: string;
}

const debug = createDebugger('UnifiAuth');
export class UnifiAuth extends ObjectWithPrivateValues {
    private readonly rememberMe: boolean;
    public unifiOs: boolean;
    public autoReLogin: boolean = true;
    private get username(): string {
        return this.getPrivate('username');
    }

    private set username(data: string) {
        this.setPrivate('username', data);
    }

    private get password(): string {
        return this.getPrivate('password');
    }

    private set password(data: string) {
        this.setPrivate('password', data);
    }

    private getCookieTokenName(): string {
        return this.unifiOs ? 'TOKEN' : 'unifises';
    }

    private token?: string;
    private csrfToken?: string;

    private controllerInstance: AxiosInstance;

    constructor(props: IUnifiAuthProps, instance: AxiosInstance) {
        super();
        debug('Construct()');

        this.username = props.username;
        this.password = props.password;

        if (Validate.isBoolean(props.rememberMe)) {
            this.rememberMe = props.rememberMe;
        } else {
            this.rememberMe = true;
        }

        this.controllerInstance = this.addInterceptors(instance);
    }

    public async getCookies(
        authenticationRequest: boolean = false
    ): Promise<Array<CookieSerializeOptions & { name: string; value: string }>> {
        const curDebug = debug.extend('getCookies');

        const cookies: Array<CookieSerializeOptions & { name: string; value: string }> = [];
        if (!authenticationRequest) {
            curDebug('not authentification request, include cookies');
            //if we need to include token
            const value = await this.getToken();
            if (value) {
                cookies.push({ name: this.getCookieTokenName(), value });
            }
        }
        if (this.csrfToken && !this.unifiOs) {
            curDebug('set csrfToken (!unifiOs)');
            //non unifiOs
            cookies.push({ name: 'csrf_token', value: this.csrfToken });
        }
        return cookies;
    }

    private addInterceptors(instance: AxiosInstance): AxiosInstance {
        debug('addInterceptors()');

        instance.interceptors.request.use(async (config) => {
            const curDebug = debug.extend('interceptedRequest');
            curDebug('intercept request');

            const cookies: Array<CookieSerializeOptions & { name: string; value: string }> = await this.getCookies(
                config.authenticationRequest
            );

            if (this.unifiOs && this.csrfToken) {
                curDebug('set csrfToken (unifiOs)');
                config.headers['X-CSRF-Token'] = this.csrfToken;
            }

            if (cookies.length > 0) {
                config.headers.Cookie = cookies.map((c) => cookie.serialize(c.name, c.value, c)).join('; ');
            }

            return config;
        });

        instance.interceptors.response.use(
            (response) => {
                const curDebug = debug.extend('interceptedSucceedResponse');
                curDebug('intercept success response');

                if (response.headers && response.headers['x-csrf-token']) {
                    curDebug('x-csrf-token header found, saving it');
                    this.csrfToken = response.headers['x-csrf-token'];
                }

                if (!this.unifiOs) {
                    const cookies = this.getCookiesFromResponse(response);
                    if (cookies['csrf_token']) {
                        curDebug('x-csrf-token cookie found, saving it');
                        this.csrfToken = cookies['csrf_token'].value;
                    }
                }

                return response;
            },
            async (error) => {
                const curDebug = debug.extend('interceptedErroredResponse');
                curDebug('intercept errored response');

                if (error.response) {
                    const response = error.response;
                    if (response.headers['x-csrf-token']) {
                        curDebug('x-csrf-token header found, saving it');
                        this.csrfToken = response.headers['x-csrf-token'];
                    }

                    if (!this.unifiOs && response.config && response.status === 401 && !response.config?.retryAuth && this.autoReLogin) {
                        curDebug('login is expired, try to re-login');
                        await this.login();
                        return this.controllerInstance.request({ ...response.config, retryAuth: true });
                    }
                }

                return Promise.reject(error);
            }
        );

        return instance;
    }

    private getCookiesFromResponse(res: AxiosResponse): setCookieParser.CookieMap {
        //res is compatible with incomingMessage for this use
        return setCookieParser(res as unknown as IncomingMessage, {
            map: true
        });
    }

    /**
     *
     * @param token2FA - 2FA token, will disable re-login
     */
    public async login(token2FA?: string): Promise<IUser> {
        debug('login()');
        const curDebug = debug.extend('login');
        //reset tokens
        this.token = undefined;
        this.csrfToken = undefined;
        if (Validate.isUndefined(this.unifiOs)) {
            curDebug('check if unifiOs');
            const resCheck = await this.controllerInstance.get('/', {
                validateStatus: () => true,
                authenticationRequest: true
            });

            //this is not unifiOS
            if (resCheck.status === 302 && resCheck.headers.location === '/manage') {
                curDebug('os found : not unifiOs');
                this.unifiOs = false;
            } else if (resCheck.status === 200 && resCheck.headers['x-csrf-token']) {
                curDebug('os found : unifiOs');
                this.unifiOs = true;
            } else {
                throw new ClientError('fail to detect unifiOs or not !', EErrorsCodes.FAIL_TO_DETECT_UNIFIOS);
            }
        }

        curDebug('start login request');
        // non unifiOS => token work 7 days with rememberMe
        const res = await this.controllerInstance.post(
            this.unifiOs ? '/api/auth/login' : '/api/login',
            {
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe,
                token: token2FA || undefined
            },
            {
                authenticationRequest: true
            }
        );

        if (token2FA) {
            this.autoReLogin = false;
        }

        curDebug('end login request');
        const cookies = this.getCookiesFromResponse(res);

        if (!cookies[this.getCookieTokenName()]) {
            throw new Error('fail to login');
        }

        this.token = cookies[this.getCookieTokenName()].value;

        if (!this.unifiOs) {
            if (!cookies['csrf_token']) {
                throw new ClientError('fail to get CSRF token from cookies', EErrorsCodes.FAIL_GET_CSRF_COOKIE);
            }
            curDebug('found csrf token in cookie, saving it');
            this.csrfToken = cookies['csrf_token'].value;
        }

        return res.data;
    }

    public async logout(): Promise<void> {
        debug('logout()');

        await this.controllerInstance.post(`/api${this.unifiOs ? '/auth' : ''}/logout`);
    }

    public async getVersion(): Promise<string | undefined> {
        //load version
        try {
            const version = (
                await this.controllerInstance.get('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } })
            ).data?.data?.pop()?.version;
            debug('controller version is : %s', version);
            return version;
        } catch (e) {
            debug('fail to load version');
        }
    }

    private async getToken(): Promise<string | undefined> {
        const curDebug = debug.extend('getToken');
        curDebug('()');
        const token = this.token;

        if (
            // non unifiOs token is not a JWT token, can't know if the token is expired with this method ...
            this.unifiOs &&
            //check if token, or if jwt token will not expire in the 2 next minutes, just in case
            (!token || (jwt.decode(token) as { exp: number }).exp * 1000 < Date.now() + 2 * 60 * 1000) &&
            // autoReLogin enabled ?
            this.autoReLogin
        ) {
            // console.log(this.unifiOs, (jwt.decode(token) as { exp: number }).exp * 1000, Date.now() + 2 * 60 * 1000, this.autoReLogin);
            curDebug('token seems invalid, try to relogin');
            await this.login();
        }
        return this.token;
    }

    addInterceptorsToInstance(instance: AxiosInstance): void {
        debug('addInterceptorsToInstance');
        this.addInterceptors(instance);
    }
}
