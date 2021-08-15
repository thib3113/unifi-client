jest.useFakeTimers();

import { debug } from '../mocks/utils';
import { controller } from '../mocks';
import { EControllerEvents, UnifiWebsockets } from '../../src';
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
    });
});
