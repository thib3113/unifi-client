import { Buffer } from 'buffer';

jest.useFakeTimers();

import { debug } from '../mocks/utils';
import { controller } from '../mocks';
import { EControllerEvents, ISiteEvent, UnifiWebsockets } from '../../src';

jest.mock('ws');

afterAll(() => {
    jest.useRealTimers();
});

describe('UnifiWebsockets', () => {
    describe('constructor', () => {
        it('should construct', () => {
            controller.UnifiWebSockets = [];
            const uws = new UnifiWebsockets({
                url: 'ws://unifi.lan',
                controller,
                isController: true,
                strictSSL: true
            });
            // @ts-ignore
            expect(uws.controller).toBe(controller);
            // @ts-ignore
            expect(uws.url).toBe('ws://unifi.lan');
            // @ts-ignore
            expect(uws.strictSSL).toBe(true);
            // @ts-ignore
            expect(uws.isController).toBe(true);

            expect(controller.UnifiWebSockets.length).toBeGreaterThanOrEqual(1);
        });

        it('should construct with some default values', () => {
            controller.UnifiWebSockets = [];
            const uws = new UnifiWebsockets({
                url: 'ws://unifi.lan',
                controller
            });
            // @ts-ignore
            expect(uws.controller).toBe(controller);
            // @ts-ignore
            expect(uws.url).toBe('ws://unifi.lan');
            // @ts-ignore
            expect(uws.strictSSL).toBe(true);
            // @ts-ignore
            expect(uws.isController).toBe(false);

            expect(controller.UnifiWebSockets.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('functions', () => {
        let uws: UnifiWebsockets;
        const getCookiesMock = jest.fn().mockImplementationOnce(() => [
            {
                name: 'cookie_name',
                value: 'aaaaa'
            }
        ]);
        beforeEach(() => {
            controller.UnifiWebSockets = [];
            // @ts-ignore
            controller.auth = { getCookies: getCookiesMock };
            uws = new UnifiWebsockets({
                url: 'ws://unifi.lan',
                controller
            });
            debug.debugMock.mockClear();
        });
        describe('initWebSockets', () => {
            const emitMock = jest.fn();
            const handleEventMock = jest.fn();
            const reconnectMock = jest.fn();
            beforeEach(() => {
                // @ts-ignore
                uws._emit = emitMock;
                // @ts-ignore
                uws._handleEvent = handleEventMock;
                // @ts-ignore
                uws._reconnect = reconnectMock;
            });
            it('should initWebSockets and start ping pong', async () => {
                await uws.initWebSockets();
                // @ts-ignore
                const ws = uws.ws;

                //end timers
                jest.runOnlyPendingTimers();

                expect(debug.debugMock).toHaveBeenNthCalledWith(1, 'initWebSockets()');
                expect(ws.send).toHaveBeenCalledWith('ping');
                expect(ws.on).toHaveBeenCalledTimes(4);
                //get handlers
                const handlers = {};
                (ws.on as jest.Mock).mock.calls.forEach(([k, fn]) => {
                    handlers[k] = fn;
                });

                // @ts-ignore
                uws.isReconnecting = true;
                //test open
                handlers['open']();
                // @ts-ignore
                expect(uws.isReconnecting).toBeFalsy();
                expect(emitMock).toHaveBeenCalledWith(EControllerEvents.CONNECTION);

                emitMock.mockClear();

                //send a pong message
                handlers['message']('pong');
                expect(emitMock).toHaveBeenCalledWith(EControllerEvents.PONG);
                expect(handleEventMock).not.toBeCalled();

                emitMock.mockClear();
                //send a lambda message
                handlers['message'](Buffer.from('test'));
                expect(handleEventMock).toHaveBeenCalledWith(Buffer.from('test'));
                expect(emitMock).not.toBeCalled();

                emitMock.mockClear();
                handleEventMock.mockClear();

                //try to do error in handleEvent
                const err = new Error('myError');
                handleEventMock.mockImplementationOnce(() => {
                    throw err;
                });
                handlers['message'](Buffer.from('test'));
                expect(handleEventMock).not.toHaveBeenCalledWith();
                expect(emitMock).toBeCalledWith(EControllerEvents.ERROR, err);

                emitMock.mockClear();

                //simulate close socket
                handlers['close']();
                expect(emitMock).toBeCalledWith(EControllerEvents.CLOSE);
                expect(reconnectMock).toBeCalled();

                reconnectMock.mockClear();
                emitMock.mockClear();

                //simulate error
                const err2 = new Error('myError');
                handlers['error'](err2);
                expect(emitMock).toBeCalledWith(EControllerEvents.ERROR, err2);
                expect(reconnectMock).toBeCalled();
            });
        });
        describe('reconnect', () => {
            const emitMock = jest.fn();
            const handleEventMock = jest.fn();
            const initWebSocketsMock = jest.fn();
            beforeEach(() => {
                // @ts-ignore
                uws._emit = emitMock;
                // @ts-ignore
                uws._handleEvent = handleEventMock;
                // @ts-ignore
                uws.initWebSockets = initWebSocketsMock;
            });
            it('should reconnect', () => {
                // @ts-ignore
                uws.isReconnecting = false;
                // @ts-ignore
                uws.isClosed = false;
                // @ts-ignore
                uws._reconnect();

                jest.runOnlyPendingTimers();

                expect(emitMock).toBeCalledWith(EControllerEvents.RECONNECTION);
                expect(initWebSocketsMock).toBeCalled();
            });
            it('should handle fail of initWebSockets', () => {
                // @ts-ignore
                uws.isReconnecting = false;
                // @ts-ignore
                uws.isClosed = false;
                const err = new Error();
                initWebSocketsMock.mockImplementationOnce(() => {
                    throw err;
                });
                // @ts-ignore
                uws._reconnect();

                jest.runOnlyPendingTimers();

                expect(emitMock).toBeCalledWith(EControllerEvents.FATAL_ERROR, err);
                expect(debug.debugMock).toBeCalledWith('fail to reconnect %O', err);
                expect(initWebSocketsMock).toBeCalled();
            });
            it('should handle already reconnecting', () => {
                // @ts-ignore
                uws.isReconnecting = true;
                // @ts-ignore
                uws.isClosed = false;
                // @ts-ignore
                uws._reconnect();

                jest.runOnlyPendingTimers();

                expect(emitMock).not.toBeCalled();
                expect(debug.debugMock).toBeCalledWith('reconnection already in progress');
                expect(initWebSocketsMock).not.toBeCalled();
            });
            it('should handle ws closed manually', () => {
                // @ts-ignore
                uws.isReconnecting = false;
                // @ts-ignore
                uws.isClosed = true;
                // @ts-ignore
                uws._reconnect();

                jest.runOnlyPendingTimers();

                expect(emitMock).not.toBeCalled();
                expect(debug.debugMock).toBeCalledWith('socket is closed');
                expect(initWebSocketsMock).not.toBeCalled();
            });
        });
        describe('close sockets', () => {
            it('close a socket', () => {
                const closeMock = jest.fn();
                // @ts-ignore
                uws.ws = {
                    close: closeMock
                };

                uws.close();

                // @ts-ignore
                const ws = uws.ws;

                expect(ws.close).toBeCalled();
                // @ts-ignore
                expect(uws.isClosed).toBeTruthy();
            });
            it('should close all sockets', () => {
                const closeMock = jest.fn();
                // @ts-ignore
                UnifiWebsockets.UnifiWebSockets = [{ close: closeMock }];
                UnifiWebsockets.closeSockets();
                expect(closeMock).toBeCalled();
            });
        });
        describe('_emit', () => {
            const emitMock = jest.fn();
            const globalEmitMock = jest.fn();
            beforeEach(() => {
                uws.emit = emitMock;
                // @ts-ignore
                controller.globalWS = {
                    emit: globalEmitMock
                };
            });

            it('emit event', () => {
                // @ts-ignore
                uws._emit(EControllerEvents.PONG, 'params1', 'params2');

                expect(debug.debugMock).toBeCalledWith('pong', 'params1', 'params2');
                // emit on the uws object
                expect(emitMock).toBeCalledWith('pong', 'params1', 'params2');
                // emit on joker
                expect(emitMock).toBeCalledWith('*', 'pong', 'params1', 'params2');
                // emit on the global ws object
                expect(globalEmitMock).toBeCalledWith('pong', 'params1', 'params2');
                // emit on joker
                expect(globalEmitMock).toBeCalledWith('*', 'pong', 'params1', 'params2');
            });
        });
        describe('_handleSiteEvent', () => {
            const emitMock = jest.fn();
            beforeEach(() => {
                // @ts-ignore
                uws._emit = emitMock;
            });
            it('should handle a site event containing events', () => {
                const event: ISiteEvent = {
                    meta: {
                        rc: 'ok',
                        message: 'events'
                    },
                    data: [
                        {
                            guest: '00:1b:44:11:3a:b7',
                            minutes: '20',
                            admin: 'Admin[ubnt]',
                            site_id: '5ec06b5646e0fb010b201880',
                            is_admin: true,
                            key: 'EVT_AD_GuestAuthorizedFor',
                            subsystem: 'wlan',
                            is_negative: false,
                            time: 1629055537179,
                            datetime: '2021-08-15T19:25:37Z',
                            msg: 'Guest[00:1b:44:11:3a:b7] is authorized by Admin[ubnt] for 20 minutes',
                            _id: '61196a311a55720128999ed2'
                        },
                        {
                            guest: '00:1b:44:11:3a:b7',
                            admin: 'Admin[ubnt]',
                            site_id: '5ec06b5646e0fb010b201880',
                            is_admin: true,
                            key: 'EVT_AD_GuestUnauthorized',
                            subsystem: 'wlan',
                            is_negative: false,
                            time: 1629055537572,
                            datetime: '2021-08-15T19:25:37Z',
                            msg: 'Guest[00:1b:44:11:3a:b7] is unauthorized by Admin[ubnt]',
                            _id: '61196a311a55720128999ed8'
                        }
                    ]
                };

                // @ts-ignore
                uws._handleSiteEvent(event);
                expect(emitMock).toBeCalledWith('ad:guestauthorizedfor', {
                    guest: '00:1b:44:11:3a:b7',
                    minutes: '20',
                    admin: 'Admin[ubnt]',
                    site_id: '5ec06b5646e0fb010b201880',
                    is_admin: true,
                    key: 'EVT_AD_GuestAuthorizedFor',
                    subsystem: 'wlan',
                    is_negative: false,
                    time: 1629055537179,
                    datetime: '2021-08-15T19:25:37Z',
                    msg: 'Guest[00:1b:44:11:3a:b7] is authorized by Admin[ubnt] for 20 minutes',
                    _id: '61196a311a55720128999ed2'
                });
                expect(emitMock).toBeCalledWith('ad:guestunauthorized', {
                    guest: '00:1b:44:11:3a:b7',
                    admin: 'Admin[ubnt]',
                    site_id: '5ec06b5646e0fb010b201880',
                    is_admin: true,
                    key: 'EVT_AD_GuestUnauthorized',
                    subsystem: 'wlan',
                    is_negative: false,
                    time: 1629055537572,
                    datetime: '2021-08-15T19:25:37Z',
                    msg: 'Guest[00:1b:44:11:3a:b7] is unauthorized by Admin[ubnt]',
                    _id: '61196a311a55720128999ed8'
                });
                expect(debug.debugMock).toHaveBeenNthCalledWith(1, '()');
                expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'receive event');
                expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'meta : %O', { message: 'events', rc: 'ok' });
                expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'data : %O', expect.anything());
            });
            it('should handle a site event without message', () => {
                const event: ISiteEvent = {
                    meta: {
                        rc: 'ok',
                        message: ''
                    },
                    data: []
                };

                // @ts-ignore
                uws._handleSiteEvent(event);
                expect(emitMock).toBeCalledWith('unknown', []);
                expect(debug.debugMock).toHaveBeenNthCalledWith(1, '()');
                expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'receive event');
                expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'meta : %O', { message: '', rc: 'ok' });
                expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'data : %O', expect.anything());
                expect(debug.debugMock).toHaveBeenNthCalledWith(5, 'fail to get name from meta : %O', {
                    data: [],
                    meta: { message: '', rc: 'ok' }
                });
                expect(emitMock).toBeCalledWith('unknown', []);
            });
            it('should handle a site event without meta', () => {
                const event: ISiteEvent = {
                    // @ts-ignore
                    meta: undefined,
                    data: []
                };

                // @ts-ignore
                uws._handleSiteEvent(event);
                expect(emitMock).toBeCalledWith('unknown', []);
                expect(debug.debugMock).toHaveBeenNthCalledWith(1, '()');
                expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'receive event');
                expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'meta : %O', undefined);
                expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'data : %O', expect.anything());
            });
            it(`should handle a site event with a key that doesn't match the regex in events`, () => {
                const event: ISiteEvent = {
                    meta: {
                        rc: 'ok',
                        message: 'events'
                    },
                    data: [
                        {
                            guest: '00:1b:44:11:3a:b7',
                            minutes: '20',
                            admin: 'Admin[ubnt]',
                            site_id: '5ec06b5646e0fb010b201880',
                            is_admin: true,
                            key: 'GuestAuthorizedFor',
                            subsystem: 'wlan',
                            is_negative: false,
                            time: 1629055537179,
                            datetime: '2021-08-15T19:25:37Z',
                            msg: 'Guest[00:1b:44:11:3a:b7] is authorized by Admin[ubnt] for 20 minutes',
                            _id: '61196a311a55720128999ed2'
                        }
                    ]
                };

                // @ts-ignore
                uws._handleSiteEvent(event);
                expect(debug.debugMock).toHaveBeenNthCalledWith(1, '()');
                expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'receive event');
                expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'meta : %O', { message: 'events', rc: 'ok' });
                expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'data : %O', expect.anything());
                expect(debug.debugMock).toHaveBeenNthCalledWith(5, 'unable to read the event key, %O', expect.anything());
            });
            it(`should handle a site event with a product line`, () => {
                const event: ISiteEvent = {
                    meta: {
                        rc: 'ok',
                        message: 'user',
                        product_line: 'protect'
                    },
                    data: []
                };

                // @ts-ignore
                uws._handleSiteEvent(event);
                expect(debug.debugMock).toHaveBeenNthCalledWith(1, '()');
                expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'receive event');
                expect(debug.debugMock).toHaveBeenNthCalledWith(3, 'meta : %O', {
                    rc: 'ok',
                    message: 'user',
                    product_line: 'protect'
                });
                expect(debug.debugMock).toHaveBeenNthCalledWith(4, 'data : %O', []);
                expect(emitMock).toBeCalledWith('protect:user', []);
            });
        });
        describe('handleEvent', () => {
            const emitMock = jest.fn();
            const handleSiteEventMock = jest.fn();
            beforeEach(() => {
                // @ts-ignore
                uws._emit = emitMock;
                // @ts-ignore
                uws._handleSiteEvent = handleSiteEventMock;
            });
            it('should _handleEvent', () => {
                // @ts-ignore
                uws.isController = true;
                // @ts-ignore
                uws._handleEvent(Buffer.from(JSON.stringify({ type: 'test', test: 'aaaa' })));
                expect(emitMock).toBeCalledWith('test', { test: 'aaaa', type: 'test' });
            });
            it('should _handleEvent without type', () => {
                // @ts-ignore
                uws.isController = true;
                // @ts-ignore
                uws._handleEvent(Buffer.from(JSON.stringify({ test: 'aaaa' })));
                expect(emitMock).toBeCalledWith('unknown', { test: 'aaaa' });
            });
            it('should handle invalid json buffer', () => {
                // @ts-ignore
                uws.isController = true;
                // @ts-ignore
                uws._handleEvent(Buffer.from('test'));
                expect(emitMock).toBeCalledWith('unknown', undefined);
                expect(debug.debugMock).toHaveBeenNthCalledWith(1, '()');
                expect(debug.debugMock).toHaveBeenNthCalledWith(2, 'fail to parse event');
                expect(debug.debugMock).toHaveBeenNthCalledWith(3, expect.any(SyntaxError));
            });
            it('should handle site events', () => {
                // @ts-ignore
                uws.isController = false;
                // @ts-ignore
                uws._handleEvent(Buffer.from(JSON.stringify({ type: 'test', test: 'aaaa' })));
                expect(handleSiteEventMock).toBeCalledWith({ type: 'test', test: 'aaaa' });
            });
        });
    });
});
