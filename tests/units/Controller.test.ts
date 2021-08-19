//need to be first
import { axiosUrlParamsMock, debug, getUrlRepresentationMock } from '../mocks/utils';
import { ClientError, Controller, EErrorsCodes, EProxyNamespaces, UnifiError, UnifiWebsockets } from '../../src';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import https from 'https';
import { UnifiAuth } from '../../src/UnifiAuth';
import curlirize from 'axios-curlirize';
import fs from 'fs';
import path from 'path';

jest.mock('axios');
jest.mock('axios-curlirize');
jest.mock('../../src/UnifiAuth');
jest.mock('../../src/Sites/Sites');
jest.mock('../../src/WebSockets/UnifiWebsockets');

describe('test controller', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    beforeEach(() => {
        (mockedAxios as unknown as jest.Mock).mockClear();

        mockedAxios.create.mockImplementation(() => mockedAxios);
    });

    describe('construct', () => {
        describe('strictSSL', () => {
            it('test setting strictSSL', () => {
                const controller = new Controller({
                    url: 'http://localhost',
                    username: 'username',
                    password: 'password'
                });

                expect(controller.strictSSL).toBe(true);
            });
            it('test setting strictSSL false', () => {
                const controller = new Controller({
                    url: 'http://localhost',
                    username: 'username',
                    password: 'password',
                    strictSSL: false
                });

                expect(controller.strictSSL).toBe(false);
            });
        });
        describe('props', () => {
            it('test setting props', () => {
                const controller = new Controller({
                    url: 'http://localhost',
                    username: 'username',
                    password: 'password',
                    strictSSL: false,
                    rememberMe: false,
                    webSocketsURL: 'http://ws.url'
                });

                // @ts-ignore
                const props = controller.props;
                expect(props.url).toBe('http://localhost');
                expect(props.username).toBe('username');
                expect(props.password).toBe('password');
                expect(props.strictSSL).toBe(false);
                expect(props.rememberMe).toBe(false);

                //some private fields need to resist to rest
                const restController = { ...controller };
                // @ts-ignore
                expect(restController.props).not.toBeDefined();
                // @ts-ignore
                expect(restController.ws).not.toBeDefined();
            });
        });
        describe('instance created', () => {
            it('without strictSSL', () => {
                new Controller({
                    url: 'http://unifi.lan',
                    username: 'username',
                    password: 'password',
                    strictSSL: false
                });

                expect(axios.create).toBeCalledWith({
                    // not authentication
                    authenticationRequest: false,
                    // url set before
                    baseURL: 'http://unifi.lan',
                    // headers json
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    // custom https agent
                    httpsAgent: expect.any(https.Agent),
                    // doesn't follow redirections
                    maxRedirects: 0,
                    // not site
                    site: undefined
                });

                expect(mockedAxios.create.mock.calls[0][0]?.httpsAgent.options.rejectUnauthorized).toBe(false);
            });
            it('with strictSSL', () => {
                new Controller({
                    url: 'http://unifi.lan',
                    username: 'username',
                    password: 'password',
                    strictSSL: true
                });

                expect(axios.create).toBeCalledWith({
                    // not authentication
                    authenticationRequest: false,
                    // url set before
                    baseURL: 'http://unifi.lan',
                    // headers json
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    // no custom https agent
                    httpsAgent: undefined,
                    // doesn't follow redirections
                    maxRedirects: 0,
                    // not site
                    site: undefined
                });
            });
        });
        describe('unifiAuth initialized', () => {
            it('without strictSSL', () => {
                new Controller({
                    url: 'http://unifi.lan',
                    username: 'username',
                    password: 'password',
                    strictSSL: false
                });

                expect(UnifiAuth).toBeCalledWith(
                    {
                        url: 'http://unifi.lan',
                        username: 'username',
                        password: 'password',
                        strictSSL: false
                    },
                    expect.anything()
                );
            });
        });
        describe('axios interceptors', () => {
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
            const instance = {
                interceptors: {
                    request: {
                        use: requestMock
                    },
                    response: {
                        use: responseMock
                    }
                }
            };
            const resetInstancesMock = () => {
                interceptors.response = [];
                interceptors.requests = [];
            };
            beforeEach(() => {
                responseMock.mockClear();
                requestMock.mockClear();
                resetInstancesMock();
                (curlirize as jest.Mock).mockClear();
            });
            it('add interceptors', () => {
                new Controller({
                    url: 'http://unifi.lan',
                    username: 'username',
                    password: 'password'
                });

                //for unknown reason, request and response are the same
                expect(mockedAxios.interceptors.request.use).toHaveBeenCalledTimes(4);
                expect(mockedAxios.interceptors.response.use).toHaveBeenCalledTimes(4);
            });
            it('test addAxiosPlugins', () => {
                const controller = new Controller({
                    url: 'http://unifi.lan',
                    username: 'username',
                    password: 'password'
                });
                resetInstancesMock();

                // @ts-ignore
                controller.addAxiosPlugins(instance as unknown as AxiosInstance);
                expect(axiosUrlParamsMock).toHaveBeenCalled();
            });
            it('test addAxiosProxyInterceptors', () => {
                const controller = new Controller({
                    url: 'http://unifi.lan',
                    username: 'username',
                    password: 'password'
                });

                resetInstancesMock();
                // @ts-ignore
                controller.addAxiosProxyInterceptors(instance as unknown as AxiosInstance);
                const spyBuildUrl = jest.spyOn(controller, 'buildUrl').mockImplementationOnce(() => ({ apiVersion: 326 }));
                // test interceptors, this one add urlParams
                const interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig = interceptors.requests[0];

                expect(interceptor).toBeDefined();
                const res = interceptor({ apiVersion: 623 });
                //just pass config from interceptor call
                expect(spyBuildUrl).toHaveBeenCalledWith({ apiVersion: 623 });
                // and return the value from buildUrl
                expect(res).toStrictEqual({ apiVersion: 326 });
            });

            describe('test addAxiosDebugInterceptors', () => {
                let controller: Controller;

                //test the error handler
                const clearCurlMock = jest.fn();

                const config = {
                    isRetry: false,
                    clearCurl: clearCurlMock,
                    curlObject: {},
                    curlCommand: 'curl XXX'
                };
                const data = {
                    meta: {
                        msg: 'test meta message'
                    },
                    error: 'unifi error',
                    errors: ['unifi errors : 1', 'unifi errors : 2']
                };
                const response = {
                    config,
                    data,
                    statusText: 'error statusText'
                };
                const errorRes = {
                    response
                };

                beforeEach(() => {
                    controller = new Controller({
                        url: 'http://unifi.lan',
                        username: 'username',
                        password: 'password'
                    });
                    resetInstancesMock();
                    (curlirize as jest.Mock).mockClear();
                    debug.debugMock.mockClear();
                });

                it('curlirize', () => {
                    let curlirizeFunction: (res: { command: string }, err?: string) => void = () => {};
                    (curlirize as jest.Mock).mockImplementationOnce((instance, fn) => {
                        curlirizeFunction = fn;
                        return instance;
                    });

                    // @ts-ignore
                    controller.addAxiosDebugInterceptors(instance as unknown as AxiosInstance);
                    //need to register curlirize
                    expect(curlirize).toHaveBeenCalledWith(instance, expect.any(Function));

                    debug.debugMock.mockClear();
                    curlirizeFunction({ command: 'curl XXXX' });
                    expect(debug.debugMock).toHaveBeenCalledWith('curl XXXX');

                    debug.debugMock.mockClear();
                    curlirizeFunction({ command: 'curl XXXX' }, 'error 1');
                    expect(debug.debugMock).toHaveBeenCalledWith('err : %O', 'error 1');
                });

                it('debug logs', () => {
                    // @ts-ignore
                    controller.addAxiosDebugInterceptors(instance as unknown as AxiosInstance);
                    // test interceptors, this one add debug ( debug logs + curlirize )
                    const interceptorDebugLogs: (config: AxiosRequestConfig) => AxiosRequestConfig = interceptors.requests[0];
                    getUrlRepresentationMock.mockImplementationOnce(() => 'http://url');

                    //first one will add metaData and logs
                    expect(interceptorDebugLogs).toBeDefined();
                    const res = interceptorDebugLogs({
                        method: 'get',
                        headers: {
                            foo: 'bar'
                        },
                        data: {
                            bar: 'foo'
                        }
                    });
                    // @ts-ignore
                    expect(res.metadata.startTime).toBeInstanceOf(Date);
                    expect(debug.debugMock).toHaveBeenCalledWith('Starting Request on url get http://url');
                    expect(debug.debugMock).toHaveBeenCalledWith('headers : %O', { foo: 'bar' });
                    expect(debug.debugMock).toHaveBeenCalledWith('payload : %O', { bar: 'foo' });
                });

                it('success response interceptor', () => {
                    // @ts-ignore
                    controller.addAxiosDebugInterceptors(instance as unknown as AxiosInstance);
                    const interceptorResponse1 = interceptors.response[1];
                    expect(interceptorResponse1).toBeDefined();
                    if (!interceptorResponse1) {
                        //this will be never be called ... but typescript know interceptorResponse1 is defined
                        throw new Error('interceptor is not defined');
                    }
                    //just return the response
                    expect(
                        interceptorResponse1[0]({
                            data: {},
                            status: 1,
                            statusText: '',
                            headers: {},
                            config: {}
                        })
                    ).toStrictEqual({
                        data: {},
                        status: 1,
                        statusText: '',
                        headers: {},
                        config: {}
                    });
                });

                describe('debug axios request', () => {
                    let interceptor: [(response: AxiosResponse) => AxiosResponse, (error: any) => any];
                    let failedInterceptor: (error: any) => any;
                    let succeedInterceptor: (response: AxiosResponse) => AxiosResponse;

                    const startTime = new Date();
                    const dbgResponse = {
                        status: 200,
                        statusText: 'statusText',
                        config: {
                            metadata: {
                                startTime
                            },
                            method: 'get'
                        },
                        headers: {
                            foo: 'bar'
                        },
                        request: {
                            _header: {
                                foo: 'bar2'
                            }
                        }
                    };
                    const dbgError = {
                        response: { ...dbgResponse, data: 'test' },
                        config: {
                            method: 'get'
                        }
                    };

                    beforeEach(() => {
                        // @ts-ignore
                        controller.addAxiosDebugInterceptors(instance as unknown as AxiosInstance);
                        interceptor = interceptors.response[0];
                        succeedInterceptor = interceptor[0];
                        failedInterceptor = interceptor[1];
                        getUrlRepresentationMock.mockClear();
                    });

                    it('handle success', () => {
                        getUrlRepresentationMock.mockImplementation(() => 'http://url');
                        // @ts-ignore
                        expect(succeedInterceptor(dbgResponse)).toStrictEqual(dbgResponse);

                        expect(debug.debugMock).toHaveBeenCalledWith(
                            expect.stringMatching(/Response from get http:\/\/url with code 200 statusText in [0-9.]+ seconds/gm)
                        );
                        expect(debug.debugMock).toHaveBeenCalledWith('headers : %O', dbgResponse.headers);
                        expect(debug.debugMock).toHaveBeenCalledWith('headers sent : %O', dbgResponse.request._header);

                        //debug edge cases
                        // @ts-ignore
                        expect(succeedInterceptor({ ...dbgResponse, config: undefined })).toStrictEqual({
                            ...dbgResponse,
                            config: undefined
                        });
                        // @ts-ignore
                        expect(
                            succeedInterceptor({
                                ...dbgResponse,
                                config: {
                                    ...dbgResponse.config,
                                    // @ts-ignore
                                    metadata: undefined
                                }
                            })
                        ).toStrictEqual({
                            ...dbgResponse,
                            config: {
                                ...dbgResponse.config,
                                metadata: undefined
                            }
                        });

                        // @ts-ignore
                        expect(
                            succeedInterceptor({
                                ...dbgResponse,
                                config: {
                                    ...dbgResponse.config,
                                    // @ts-ignore
                                    metadata: {
                                        startTime: undefined
                                    }
                                }
                            })
                        ).toStrictEqual({
                            ...dbgResponse,
                            config: {
                                ...dbgResponse.config,
                                // @ts-ignore
                                metadata: {
                                    startTime: undefined
                                }
                            }
                        });

                        // @ts-ignore
                        expect(succeedInterceptor(undefined)).toStrictEqual(undefined);
                    });
                    it('handle error', async () => {
                        getUrlRepresentationMock.mockImplementation(() => 'http://url');
                        // @ts-ignore
                        expect.assertions(11);
                        let currentError = dbgError;
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toBe(currentError);
                            expect(debug.debugMock).toHaveBeenCalledWith('Response from get http://url with code 200 statusText');
                            expect(debug.debugMock).toHaveBeenCalledWith('headers : %O', currentError.response.headers);
                            expect(debug.debugMock).toHaveBeenCalledWith('payload : %O', currentError.response.data);
                        }

                        currentError = {
                            ...dbgError,
                            response: {
                                // @ts-ignore
                                config: undefined
                            }
                        };
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toBe(currentError);
                        }

                        currentError = {
                            ...dbgError,
                            response: {
                                // @ts-ignore
                                headers: undefined
                            }
                        };
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toBe(currentError);
                        }

                        currentError = {
                            ...dbgError,
                            response: {
                                // @ts-ignore
                                data: undefined
                            }
                        };
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toBe(currentError);
                        }

                        try {
                            await failedInterceptor(undefined);
                        } catch (e) {
                            expect(e).toBe(undefined);
                        }

                        currentError = {
                            ...dbgError,
                            // @ts-ignore
                            response: undefined
                        };
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toStrictEqual(currentError);
                        }

                        currentError = {
                            ...dbgError,
                            // @ts-ignore
                            response: undefined,
                            isAxiosError: true
                        };
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toStrictEqual(currentError);
                        }

                        currentError = {
                            ...dbgError,
                            // @ts-ignore
                            response: undefined,
                            isAxiosError: true,
                            // @ts-ignore
                            config: undefined
                        };
                        try {
                            await failedInterceptor(currentError);
                        } catch (e) {
                            expect(e).toStrictEqual(currentError);
                        }
                    });
                });

                describe('unifi error handler', () => {
                    let interceptor: (error: any) => any;
                    beforeEach(() => {
                        // @ts-ignore
                        controller.addAxiosDebugInterceptors(instance as unknown as AxiosInstance);
                        interceptor = interceptors.response[1][1];
                    });

                    it('globals tests', async () => {
                        expect.assertions(9);
                        // if no response, return the error
                        try {
                            await interceptor({
                                ...errorRes,
                                response: undefined
                            });
                        } catch (e) {
                            expect(e).toStrictEqual({ response: undefined });
                        }
                        //if response empty object
                        try {
                            await interceptor({
                                ...errorRes,
                                response: {}
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('Unknown HTTP Error');
                        }
                        //if error is undefined
                        try {
                            await interceptor(undefined);
                        } catch (e) {
                            expect(e).toBe(undefined);
                        }
                        //if curlirize doesn't add clearCurl fn
                        const clearCurlMock = jest.fn();
                        try {
                            await interceptor({
                                ...errorRes,
                                response: {},
                                config: {
                                    clearCurl: clearCurlMock
                                }
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('Unknown HTTP Error');
                            expect(clearCurlMock).toHaveBeenCalled();
                        }
                        //if curlirize doesn't implement clearCurl
                        try {
                            await interceptor({
                                ...errorRes,
                                response: {},
                                config: {}
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('Unknown HTTP Error');
                        }
                    });

                    it('skip if isRetry', async () => {
                        try {
                            //test if is Retry
                            await interceptor({
                                ...errorRes,
                                response: {
                                    ...response,
                                    config: {
                                        ...config,
                                        isRetry: true
                                    }
                                }
                            });
                            expect(true).toBe(true);
                        } catch (e) {
                            expect(false).toBe(true);
                        }
                    });
                    it('build the unifi error', async () => {
                        expect.assertions(12);
                        try {
                            //test with default error message
                            await interceptor(errorRes);
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('test meta message');
                        }
                        try {
                            //test if no meta.msg from unifi but unifi return an error
                            await interceptor({
                                ...errorRes,
                                response: {
                                    ...response,
                                    data: {
                                        ...data,
                                        meta: {
                                            msg: undefined
                                        }
                                    }
                                }
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('unifi error');
                        }
                        try {
                            //test if no meta from unifi but unifi return an error
                            await interceptor({
                                ...errorRes,
                                response: {
                                    ...response,
                                    data: {
                                        ...data,
                                        meta: undefined
                                    }
                                }
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('unifi error');
                        }
                        try {
                            //test if no meta from unifi but unifi return errors
                            await interceptor({
                                ...errorRes,
                                response: {
                                    ...response,
                                    data: {
                                        ...data,
                                        meta: undefined,
                                        error: undefined
                                    }
                                }
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            // match the errors 1 and 2, separated by some dash
                            // example :
                            // | unifi errors : 1
                            // |
                            // |  -----
                            // |
                            // | unifi errors : 2
                            expect(e.message).toMatch(/unifi errors : 1\s*[-]+\s*unifi errors : 2/gm);
                        }

                        try {
                            //test if no data
                            await interceptor({
                                ...errorRes,
                                response: {
                                    ...response,
                                    data: undefined
                                }
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('error statusText');
                        }

                        try {
                            //test if no data / no statusText
                            await interceptor({
                                ...errorRes,
                                response: {}
                            });
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.message).toBe('Unknown HTTP Error');
                        }
                    });
                });
            });
            it('test addAxiosDebugInterceptors', async () => {});
        });
    });

    describe('getInstance', () => {
        it('return the instance', () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            expect(controller.getInstance()).toBe(controller.controllerInstance);
        });
    });

    describe('needLoggedIn', () => {
        it('should pass if loggedIn', () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            // @ts-ignore
            controller.logged = true;

            // @ts-ignore
            controller.needLoggedIn();

            expect(true).toBe(true);
        });
        it('should throw if not loggedIn', () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            expect.assertions(3);
            try {
                // @ts-ignore
                controller.needLoggedIn();
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('you need to login before');
                expect(e.code).toBe(EErrorsCodes.NEED_LOGIN);
            }
        });
    });

    describe('getSites', () => {
        it('should return _sites if logged', async () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            // @ts-ignore
            controller.logged = true;

            const mock = jest.fn().mockImplementation(() => Promise.resolve([]));
            const obj = {
                list: mock
            };

            // @ts-ignore
            controller._sites = obj;

            expect(controller.sites).toBe(obj);
            expect(await controller.getSites()).toStrictEqual([]);
            expect(mock).toHaveBeenCalled();
        });
    });

    describe('buildUrl', () => {
        let controller: Controller;
        const config = {
            url: '/notifications',
            baseURL: 'http://unifi',
            proxyNamespace: EProxyNamespaces.NETWORK
        };
        beforeEach(() => {
            controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });
        });
        describe('unifiOs', () => {
            beforeEach(() => {
                controller.unifiOs = true;
            });

            it('should build controller url', () => {
                expect(controller.buildUrl({ ...config, apiPart: false })).toStrictEqual(
                    expect.objectContaining({
                        url: '/notifications',
                        baseURL: 'http://unifi/proxy/network'
                    })
                );
            });

            it('should handle login/logout url', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/auth/login',
                        proxyNamespace: false,
                        apiPart: 'api'
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/api/auth/login',
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle no url', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: undefined,
                        apiPart: false
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: undefined,
                        baseURL: 'http://unifi/proxy/network'
                    })
                );
            });

            it('should handle custom unifiOs url', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/groups',
                        proxyNamespace: EProxyNamespaces.LED,
                        apiPart: false
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/groups',
                        proxyNamespace: EProxyNamespaces.LED,
                        baseURL: 'http://unifi/proxy/led'
                    })
                );
            });

            it('should handle api version', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/notifications',
                        apiVersion: 2
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/v2/api/notifications',
                        apiVersion: 2,
                        baseURL: 'http://unifi/proxy/network'
                    })
                );
            });

            it('should handle site', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/notifications',
                        site: 'default',
                        apiPart: 'api'
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/api/s/default/notifications',
                        site: 'default',
                        baseURL: 'http://unifi/proxy/network'
                    })
                );
            });

            it('should handle site with api version', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/notifications',
                        site: 'default',
                        apiVersion: 2,
                        apiPart: 'api'
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/v2/api/site/default/notifications',
                        site: 'default',
                        baseURL: 'http://unifi/proxy/network',
                        apiVersion: 2
                    })
                );
            });

            it('should handle websockets site', () => {
                expect(
                    controller.buildUrl(
                        {
                            ...config,
                            url: '/notifications',
                            site: 'default'
                        },
                        true
                    )
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/wss/s/default/notifications',
                        site: 'default',
                        baseURL: 'ws://unifi/proxy/network'
                    })
                );
            });

            it('should handle secure websockets site', () => {
                expect(
                    controller.buildUrl(
                        {
                            ...config,
                            baseURL: 'https://unifi',
                            url: '/notifications',
                            site: 'default'
                        },
                        true
                    )
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/wss/s/default/notifications',
                        site: 'default',
                        baseURL: 'wss://unifi/proxy/network'
                    })
                );
            });

            it('should refuse build url without baseUrl', () => {
                expect.assertions(2);
                try {
                    controller.buildUrl({
                        ...config,
                        baseURL: undefined
                    });
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('baseURL is needed in the axios instance');
                }
            });

            describe('test with urls', () => {
                type testDatas = [string, Partial<AxiosRequestConfig>, boolean];
                const rawUrls: Array<{ expected: string; config: Partial<AxiosRequestConfig>; websockets?: boolean }> = JSON.parse(
                    fs.readFileSync(path.join(__dirname, '..', 'mocks', 'unifios-urls.json')).toString()
                );

                const urls: Array<testDatas> = Object.values(rawUrls).map(({ config, websockets, expected }) => [
                    expected,
                    config,
                    websockets ?? false
                ]);

                it.each<testDatas>(urls)('should generate correct url : %s', (expectedUrl, params, websockets) => {
                    const builtUrl = controller.buildUrl(
                        {
                            ...params,
                            baseURL: params.baseURL ?? 'https://unifi'
                        },
                        websockets
                    );

                    expect(`${builtUrl.baseURL}${builtUrl.url}`).toBe(expectedUrl);
                });
            });
        });
        describe('not unifiOs', () => {
            beforeEach(() => {
                controller.unifiOs = false;
            });
            it('should build controller url', () => {
                expect(controller.buildUrl(config)).toStrictEqual(
                    expect.objectContaining({
                        url: '/notifications',
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle login/logout url', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/api/login'
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/api/login',
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle no url', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: undefined
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: undefined,
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle custom unifiOs url', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/groups',
                        proxyNamespace: EProxyNamespaces.LED
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/groups',
                        proxyNamespace: EProxyNamespaces.LED,
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle api version', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/notifications',
                        apiVersion: 2
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/v2/api/notifications',
                        apiVersion: 2,
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle site', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/notifications',
                        site: 'default'
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/s/default/notifications',
                        site: 'default',
                        baseURL: 'http://unifi'
                    })
                );
            });

            it('should handle site with api version', () => {
                expect(
                    controller.buildUrl({
                        ...config,
                        url: '/notifications',
                        site: 'default',
                        apiVersion: 2,
                        apiPart: 'api'
                    })
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/v2/api/site/default/notifications',
                        site: 'default',
                        baseURL: 'http://unifi',
                        apiVersion: 2
                    })
                );
            });

            it('should handle websockets site', () => {
                expect(
                    controller.buildUrl(
                        {
                            ...config,
                            url: '/notifications',
                            site: 'default'
                        },
                        true
                    )
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/wss/s/default/notifications',
                        site: 'default',
                        baseURL: 'ws://unifi'
                    })
                );
            });

            it('should handle secure websockets site', () => {
                expect(
                    controller.buildUrl(
                        {
                            ...config,
                            baseURL: 'https://unifi',
                            url: '/notifications',
                            site: 'default'
                        },
                        true
                    )
                ).toStrictEqual(
                    expect.objectContaining({
                        url: '/wss/s/default/notifications',
                        site: 'default',
                        baseURL: 'wss://unifi'
                    })
                );
            });

            it('should refuse build url without baseUrl', () => {
                expect.assertions(2);
                try {
                    controller.buildUrl({
                        ...config,
                        baseURL: undefined
                    });
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('baseURL is needed in the axios instance');
                }
            });

            describe('test with urls', () => {
                type testDatas = [string, Partial<AxiosRequestConfig>, boolean];
                const rawUrls: Array<{ expected: string; config: Partial<AxiosRequestConfig>; websockets?: boolean }> = JSON.parse(
                    fs.readFileSync(path.join(__dirname, '..', 'mocks', 'not-unifios-urls.json')).toString()
                );

                const urls: Array<testDatas> = Object.values(rawUrls).map(({ config, websockets, expected }) => [
                    expected,
                    config,
                    websockets ?? false
                ]);

                it.each<testDatas>(urls)('should generate correct url : %s', (expectedUrl, params, websockets) => {
                    const builtUrl = controller.buildUrl(
                        {
                            ...params,
                            baseURL: params.baseURL ?? 'https://unifi'
                        },
                        websockets
                    );

                    expect(`${builtUrl.baseURL}${builtUrl.url}`).toBe(expectedUrl);
                });
            });
        });
    });

    describe('logout', () => {
        it('should logout', async () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            (controller.auth.login as jest.Mock).mockImplementationOnce(() => Promise.resolve(true));
            (controller.auth.logout as jest.Mock).mockImplementationOnce(() => Promise.resolve(true));
            (controller.auth.getVersion as jest.Mock).mockImplementationOnce(() => '9.9.9');
            //try to login
            expect(await controller.login()).toBe(true);
            expect(controller.auth.login).toHaveBeenCalledWith(undefined);
            expect(controller.version).toBe('9.9.9');
            expect(controller.auth.logout).not.toHaveBeenCalled();
            // @ts-ignore
            expect(controller.logged).toBeTruthy();
            expect(controller.auth.autoReLogin).toBeTruthy();

            (controller.auth.login as jest.Mock).mockClear();
            (controller.auth.logout as jest.Mock).mockClear();
            // test logout
            await controller.logout();

            expect(controller.auth.logout).toHaveBeenCalledWith();
            // @ts-ignore
            expect(controller.logged).toBeFalsy();
            expect(controller.auth.autoReLogin).toBeFalsy();
        });
    });

    describe('login', () => {
        it('should login', async () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            (controller.auth.login as jest.Mock).mockImplementationOnce(() => true);
            (controller.auth.getVersion as jest.Mock).mockImplementationOnce(() => '9.9.9');

            expect(await controller.login()).toBe(true);
            expect(controller.version).toBe('9.9.9');
            expect(controller.auth.login).toHaveBeenCalledWith(undefined);
            // @ts-ignore
            expect(controller.logged).toBeTruthy();
        });

        it('should login with 2FA', async () => {
            const controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            (controller.auth.login as jest.Mock).mockImplementationOnce(() => true);
            (controller.auth.getVersion as jest.Mock).mockImplementationOnce(() => '9.9.9');

            expect(await controller.login('252876')).toBe(true);
            expect(controller.version).toBe('9.9.9');
            expect(controller.auth.login).toHaveBeenCalledWith('252876');
            // @ts-ignore
            expect(controller.logged).toBeTruthy();
        });
    });

    describe('initWebSockets', () => {
        const unifiWebsocketsMock = UnifiWebsockets as unknown as jest.Mock | jest.Mocked<UnifiWebsockets>;
        let controller: Controller;
        beforeEach(() => {
            controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });
            // force login
            // @ts-ignore
            controller.logged = true;
            controller.controllerInstance.defaults.baseURL = 'http://localhost';
        });

        describe('unifiOs', () => {
            beforeEach(() => {
                controller.unifiOs = true;
            });
            it('init websockets', async () => {
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(2);
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(1, {
                    controller,
                    isController: true,
                    strictSSL: true,
                    url: 'ws://localhost/api/ws/system'
                });
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(2, {
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'ws://localhost/proxy/network/wss/s/super/events'
                });
            });
            it('init websockets 2 times', async () => {
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(2);
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(1, {
                    controller,
                    isController: true,
                    strictSSL: true,
                    url: 'ws://localhost/api/ws/system'
                });
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(2, {
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'ws://localhost/proxy/network/wss/s/super/events'
                });
                (unifiWebsocketsMock as jest.Mock).mockClear();
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).not.toHaveBeenCalled();
            });
            it('init websockets with custom controller ws url', async () => {
                // @ts-ignore
                controller.props.webSocketsURL = 'ws://localhost/custom/ws/url';
                controller.controllerInstance.defaults.baseURL = 'http://localhost.super.url';
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(2);
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(1, {
                    controller,
                    isController: true,
                    strictSSL: true,
                    url: 'ws://localhost/custom/ws/url/api/ws/system'
                });

                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(2, {
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'ws://localhost.super.url/proxy/network/wss/s/super/events'
                });
            });
            it('should refuse if not logged', async () => {
                // @ts-ignore
                controller.logged = false;
                expect.assertions(3);
                try {
                    await controller.initWebSockets();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('you need to login before');
                    expect(e.code).toBe(EErrorsCodes.NEED_LOGIN);
                }
            });
            it('should skip if ws is not defined', async () => {
                controller.controllerInstance.defaults.baseURL = 'https://localhost';
                // @ts-ignore
                controller.props.url = controller.controllerInstance.defaults.baseURL;
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(2);
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(1, {
                    controller,
                    isController: true,
                    strictSSL: true,
                    url: 'wss://localhost/api/ws/system'
                });
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(2, {
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'wss://localhost/proxy/network/wss/s/super/events'
                });
            });
        });
        describe('not unifiOs', () => {
            beforeEach(() => {
                controller.unifiOs = false;
            });
            it('init websockets', async () => {
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(1);
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(1, {
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'ws://localhost/wss/s/super/events'
                });
            });
            it('init websockets 2 times', async () => {
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(1);
                expect(unifiWebsocketsMock).toHaveBeenNthCalledWith(1, {
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'ws://localhost/wss/s/super/events'
                });
                (unifiWebsocketsMock as jest.Mock).mockClear();
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).not.toHaveBeenCalled();
            });
            it('init websockets with custom controller ws url', async () => {
                // @ts-ignore
                controller.controllerInstance.defaults.baseURL = 'http://localhost.super.url';
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(1);
                expect(unifiWebsocketsMock).toHaveBeenCalledWith({
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'ws://localhost.super.url/wss/s/super/events'
                });
            });
            it('should refuse if not logged', async () => {
                // @ts-ignore
                controller.logged = false;
                expect.assertions(3);
                try {
                    await controller.initWebSockets();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('you need to login before');
                    expect(e.code).toBe(EErrorsCodes.NEED_LOGIN);
                }
            });
            it('should throw error if trying to listen controller', async () => {
                await controller.initWebSockets();

                expect.assertions(6);
                try {
                    // @ts-ignore
                    controller.ws = undefined;
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('controller websockets are only available on unifiOS');
                    expect(e.code).toBe(EErrorsCodes.UNIFI_CONTROLLER_TYPE_MISMATCH);
                }
                try {
                    expect(controller.ws).toBeDefined();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('controller websockets are only available on unifiOS');
                    expect(e.code).toBe(EErrorsCodes.UNIFI_CONTROLLER_TYPE_MISMATCH);
                }
            });
            it('should use wss if https', async () => {
                controller.controllerInstance.defaults.baseURL = 'https://localhost';
                // @ts-ignore
                controller.props.url = controller.controllerInstance.defaults.baseURL;
                await controller.initWebSockets();
                expect(unifiWebsocketsMock).toHaveBeenCalledTimes(1);
                expect(unifiWebsocketsMock).toHaveBeenCalledWith({
                    controller,
                    isController: false,
                    strictSSL: true,
                    url: 'wss://localhost/wss/s/super/events'
                });
            });
        });
    });
    describe('createInstance for sites', () => {
        let controller: Controller;
        beforeEach(() => {
            controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });
            (axios.create as jest.Mock).mockClear();
        });

        it('should create an instance for a sub site', () => {
            controller.createInstance('test');
            expect(axios.create).toBeCalledWith({
                // not authentication
                authenticationRequest: false,
                // url set before
                baseURL: 'http://localhost',
                // headers json
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                // doesn't follow redirections
                maxRedirects: 0,
                // not site
                site: 'test'
            });
            expect(controller.auth.addInterceptorsToInstance).toHaveBeenCalled();
        });
    });

    describe('on listen on controller ws', () => {
        let _initWebSocketsMock = jest.fn();
        let onMock = jest.fn();
        let controller: Controller;
        beforeEach(() => {
            controller = new Controller({
                url: 'http://localhost',
                username: 'username',
                password: 'password'
            });

            // @ts-ignore
            controller._initWebSockets = _initWebSocketsMock.mockImplementation(() => {
                // @ts-ignore
                controller.ws = {
                    on: onMock
                };
            });
            onMock.mockClear();
        });

        it('should listen on controller ws', () => {
            const fn = () => {};
            expect(controller.on('*', fn)).toBe(controller);
            expect(onMock).toHaveBeenCalledWith('*', fn);
            expect(_initWebSocketsMock).toHaveBeenCalled();

            _initWebSocketsMock.mockClear();
            expect(controller.on('ctrl.connect', fn)).toBe(controller);
            expect(onMock).toHaveBeenCalledWith('ctrl.connect', fn);
            expect(_initWebSocketsMock).not.toHaveBeenCalled();
        });
    });
});
