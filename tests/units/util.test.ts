import { axiosUrlParams, convertTimestampSecondsToDate, createDebugger, getUrlRepresentation, removeTrailingSlash } from '../../src/util';
import { AxiosInstance } from 'axios';

describe('utils tests', () => {
    describe('getUrlRepresentation', () => {
        const req = {
            baseURL: 'http://unifi.lan',
            url: '/aaa',
            auth: {
                username: 'username',
                password: 'password'
            },
            params: {
                foo: 'bar'
            }
        };

        it('get the url representation without auth', () => {
            expect(getUrlRepresentation(req)).toBe('http://unifi.lan/aaa?foo=bar');
            expect(
                getUrlRepresentation({
                    ...req,
                    baseURL: undefined
                })
            ).toBe('http://localhost/aaa?foo=bar');
            expect(
                getUrlRepresentation({
                    ...req,
                    url: undefined
                })
            ).toBe('http://unifi.lan/?foo=bar');
            expect(
                getUrlRepresentation({
                    ...req,
                    auth: {
                        ...req.auth,
                        password: ''
                    }
                })
            ).toBe('http://unifi.lan/aaa?foo=bar');
            expect(
                getUrlRepresentation({
                    ...req,
                    auth: {
                        ...req.auth,
                        username: ''
                    }
                })
            ).toBe('http://unifi.lan/aaa?foo=bar');
            expect(
                getUrlRepresentation({
                    ...req,
                    params: {}
                })
            ).toBe('http://unifi.lan/aaa');
            expect(
                getUrlRepresentation({
                    ...req,
                    url: '/?fi=bar'
                })
            ).toBe('http://unifi.lan/?fi=bar&foo=bar');
        });
        it('get the url representation with auth', () => {
            expect(getUrlRepresentation(req)).toBe('http://unifi.lan/aaa?foo=bar');
            expect(
                getUrlRepresentation(
                    {
                        ...req,
                        baseURL: undefined
                    },
                    false
                )
            ).toBe('http://username:password@localhost/aaa?foo=bar');
            expect(
                getUrlRepresentation(
                    {
                        ...req,
                        url: undefined
                    },
                    false
                )
            ).toBe('http://username:password@unifi.lan/?foo=bar');
            expect(
                getUrlRepresentation(
                    {
                        ...req,
                        auth: {
                            ...req.auth,
                            password: ''
                        }
                    },
                    false
                )
            ).toBe('http://username@unifi.lan/aaa?foo=bar');
            expect(
                getUrlRepresentation(
                    {
                        ...req,
                        auth: {
                            ...req.auth,
                            username: ''
                        }
                    },
                    false
                )
            ).toBe('http://:password@unifi.lan/aaa?foo=bar');
            expect(
                getUrlRepresentation(
                    {
                        ...req,
                        params: {}
                    },
                    false
                )
            ).toBe('http://username:password@unifi.lan/aaa');
            expect(
                getUrlRepresentation(
                    {
                        ...req,
                        url: '/?fi=bar'
                    },
                    false
                )
            ).toBe('http://username:password@unifi.lan/?fi=bar&foo=bar');
        });
        it(`doesn't erase auth part if already in url`, () => {
            expect(
                getUrlRepresentation(
                    {
                        baseURL: 'http://username:password@localhost',
                        auth: {
                            password: 'password2',
                            username: 'username2'
                        }
                    },
                    false
                )
            ).toBe('http://username:password@localhost/');
        });
        it(`should work without auth`, () => {
            expect(
                getUrlRepresentation(
                    {
                        baseURL: 'http://localhost'
                    },
                    false
                )
            ).toBe('http://localhost/');
        });
    });
    describe('createDebugger', () => {
        it('should create a debugger', () => {
            const d = createDebugger('test');
            expect(d.namespace).toBe('unifi-client:test');
        });
        it('should force to set a name', () => {
            expect.assertions(2);
            try {
                createDebugger('');
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('name is mandatory');
            }
        });
    });
    describe('removeTrailingSlash ', () => {
        it('should removeTrailingSlash', () => {
            expect(removeTrailingSlash('/test/')).toBe('/test');
            expect(removeTrailingSlash('http://localhost/')).toBe('http://localhost');
            expect(removeTrailingSlash('/test')).toBe('/test');
            expect(removeTrailingSlash('http://localhost')).toBe('http://localhost');
        });
    });

    describe('axiosUrlParams', () => {
        const mock = jest.fn();
        const instance = {
            interceptors: {
                request: {
                    use: mock
                }
            }
        } as unknown as AxiosInstance;
        it('should removeTrailingSlash', () => {
            expect(axiosUrlParams(instance)).toBe(instance);
            const config = {
                url: '/:foo/test',
                baseURL: 'https://site.com',
                urlParams: {
                    foo: 'bar'
                }
            };
            //get fn
            expect(mock).toBeCalled();
            const fn = mock.mock.calls.pop().pop();
            expect(fn({})).toStrictEqual({});
            expect(fn({ ...config, urlParams: undefined })).toStrictEqual({ ...config, urlParams: undefined });
            expect(fn(undefined)).toBe(undefined);

            expect(fn(config)).toStrictEqual({
                ...config,
                url: '/bar/test'
            });
        });
    });
    describe('convertTimestampSecondsToDate ', () => {
        it('should build date from timestamp', () => {
            expect(convertTimestampSecondsToDate(1593556874)).toStrictEqual(new Date('2020-06-30T22:41:14.000Z'));
        });
        it('should build from other than timestamp', () => {
            expect(convertTimestampSecondsToDate('2020-06-30T22:41:14.000Z')).toStrictEqual(new Date('2020-06-30T22:41:14.000Z'));
        });
    });
});
