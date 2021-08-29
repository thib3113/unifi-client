//need to be first
import { debug } from '../mocks/utils';
import { UnifiAuth } from '../../src/UnifiAuth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { ClientError, EErrorsCodes } from '../../src';

jest.mock('axios');
jest.mock('jsonwebtoken');

describe('UnifiAuth.test.ts', () => {
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
        describe('should intercept request', () => {
            let interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig;
            beforeEach(() => {
                interceptor = interceptors.requests[0];
            });
            it('should set cookies for unifiOs', async () => {
                auth.unifiOs = true;
                // @ts-ignore
                auth.csrfToken = 'crsfTokenTest';
                auth.getCookies = jest.fn().mockImplementationOnce(() => [
                    {
                        name: 'cookie_name',
                        value: 'aaaaa'
                    }
                ]);
                expect(
                    await interceptor({
                        authenticationRequest: false,
                        headers: {}
                    })
                ).toStrictEqual({
                    authenticationRequest: false,
                    headers: {
                        Cookie: 'cookie_name=aaaaa',
                        'X-CSRF-Token': 'crsfTokenTest'
                    }
                });
            });
            it('should set cookies for non unifiOs', async () => {
                auth.unifiOs = false;
                auth.getCookies = jest.fn().mockImplementationOnce(() => [
                    {
                        name: 'cookie_name',
                        value: 'aaaaa'
                    }
                ]);
                expect(
                    await interceptor({
                        authenticationRequest: false,
                        headers: {}
                    })
                ).toStrictEqual({
                    authenticationRequest: false,
                    headers: {
                        Cookie: 'cookie_name=aaaaa'
                    }
                });
            });
            it('should not set cookies if no cookies', async () => {
                auth.unifiOs = false;
                auth.getCookies = jest.fn().mockImplementationOnce(() => []);
                expect(
                    await interceptor({
                        authenticationRequest: false,
                        headers: {}
                    })
                ).toStrictEqual({
                    authenticationRequest: false,
                    headers: {}
                });
            });
        });
        describe('should intercept response', () => {
            let interceptor: (response: AxiosResponse) => AxiosResponse;
            const getCookiesFromResponseMock = jest.fn();
            beforeEach(() => {
                interceptor = interceptors.response[0][0];
                // @ts-ignore
                auth.getCookiesFromResponse = getCookiesFromResponseMock;
            });
            it('should save the csrfToken from headers on unifiOs', () => {
                auth.unifiOs = true;
                expect(
                    interceptor({
                        config: {},
                        data: undefined,
                        status: 0,
                        statusText: '',
                        headers: {
                            'x-csrf-token': 'test-x-csrf-token'
                        }
                    })
                ).toStrictEqual({
                    config: {},
                    headers: {
                        'x-csrf-token': 'test-x-csrf-token'
                    },
                    data: undefined,
                    status: 0,
                    statusText: ''
                });
                // @ts-ignore
                expect(auth.csrfToken).toBe('test-x-csrf-token');
            });
            it('should save the csrfToken from cookies on non unifiOs', () => {
                auth.unifiOs = false;

                getCookiesFromResponseMock.mockImplementationOnce(() => ({
                    csrf_token: {
                        value: 'test-x-csrf-token-not-unifios'
                    }
                }));

                expect(
                    interceptor({
                        config: {},
                        data: undefined,
                        status: 0,
                        statusText: '',
                        headers: {
                            'x-frame-options': 'SAMEORIGIN'
                        }
                    })
                ).toStrictEqual({
                    config: {},
                    headers: {
                        'x-frame-options': 'SAMEORIGIN'
                    },
                    data: undefined,
                    status: 0,
                    statusText: ''
                });
                // @ts-ignore
                expect(auth.csrfToken).toBe('test-x-csrf-token-not-unifios');
            });
            it('should handle no cookies on non unifiOs', () => {
                auth.unifiOs = false;

                getCookiesFromResponseMock.mockImplementationOnce(() => ({}));

                expect(
                    interceptor({
                        config: {},
                        data: undefined,
                        status: 0,
                        statusText: '',
                        headers: {
                            'x-frame-options': 'SAMEORIGIN'
                        }
                    })
                ).toStrictEqual({
                    config: {},
                    headers: {
                        'x-frame-options': 'SAMEORIGIN'
                    },
                    data: undefined,
                    status: 0,
                    statusText: ''
                });
                // @ts-ignore
                expect(auth.csrfToken).toBe(undefined);
            });
        });
        describe('should intercept error  response', () => {
            let interceptor: (error: any) => any;
            beforeEach(() => {
                interceptor = interceptors.response[0][1];
            });
            it('should handle errors but getting csrf token too', async () => {
                expect.assertions(3);
                try {
                    // @ts-ignore
                    expect(auth.csrfToken).toBeUndefined();
                    await interceptor({
                        response: {
                            headers: { 'x-csrf-token': 'test-csrf-token' }
                        }
                    });
                } catch (e) {
                    // @ts-ignore
                    expect(auth.csrfToken).toBe('test-csrf-token');
                    expect(e).toStrictEqual({
                        response: {
                            headers: {
                                'x-csrf-token': 'test-csrf-token'
                            }
                        }
                    });
                }
            });
            it('should handle no csrf token header', async () => {
                expect.assertions(3);
                try {
                    // @ts-ignore
                    expect(auth.csrfToken).toBeUndefined();
                    await interceptor({
                        response: {
                            headers: {}
                        }
                    });
                } catch (e) {
                    // @ts-ignore
                    expect(auth.csrfToken).toBeUndefined();
                    expect(e).toStrictEqual({
                        response: {
                            headers: {}
                        }
                    });
                }
            });
            it('should handle errors and return for next use', async () => {
                expect.assertions(1);
                try {
                    await interceptor({});
                } catch (e) {
                    expect(e).toStrictEqual({});
                }
            });
            describe('non unifiOs', () => {
                const loginMock = jest.fn().mockResolvedValue('');
                const requestMock = jest.fn();
                beforeEach(() => {
                    auth.login = loginMock;
                    auth.unifiOs = false;
                    auth.autoReLogin = true;
                    // @ts-ignore
                    auth.controllerInstance.request = requestMock;
                });
                it(`should auto retry if it's not unifiOs and UNAUTHORIZED`, async () => {
                    await interceptor({
                        response: {
                            config: {},
                            status: 401
                        }
                    });
                    expect(loginMock).toHaveBeenCalledTimes(1);
                    expect(requestMock).toHaveBeenCalledWith(expect.objectContaining({ retryAuth: true }));
                });
            });
        });
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
                                version: '6.4.51'
                            }
                        ]
                    }
                })
            );

            expect(await auth.getVersion()).toBe('6.4.51');
            expect(debug.debugMock).toHaveBeenCalledWith('controller version is : %s', '6.4.51');
            expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', expect.objectContaining({ urlParams: { site: 'default' } }));
        });
        describe('test errors', () => {
            it('should return undefined if failed', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() => Promise.reject());

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', expect.objectContaining({ urlParams: { site: 'default' } }));
            });
            it('should return undefined if no data', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', expect.objectContaining({ urlParams: { site: 'default' } }));
            });
            it('should return undefined if no data in unifi response', async () => {
                (axios.get as jest.Mock).mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {}
                    })
                );

                expect(await auth.getVersion()).toBe(undefined);
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', expect.objectContaining({ urlParams: { site: 'default' } }));
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
                expect(axios.get).toBeCalledWith('/api/s/:site/stat/sysinfo', expect.objectContaining({ urlParams: { site: 'default' } }));
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

                expect(await auth.getCookies()).toStrictEqual([
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
    describe('login', () => {
        let auth: UnifiAuth;
        const axiosMock = axios as jest.Mocked<typeof axios>;

        const getCookiesFromResponseMock = jest.fn();
        const getCookieTokenNameMock = jest.fn();
        beforeEach(() => {
            auth = new UnifiAuth({ username: 'user', password: 'passwd' }, axios);
            axiosMock.get.mockClear();

            getCookiesFromResponseMock.mockClear();
            getCookieTokenNameMock.mockClear();

            getCookiesFromResponseMock.mockImplementation(() => ({
                TEST_TOKEN: {
                    httpOnly: true,
                    name: 'TEST_TOKEN',
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpADFGGL9.eyJjc3JmVG9rZW4iOiIwNGE2NTJlZS0zZDI0LTQxNTEtOTYzZS01NzY3ZWJjYzFmZTIiLCJ1c2VySWQiOiIzMDEyOGRlMC1iYjc4LTQ4NjEtOTMzMS1hNDNmYmRkY2E1MzgiLCJyZW1lbWJlck1lIjp0cnVlLCJpc1JlbWVtYmVyZWQiOnRydWUsImlhdCI6MTYyNjk1NTQxNCwiZXhwIjoxNjI5NTQ3NDE0LCJwYXNzd29yZFJldmlzaW9uIjowfQ.SQMdsqzesqzew6lLsNijqSpcKToVjZlKvZsNA2yFE58NSoVzz5HLRMV'
                }
            }));
            getCookieTokenNameMock.mockImplementation(() => 'TEST_TOKEN');

            // @ts-ignore
            auth.getCookiesFromResponse = getCookiesFromResponseMock;
            // @ts-ignore
            auth.getCookieTokenName = getCookieTokenNameMock;

            debug.debugMock.mockClear();
            debug.debugExtend.mockClear();
        });
        it('should login to unifiOs', async () => {
            axiosMock.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    headers: {
                        ['x-csrf-token']: 'aaaaaa'
                    }
                })
            );
            axiosMock.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        unique_id: '3ce548f1-dcf0-4eb2-a912-a6bc3858d1d6',
                        first_name: 'firstName',
                        last_name: 'lastName',
                        full_name: 'fullName',
                        email: 'demo@ubnt.com',
                        email_status: 'UNVERIFIED',
                        phone: '',
                        avatar_relative_path: '',
                        avatar_rpath2: '',
                        status: 'ACTIVE'
                    }
                })
            );

            expect(await auth.login()).toStrictEqual({
                unique_id: '3ce548f1-dcf0-4eb2-a912-a6bc3858d1d6',
                first_name: 'firstName',
                last_name: 'lastName',
                full_name: 'fullName',
                email: 'demo@ubnt.com',
                email_status: 'UNVERIFIED',
                phone: '',
                avatar_relative_path: '',
                avatar_rpath2: '',
                status: 'ACTIVE'
            });
            expect(axiosMock.get).toBeCalledWith('/', { authenticationRequest: true, validateStatus: expect.any(Function) });

            const mockCall = axiosMock.get.mock.calls[0][1] as AxiosRequestConfig;
            //validateStatus need to return true for all statuses
            expect(mockCall.validateStatus && mockCall.validateStatus(1)).toBeTruthy();
            expect(debug.debugExtend).toBeCalledWith('login');
            expect(auth.unifiOs).toBeTruthy();
            expect(auth.autoReLogin).toBeTruthy();
            expect(axiosMock.post).toBeCalledWith(
                '/auth/login',
                { password: 'passwd', rememberMe: true, token: undefined, username: 'user' },
                { authenticationRequest: true, apiPart: true }
            );
            //check debug messages
            expect(debug.debugMock).toHaveBeenNthCalledWith(1, 'login()');
            expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'check if unifiOs');
            expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'os found : unifiOs');
            expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'start login request');
            expect(debug.debugMock).toHaveBeenNthCalledWith(5, 'end login request');
        });
        it('should login to not unifiOs', async () => {
            getCookiesFromResponseMock.mockImplementationOnce(() => ({
                TEST_TOKEN: {
                    httpOnly: true,
                    name: 'TEST_TOKEN',
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpADFGGL9.eyJjc3JmVG9rZW4iOiIwNGE2NTJlZS0zZDI0LTQxNTEtOTYzZS01NzY3ZWJjYzFmZTIiLCJ1c2VySWQiOiIzMDEyOGRlMC1iYjc4LTQ4NjEtOTMzMS1hNDNmYmRkY2E1MzgiLCJyZW1lbWJlck1lIjp0cnVlLCJpc1JlbWVtYmVyZWQiOnRydWUsImlhdCI6MTYyNjk1NTQxNCwiZXhwIjoxNjI5NTQ3NDE0LCJwYXNzd29yZFJldmlzaW9uIjowfQ.SQMdsqzesqzew6lLsNijqSpcKToVjZlKvZsNA2yFE58NSoVzz5HLRMV'
                },
                csrf_token: {
                    httpOnly: true,
                    name: 'csrf_token',
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    value: 'csrf_token_value'
                }
            }));
            axiosMock.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 302,
                    headers: {
                        location: '/manage'
                    }
                })
            );
            axiosMock.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        unique_id: '3ce548f1-dcf0-4eb2-a912-a6bc3858d1d6',
                        first_name: 'firstName',
                        last_name: 'lastName',
                        full_name: 'fullName',
                        email: 'demo@ubnt.com',
                        email_status: 'UNVERIFIED',
                        phone: '',
                        avatar_relative_path: '',
                        avatar_rpath2: '',
                        status: 'ACTIVE'
                    }
                })
            );
            expect(await auth.login()).toStrictEqual({
                avatar_relative_path: '',
                avatar_rpath2: '',
                email: 'demo@ubnt.com',
                email_status: 'UNVERIFIED',
                first_name: 'firstName',
                full_name: 'fullName',
                last_name: 'lastName',
                phone: '',
                status: 'ACTIVE',
                unique_id: '3ce548f1-dcf0-4eb2-a912-a6bc3858d1d6'
            });
            expect(auth.unifiOs).toBeFalsy();
            expect(auth.autoReLogin).toBeTruthy();
            expect(axiosMock.get).toBeCalledWith('/', { authenticationRequest: true, validateStatus: expect.any(Function) });
            //validateStatus need to return true for all statuses
            const mockCall = axiosMock.get.mock.calls[0][1] as AxiosRequestConfig;
            //validateStatus need to return true for all statuses
            expect(mockCall.validateStatus && mockCall.validateStatus(1)).toBeTruthy();
            expect(debug.debugExtend).toBeCalledWith('login');
            expect(axiosMock.post).toBeCalledWith(
                '/login',
                { password: 'passwd', rememberMe: true, token: undefined, username: 'user' },
                { authenticationRequest: true, apiPart: true }
            );
            //check debug messages
            expect(debug.debugMock).toHaveBeenNthCalledWith(1, 'login()');
            expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'check if unifiOs');
            expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'os found : not unifiOs');
            expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'start login request');
            expect(debug.debugMock).toHaveBeenNthCalledWith(5, 'end login request');
            expect(debug.debugMock).toHaveBeenNthCalledWith(6, 'found csrf token in cookie, saving it');
        });
        it('should skip detection if already detected', async () => {
            getCookiesFromResponseMock.mockImplementationOnce(() => ({
                TEST_TOKEN: {
                    httpOnly: true,
                    name: 'TEST_TOKEN',
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpADFGGL9.eyJjc3JmVG9rZW4iOiIwNGE2NTJlZS0zZDI0LTQxNTEtOTYzZS01NzY3ZWJjYzFmZTIiLCJ1c2VySWQiOiIzMDEyOGRlMC1iYjc4LTQ4NjEtOTMzMS1hNDNmYmRkY2E1MzgiLCJyZW1lbWJlck1lIjp0cnVlLCJpc1JlbWVtYmVyZWQiOnRydWUsImlhdCI6MTYyNjk1NTQxNCwiZXhwIjoxNjI5NTQ3NDE0LCJwYXNzd29yZFJldmlzaW9uIjowfQ.SQMdsqzesqzew6lLsNijqSpcKToVjZlKvZsNA2yFE58NSoVzz5HLRMV'
                },
                csrf_token: {
                    httpOnly: true,
                    name: 'csrf_token',
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    value: 'csrf_token_value'
                }
            }));
            axiosMock.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: 'data'
                })
            );

            //simulate an os already known
            auth.unifiOs = true;
            await auth.login();

            expect(auth.unifiOs).toBeTruthy();
            expect(auth.autoReLogin).toBeTruthy();
            expect(axiosMock.get).not.toBeCalled();
        });
        it('should handle 2FA', async () => {
            axiosMock.get.mockImplementationOnce(() =>
                Promise.resolve({
                    status: 200,
                    headers: {
                        ['x-csrf-token']: 'aaaaaa'
                    }
                })
            );
            axiosMock.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        unique_id: '3ce548f1-dcf0-4eb2-a912-a6bc3858d1d6',
                        first_name: 'firstName',
                        last_name: 'lastName',
                        full_name: 'fullName',
                        email: 'demo@ubnt.com',
                        email_status: 'UNVERIFIED',
                        phone: '',
                        avatar_relative_path: '',
                        avatar_rpath2: '',
                        status: 'ACTIVE'
                    }
                })
            );
            //simulate an os already known
            await auth.login('123456');

            expect(auth.autoReLogin).toBeFalsy();
            expect(axiosMock.post).toBeCalledWith(
                '/auth/login',
                { password: 'passwd', rememberMe: true, token: '123456', username: 'user' },
                { authenticationRequest: true, apiPart: true }
            );
        });
        describe('check errors', () => {
            it('should handle an unknown result from os detection', async () => {
                axiosMock.get.mockImplementationOnce(() =>
                    Promise.resolve({
                        status: 302,
                        headers: {
                            location: '/other_os_redirection'
                        }
                    })
                );

                expect.assertions(3);
                try {
                    await auth.login();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.code).toBe(EErrorsCodes.FAIL_TO_DETECT_UNIFIOS);
                    expect(e.message).toBe('fail to detect unifiOs or not !');
                }
            });
            it('should handle a token not found in cookies', async () => {
                getCookiesFromResponseMock.mockImplementation(() => ({
                    TATA_YOYO: {
                        httpOnly: true,
                        name: 'TATA_YOYO',
                        path: '/',
                        sameSite: 'strict',
                        secure: true,
                        value: 'aaaaaaa'
                    }
                }));
                axiosMock.get.mockImplementationOnce(() =>
                    Promise.resolve({
                        status: 200,
                        headers: {
                            ['x-csrf-token']: 'aaaaaa'
                        }
                    })
                );

                expect.assertions(3);
                try {
                    await auth.login();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.code).toBe(EErrorsCodes.FAIL_LOGIN);
                    expect(e.message).toMatch('fail to get token from cookies[');
                }
            });

            it('should handle not unifiOs without csrf_cookie', async () => {
                getCookiesFromResponseMock.mockImplementationOnce(() => ({
                    TEST_TOKEN: {
                        httpOnly: true,
                        name: 'TEST_TOKEN',
                        path: '/',
                        sameSite: 'strict',
                        secure: true,
                        value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpADFGGL9.eyJjc3JmVG9rZW4iOiIwNGE2NTJlZS0zZDI0LTQxNTEtOTYzZS01NzY3ZWJjYzFmZTIiLCJ1c2VySWQiOiIzMDEyOGRlMC1iYjc4LTQ4NjEtOTMzMS1hNDNmYmRkY2E1MzgiLCJyZW1lbWJlck1lIjp0cnVlLCJpc1JlbWVtYmVyZWQiOnRydWUsImlhdCI6MTYyNjk1NTQxNCwiZXhwIjoxNjI5NTQ3NDE0LCJwYXNzd29yZFJldmlzaW9uIjowfQ.SQMdsqzesqzew6lLsNijqSpcKToVjZlKvZsNA2yFE58NSoVzz5HLRMV'
                    }
                }));
                axiosMock.get.mockImplementationOnce(() =>
                    Promise.resolve({
                        status: 302,
                        headers: {
                            location: '/manage'
                        }
                    })
                );
                axiosMock.post.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: 'data'
                    })
                );

                expect.assertions(3);
                try {
                    await auth.login();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.code).toBe(EErrorsCodes.FAIL_GET_CSRF_COOKIE);
                    expect(e.message).toMatch('fail to get CSRF token from cookies');
                }
            });
        });
    });
});
