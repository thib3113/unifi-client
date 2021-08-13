//need to be first
import { debug } from '../mocks/utils';
import { UnifiAuth } from '../../src/UnifiAuth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

jest.mock('axios');
jest.mock('jsonwebtoken');

describe('test UnifiAuth', () => {
    const interceptors: {
        requests: Array<(config: AxiosRequestConfig) => AxiosRequestConfig>;
        response: Array<[(response: AxiosResponse) => AxiosResponse, (error: any) => any]>;
    } = {
        requests: [],
        response: []
    };
    const requestMock = jest.fn().mockImplementation((interceptor) => interceptors.requests.push(interceptor));
    const responseMock = jest
        .fn()
        .mockImplementation((interceptor, errInterceptor) => interceptors.response.push([interceptor, errInterceptor]));
    // @ts-ignore
    const instance: AxiosInstance = {
        interceptors: {
            request: {
                use: requestMock
            },
            response: {
                use: responseMock
            }
        }
    } as AxiosInstance;
    const resetInstancesMock = () => {
        interceptors.response = [];
        interceptors.requests = [];
    };
    beforeEach(() => {
        responseMock.mockClear();
        requestMock.mockClear();
        resetInstancesMock();
    });
    describe('construct', () => {
        it('should init', () => {
            const auth = new UnifiAuth({ username: 'user', password: 'passwd' }, instance);
            // @ts-ignore
            expect(auth.username).toBe('user');
            // @ts-ignore
            expect(auth.password).toBe('passwd');
            // @ts-ignore
            expect(auth.rememberMe).toBeTruthy();
        });
        it('should init with rememberMe', () => {
            let auth = new UnifiAuth({ username: 'user', password: 'passwd', rememberMe: false }, instance);
            // @ts-ignore
            expect(auth.username).toBe('user');
            // @ts-ignore
            expect(auth.password).toBe('passwd');
            // @ts-ignore
            expect(auth.rememberMe).toBeFalsy();

            // if rememberMe is not a boolean, use default
            // @ts-ignore
            auth = new UnifiAuth({ username: 'user', password: 'passwd', rememberMe: '' }, instance);
            // @ts-ignore
            expect(auth.username).toBe('user');
            // @ts-ignore
            expect(auth.password).toBe('passwd');
            // @ts-ignore
            expect(auth.rememberMe).toBeTruthy();
        });
    });
    describe('getCookieTokenName', () => {
        it('should return TOKEN for unifiOs', () => {
            const auth = new UnifiAuth({ username: 'user', password: 'passwd' }, instance);
            auth.unifiOs = true;
            // @ts-ignore
            expect(auth.getCookieTokenName()).toBe('TOKEN');
        });
        it('should return unifises for non unifiOs', () => {
            const auth = new UnifiAuth({ username: 'user', password: 'passwd' }, instance);
            auth.unifiOs = false;
            // @ts-ignore
            expect(auth.getCookieTokenName()).toBe('unifises');
        });
    });
    describe('test interceptors', function () {
        let auth: UnifiAuth;
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, instance);
        });
        it('should intercept request', () => {});
        it('should intercept response', () => {});
        it('should intercept error  response', () => {});
    });
    describe('getToken', () => {
        const threeMinutes = 3 * 60 * 1000;
        let auth: UnifiAuth;
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, instance);
            jwt.decode.mockClear();
            auth.login = jest.fn().mockImplementation(() => Promise.resolve());
        });
        it('should return the token if already valid', async () => {
            // @ts-ignore
            auth.token = 'aaaaa';
            auth.unifiOs = true;
            auth.autoReLogin = true;
            jwt.decode.mockImplementationOnce(() => ({ exp: (Date.now() + threeMinutes) / 1000 }));
            // @ts-ignore
            expect(await auth.getToken()).toBe('aaaaa');
            expect(auth.login).not.toBeCalled();
            expect(jwt.decode).toBeCalledWith('aaaaa');
        });
        it('should return the token if not unifiOS', async () => {
            // @ts-ignore
            auth.token = 'aaaaa';
            auth.unifiOs = false;
            // @ts-ignore
            expect(await auth.getToken()).toBe('aaaaa');
            expect(auth.login).not.toBeCalled();
            expect(jwt.decode).not.toBeCalled();
        });
        it('should call login if unifiOs, jwt expired and autoRelogin', async () => {
            // @ts-ignore
            auth.token = 'aaaaa';
            auth.unifiOs = true;
            auth.autoReLogin = true;
            jwt.decode.mockImplementationOnce(() => ({ exp: (Date.now() - threeMinutes) / 1000 }));
            // @ts-ignore
            expect(await auth.getToken()).toBe('aaaaa');
            expect(auth.login).toBeCalled();
        });
        it(`shouldn't call login if unifiOs, jwt not expired or not autoRelogin`, async () => {
            // @ts-ignore
            auth.token = 'aaaaa';
            auth.unifiOs = true;
            auth.autoReLogin = true;
            //not expired
            jwt.decode.mockImplementation(() => ({ exp: (Date.now() + threeMinutes) / 1000 }));
            // @ts-ignore
            expect(await auth.getToken()).toBe('aaaaa');
            expect(auth.login).not.toBeCalled();

            // expired 3 minutes ago
            jwt.decode.mockImplementationOnce(() => ({ exp: (Date.now() - threeMinutes) / 1000 }));
            auth.autoReLogin = false;
            // @ts-ignore
            expect(await auth.getToken()).toBe('aaaaa');
            expect(auth.login).not.toBeCalled();
        });
    });
    describe('addInterceptorsToInstance', () => {
        it('should call the addInterceptors with the instance', () => {
            const auth = new UnifiAuth({ username: 'user', password: 'passwd' }, instance);
            const addInterceptorsMock = jest.fn();
            // @ts-ignore
            auth.addInterceptors = addInterceptorsMock;

            // @ts-ignore
            auth.addInterceptorsToInstance({});

            expect(addInterceptorsMock).toBeCalledWith({});
        });
    });
    describe('logout', () => {
        let auth: UnifiAuth;
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, axios);
        });
        it('should logout unifiOs', async () => {
            (axios.post as jest.Mock).mockImplementationOnce(() => Promise.resolve());
            auth.unifiOs = true;

            await auth.logout();
            expect(axios.post).toBeCalledWith('/api/auth/logout');
        });
        it('should logout non unifiOs', async () => {
            (axios.post as jest.Mock).mockImplementationOnce(() => Promise.resolve());
            auth.unifiOs = false;

            await auth.logout();
            expect(axios.post).toBeCalledWith('/api/logout');
        });
    });
    describe('getVersion', () => {
        let auth: UnifiAuth;
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, axios);
        });
        it('should get the version', async () => {
            (axios.get as jest.Mock).mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [
                            {
                                version: '6.2.26'
                            }
                        ]
                    }
                })
            );

            expect(await auth.getVersion()).toBe('6.2.26');
            expect(debug.debugMock).toHaveBeenCalledWith('controller version is : %s', '6.2.26');
            expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } });
        });
        describe('test errors', () => {
            it('should return undefined if failed', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() => Promise.reject());

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } });
            });
            it('should return undefined if no data', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } });
            });
            it('should return undefined if no data in unifi response', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {}
                    })
                );

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } });
            });
            it('should return undefined if empty data array in unifi response', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            data: []
                        }
                    })
                );

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', { urlParams: { site: 'default' } });
            });
        });
    });
    describe('getCookiesFromResponse', () => {
        let auth: UnifiAuth;
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, axios);
        });
        it('should return cookies', () => {
            // @ts-ignore
            const cookies = auth.getCookiesFromResponse({
                headers: {
                    'set-cookie':
                        'TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpADFGGL9.eyJjc3JmVG9rZW4iOiIwNGE2NTJlZS0zZDI0LTQxNTEtOTYzZS01NzY3ZWJjYzFmZTIiLCJ1c2VySWQiOiIzMDEyOGRlMC1iYjc4LTQ4NjEtOTMzMS1hNDNmYmRkY2E1MzgiLCJyZW1lbWJlck1lIjp0cnVlLCJpc1JlbWVtYmVyZWQiOnRydWUsImlhdCI6MTYyNjk1NTQxNCwiZXhwIjoxNjI5NTQ3NDE0LCJwYXNzd29yZFJldmlzaW9uIjowfQ.SQMdsqzesqzew6lLsNijqSpcKToVjZlKvZsNA2yFE58NSoVzz5HLRMV; path=/; samesite=strict; secure; httponly'
                }
            } as unknown as IncomingMessage);

            expect(cookies).toStrictEqual({
                TOKEN: {
                    httpOnly: true,
                    name: 'TOKEN',
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpADFGGL9.eyJjc3JmVG9rZW4iOiIwNGE2NTJlZS0zZDI0LTQxNTEtOTYzZS01NzY3ZWJjYzFmZTIiLCJ1c2VySWQiOiIzMDEyOGRlMC1iYjc4LTQ4NjEtOTMzMS1hNDNmYmRkY2E1MzgiLCJyZW1lbWJlck1lIjp0cnVlLCJpc1JlbWVtYmVyZWQiOnRydWUsImlhdCI6MTYyNjk1NTQxNCwiZXhwIjoxNjI5NTQ3NDE0LCJwYXNzd29yZFJldmlzaW9uIjowfQ.SQMdsqzesqzew6lLsNijqSpcKToVjZlKvZsNA2yFE58NSoVzz5HLRMV'
                }
            });
        });
    });
    describe('getCookies', () => {
        let auth: UnifiAuth;
        const getTokenMock = jest.fn();
        const getCookieTokenNameMock = jest.fn();
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, axios);
            // @ts-ignore
            auth.getToken = getTokenMock;
            // @ts-ignore
            auth.getCookieTokenName = getCookieTokenNameMock;
            getCookieTokenNameMock.mockClear();
            getCookieTokenNameMock.mockImplementationOnce(() => 'cookie_name');
            getTokenMock.mockClear();
        });
        describe('unifiOs', () => {
            it('should return cookies for authentication', async () => {
                expect(await auth.getCookies(true)).toStrictEqual([]);
                expect(getTokenMock).not.toHaveBeenCalled();
            });
            it('should return cookies for normal request', async () => {
                getTokenMock.mockImplementationOnce(() => Promise.resolve('aaaaa'));

                expect(await auth.getCookies(false)).toStrictEqual([
                    {
                        name: 'cookie_name',
                        value: 'aaaaa'
                    }
                ]);
                expect(getTokenMock).toHaveBeenCalled();
            });
            it('should handle empty token', async () => {
                getTokenMock.mockImplementationOnce(() => Promise.resolve());

                expect(await auth.getCookies(false)).toStrictEqual([]);
                expect(getTokenMock).toHaveBeenCalled();
            });
        });
        describe('not unifiOs', () => {
            beforeEach(() => {
                auth.unifiOs = false;
                // @ts-ignore
                auth.csrfToken = 'aaaaa';
            });
            it('should return cookies for authentication', async () => {
                expect(await auth.getCookies(true)).toStrictEqual([
                    {
                        name: 'csrf_token',
                        value: 'aaaaa'
                    }
                ]);
                expect(getTokenMock).not.toHaveBeenCalled();
            });
            it('should return cookies for normal request', async () => {
                getTokenMock.mockImplementationOnce(() => Promise.resolve('aaaaa'));

                expect(await auth.getCookies(false)).toStrictEqual([
                    {
                        name: 'cookie_name',
                        value: 'aaaaa'
                    },
                    {
                        name: 'csrf_token',
                        value: 'aaaaa'
                    }
                ]);
                expect(getTokenMock).toHaveBeenCalled();
            });
            it('should handle no csrfToken', async () => {
                // @ts-ignore
                auth.csrfToken = null;
                getTokenMock.mockImplementationOnce(() => Promise.resolve('aaaaa'));

                expect(await auth.getCookies(false)).toStrictEqual([
                    {
                        name: 'cookie_name',
                        value: 'aaaaa'
                    }
                ]);
                expect(getTokenMock).toHaveBeenCalled();
            });
            it('should handle empty token', async () => {
                getTokenMock.mockImplementationOnce(() => Promise.resolve());

                expect(await auth.getCookies(false)).toStrictEqual([
                    {
                        name: 'csrf_token',
                        value: 'aaaaa'
                    }
                ]);
                expect(getTokenMock).toHaveBeenCalled();
            });
        });
    });
});
