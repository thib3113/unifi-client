import { ClientError, EErrorsCodes, EProxyNamespaces, Site, UnifiWebsockets } from '../../src/';
import { controller } from '../mocks';
import { macAddress } from '../globals';
import axios from 'axios';

jest.mock('../../src/WebSockets/UnifiWebsockets');

describe('Site', () => {
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
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        beforeEach(() => {
            // @ts-ignore
            site = new Site(
                {
                    // @ts-ignore
                    controllerInstance: {
                        defaults: {
                            baseURL: 'https://unifi',
                            headers: {
                                common: {},
                                delete: {},
                                get: {},
                                head: {},
                                post: {},
                                put: {},
                                patch: {}
                            }
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
            site.instance = mockedAxios;

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
        describe('adoptDevice', () => {
            const devManagerMock = jest.fn();
            beforeEach(() => {
                site.devManager = devManagerMock;
            });
            it('should refuse a non mac Value', async () => {
                expect.assertions(3);
                try {
                    await site.adoptDevice('192.168.1.0');
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('parameter need to be a mac address');
                    expect(e.code).toBe(EErrorsCodes.BAD_PARAMETERS);
                }
            });
            it('should accept a string', async () => {
                devManagerMock.mockImplementationOnce(() => Promise.resolve({ data: 'myData' }));
                expect(await site.adoptDevice(macAddress)).toBe('myData');
                expect(devManagerMock).toHaveBeenCalledWith({
                    cmd: 'adopt',
                    mac: macAddress
                });
            });
            it('should accept an object with a mac, like a BaseDevice', async () => {
                devManagerMock.mockImplementationOnce(() => Promise.resolve({ data: 'myData' }));
                // @ts-ignore
                expect(await site.adoptDevice({ mac: macAddress })).toBe('myData');
                expect(devManagerMock).toHaveBeenCalledWith({
                    cmd: 'adopt',
                    mac: macAddress
                });
            });
        });
        describe('enableLEDs', () => {
            const mgmt = {
                key: 'mgmt',
                advanced_feature_enabled: true,
                x_ssh_enabled: true,
                x_ssh_bind_wildcard: true,
                x_ssh_auth_password_enabled: true,
                unifi_idp_enabled: true,
                wifiman_enabled: true,
                x_mgmt_key: '',
                x_ssh_username: '',
                x_ssh_password: '',
                x_ssh_sha512passwd: '',
                led_enabled: true,
                alert_enabled: true,
                x_ssh_keys: [],
                x_api_token: ''
            };
            const settingsManagerMock = jest.fn().mockImplementation(() => Promise.resolve({ data: mgmt }));
            beforeEach(() => {
                site.settingsManager = settingsManagerMock;
            });
            it('should enable LEDS', async () => {
                expect(await site.enableLEDs()).toBe(mgmt);
                expect(settingsManagerMock).toHaveBeenCalledWith({ led_enabled: true });
            });
            it('should disable LEDS', async () => {
                expect(await site.enableLEDs(false)).toBe(mgmt);
                expect(settingsManagerMock).toHaveBeenCalledWith({ led_enabled: false });
            });
        });
        describe('getSettings', () => {
            const mgmt = {
                key: 'mgmt',
                advanced_feature_enabled: true,
                x_ssh_enabled: true,
                x_ssh_bind_wildcard: true,
                x_ssh_auth_password_enabled: true,
                unifi_idp_enabled: true,
                wifiman_enabled: true,
                x_mgmt_key: '',
                x_ssh_username: '',
                x_ssh_password: '',
                x_ssh_sha512passwd: '',
                led_enabled: true,
                alert_enabled: true,
                x_ssh_keys: [],
                x_api_token: ''
            };
            it('should return settings', async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: [mgmt] } }));
                expect(await site.getSettings()).toStrictEqual([mgmt]);
                expect(mockedAxios.get).toHaveBeenCalledWith('/get/setting');
            });
        });
        describe('settingsManager', () => {
            const mgmt = {
                key: 'mgmt',
                advanced_feature_enabled: true,
                x_ssh_enabled: true,
                x_ssh_bind_wildcard: true,
                x_ssh_auth_password_enabled: true,
                unifi_idp_enabled: true,
                wifiman_enabled: true,
                x_mgmt_key: '',
                x_ssh_username: '',
                x_ssh_password: '',
                x_ssh_sha512passwd: '',
                led_enabled: true,
                alert_enabled: true,
                x_ssh_keys: [],
                x_api_token: ''
            };
            it('should send settings', async () => {
                mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: {} } }));
                expect(await site.settingsManager(mgmt)).toStrictEqual({ data: {} });
                expect(mockedAxios.post).toHaveBeenCalledWith('/set/setting/mgmt', mgmt);
            });
        });
        describe('devManager', () => {
            it('should send devManager commands', async () => {
                mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { data: {} } }));
                expect(await site.devManager({ cmd: 'test' })).toStrictEqual({ data: {} });
                expect(mockedAxios.post).toHaveBeenCalledWith('/cmd/devmgr', { cmd: 'test' });
            });
        });
        describe('getNetworkStatus', () => {
            it('should send devManager commands', async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: {} } }));
                expect(await site.getNetworkStatus()).toStrictEqual({ data: {} });
                expect(mockedAxios.get).toHaveBeenCalledWith('/network_status', { apiVersion: 2 });
            });
        });
    });
});
