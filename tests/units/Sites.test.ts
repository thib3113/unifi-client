import { ClientError, EErrorsCodes, EProxyNamespaces, Site, UnifiWebsockets } from '../../src/';
import { controller } from '../mocks';

jest.mock('../../src/WebSockets/UnifiWebsockets');

describe('Sites', () => {
    describe('construct()', () => {
        it('construct with all', () => {
            controller.unifiOs = true;
            const site = new Site(controller, {
                _id: '_id',
                name: 'name',
                anonymous_id: 'anonymous_id',
                attr_hidden_id: 'attr_hidden_id',
                desc: 'desc',
                role: 'role',
                attr_no_delete: true,
                role_hotspot: true
            });
            expect(site._id).toBe('_id');
            expect(site.name).toBe('name');
            expect(site.anonymous_id).toBe('anonymous_id');
            expect(site.attr_hidden_id).toBe('attr_hidden_id');
            expect(site.desc).toBe('desc');
            expect(site.role).toBe('role');
            expect(site.attr_no_delete).toBe(true);
            expect(site.role_hotspot).toBe(true);

            expect(controller.createInstance).toHaveBeenCalledWith('name', {
                proxyNamespace: EProxyNamespaces.NETWORK,
                apiPart: 'api'
            });
        });
        it('should need unifiOs to read role_hotspot', () => {
            controller.unifiOs = false;
            const site = new Site(controller, {
                name: 'name'
            });

            expect.assertions(2);
            try {
                expect(site.role_hotspot).toBe('impossible value');
                expect(true).toBeFalsy();
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('Site.role_hotspot need UnifiOs controller');
            }
        });
        it('should partial construct', () => {
            const site = new Site(controller, {
                name: 'name'
            });

            expect(site.name).toBe('name');
        });
        it('should refuse a site without name', () => {
            expect.assertions(2);
            try {
                new Site(controller, {
                    name: ''
                });
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('name is mandatory for a site . The default unifi site name is "default"');
            }
        });
    });
    describe('functions', () => {
        let site: Site;
        const buildUrlMock = jest.fn();
        beforeEach(() => {
            // @ts-ignore
            site = new Site(
                {
                    // @ts-ignore
                    controllerInstance: {
                        defaults: {
                            baseURL: 'https://unifi'
                        }
                    },
                    strictSSL: true,
                    buildUrl: buildUrlMock,
                    createInstance: jest.fn()
                },
                {
                    name: 'my_site'
                }
            );
            // @ts-ignore
            // site.controller.buildUrl = jest.fn();
        });

        describe('initWebSockets', () => {
            it('should initWS', () => {
                buildUrlMock.mockImplementationOnce(() => ({
                    url: '/aaaaa',
                    baseURL: 'wss://unifi'
                }));

                site.initWebSockets();

                expect(buildUrlMock).toHaveBeenCalledWith(
                    {
                        baseURL: 'https://unifi',
                        site: 'my_site',
                        url: '/events'
                    },
                    true
                );
                expect(UnifiWebsockets).toHaveBeenCalledWith({
                    controller: expect.anything(),
                    isController: false,
                    strictSSL: true,
                    url: 'wss://unifi/aaaaa'
                });
            });
            it('should handle bad buildURL', () => {
                buildUrlMock.mockImplementationOnce(() => ({
                    baseURL: 'wss://unifi'
                }));

                try {
                    site.initWebSockets();
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('fail to generate site WS url');
                    expect(e.code).toBe(EErrorsCodes.UNKNOWN_ERROR);
                }
            });
        });
        describe('listen on site', () => {
            it('should listen on ws', () => {
                const initWebSocketsMock = jest.fn();
                const onMock = jest.fn();
                site.initWebSockets = initWebSocketsMock;

                // @ts-ignore
                site.ws = {
                    on: onMock
                };

                const callBackMock = jest.fn();
                expect(site.on('test', callBackMock)).toBe(site);
                expect(onMock).toHaveBeenCalledWith('test', callBackMock);
            });
            it('should initWs before listen', () => {
                const initWebSocketsMock = jest.fn();
                const onMock = jest.fn();
                site.initWebSockets = initWebSocketsMock;

                initWebSocketsMock.mockImplementationOnce(() => {
                    // @ts-ignore
                    site.ws = {
                        on: onMock
                    };
                });

                const callBackMock = jest.fn();
                expect(site.on('test', callBackMock)).toBe(site);
                expect(initWebSocketsMock).toHaveBeenCalledWith();
                expect(onMock).toHaveBeenCalledWith('test', callBackMock);
            });
        });
    });
});
