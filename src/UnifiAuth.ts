import { AxiosInstance, AxiosResponse } from 'axios';
import ObjectWithPrivateValues from './commons/ObjectWithPrivateValues';
import { createDebugger } from './util';
import { IUser } from './User/IUser';
import setCookieParser from 'set-cookie-parser';
import { IncomingMessage } from 'http';
import cookie, { CookieSerializeOptions } from 'cookie';
import jwt from 'jsonwebtoken';
import Validate from './commons/Validate';
import ClientError from './Errors/ClientError';
import { EErrorsCodes } from './Errors';

export interface IUnifiAuthProps {
    rememberMe?: boolean;
    username: string;
    password: string;
}

const debug = createDebugger('UnifiAuth');
export default class UnifiAuth extends ObjectWithPrivateValues {
    private instance: AxiosInstance;
    private readonly rememberMe: boolean;
    public unifiOs: boolean;
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

    private token: string;
    private csrfToken: string;

    constructor(props: IUnifiAuthProps, instance: AxiosInstance) {
        debug('Construct()');
        super();

        if (props.username) {
            this.username = props.username;
        }
        if (props.password) {
            this.password = props.password;
        }

        this.instance = instance;
        if (Validate.isBoolean(props.rememberMe)) {
            this.rememberMe = props.rememberMe;
        } else {
            this.rememberMe = true;
        }

        this.addInterceptors();
    }

    // getToken

    private addInterceptors() {
        debug('addInterceptors()');

        this.instance.interceptors.request.use(async (config) => {
            const cookies: Array<CookieSerializeOptions & { name: string; value: string }> = [];
            //manage token
            if (!config.authenticationRequest) {
                //if we need to include token
                cookies.push({ name: this.getCookieTokenName(), value: await this.getToken() });
            }
            if (this.unifiOs && this.csrfToken) {
                config.headers['X-CSRF-Token'] = this.csrfToken;
            } else if (this.csrfToken) {
                //non unifiOs
                cookies.push({ name: 'csrf_token', value: this.csrfToken });
            }

            if (cookies.length > 0) {
                config.headers.Cookie = cookies.map((c) => cookie.serialize(c.name, c.value, c)).join('; ');
            }

            return config;
        });

        this.instance.interceptors.response.use(
            (response) => {
                if (response.headers['x-csrf-token']) {
                    this.csrfToken = response.headers['x-csrf-token'];
                }

                if (!this.unifiOs) {
                    const cookies = this.getCookies(response);
                    if (cookies['csrf_token']) {
                        this.csrfToken = cookies['csrf_token'].value;
                    }
                }

                return response;
            },
            async (error) => {
                if (error.response) {
                    const response = error.response;
                    if (response.headers['x-csrf-token']) {
                        this.csrfToken = response.headers['x-csrf-token'];
                    }

                    if (!this.unifiOs && response.config && response.status === 401 && !response.config?.retryAuth) {
                        await this.login();
                        return await this.instance.request({ ...response.config, retryAuth: true });
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    private getCookies(res: AxiosResponse): setCookieParser.CookieMap {
        //res is compatible with incomingMessage for this use
        return setCookieParser((res as unknown) as IncomingMessage, {
            map: true
        });
    }

    public async login(): Promise<IUser> {
        //reset tokens
        this.token = null;
        this.csrfToken = null;
        if (Validate.isUndefined(this.unifiOs)) {
            const resCheck = await this.instance.get('/', {
                validateStatus: () => true,
                authenticationRequest: true
            });

            //this is not unifiOS
            if (resCheck.status === 302 && resCheck.headers.location === '/manage') {
                this.unifiOs = false;
            } else if (resCheck.status === 200 && resCheck.headers['x-csrf-token']) {
                this.unifiOs = true;
            } else {
                throw new ClientError('fail to detect unifiOs or not !', EErrorsCodes.FAIL_TO_DETECT_UNIFIOS);
            }
        }

        // non unifiOS => token work 7 days with rememberMe
        const res = await this.instance.post(
            this.unifiOs ? '/api/auth/login' : '/api/login',
            {
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            },
            {
                authenticationRequest: true
            }
        );

        const cookies = this.getCookies(res);

        if (!cookies[this.getCookieTokenName()]) {
            throw new Error('fail to login');
        }

        this.token = cookies[this.getCookieTokenName()].value;

        if (!this.unifiOs) {
            if (!cookies['csrf_token']) {
                throw new ClientError('fail to get CSRF token from cookies', EErrorsCodes.FAIL_GET_CSRF_COOKIE);
            }
            this.csrfToken = cookies['csrf_token'].value;
        }

        return res.data;
    }

    public logout(): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async getVersion(): Promise<string> {
        //load version
        try {
            const version = ((await this.instance.get('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } })).data?.data.pop())
                .version;
            debug('controller version is : %s', version);
            return version;
        } catch (e) {
            debug('fail to load version');
        }
    }

    private async getToken(): Promise<string> {
        const token = this.token;
        // non unifiOs token is not a JWT token, can't know if the token is expired with this method ...
        //check if token, or if jwt token will not expire in the 2 next minutes, just in case
        if (this.unifiOs && (!token || (jwt.decode(token) as { exp: number }).exp * 1000 < Date.now() - 2 * 1000)) {
            await this.login();
        }
        return this.token;
    }
}
