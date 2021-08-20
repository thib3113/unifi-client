import { EventEmitter } from 'events';
import type { Controller } from '../Controller';
import WebSocket from 'ws';
import cookie from 'cookie';
import { EControllerEvents } from './events/EControllerEvents';
import { eventDataTypes, events } from './events';
import { createDebugger } from '../util';
import { ISiteEvent, ISiteEventsEvent, unifiControllerEvents } from './events/events';

export interface IUnifiWebSocketsProps {
    controller: Controller;
    url: string;
    strictSSL?: boolean;
    isController?: boolean;
}

const debug = createDebugger('UnifiWebsockets');
const eventDebug = debug.extend('events');
const eventSendDebug = eventDebug.extend('send');
const eventReceivedDebug = eventDebug.extend('received');
export class UnifiWebsockets extends EventEmitter {
    private controller: Controller;
    private readonly url: string;
    private isClosed = true;
    private readonly autoReconnectInterval = 5 * 1000;
    private ws: WebSocket;
    private readonly strictSSL: boolean;
    private pingPongInterval: NodeJS.Timeout;
    private isReconnecting: boolean;

    // static UnifiWebSockets: Array<UnifiWebsockets> = [];
    public static globalWS: EventEmitter = new EventEmitter();
    private readonly isController: boolean;
    private static UnifiWebSockets: Array<UnifiWebsockets> = [];

    constructor(props: IUnifiWebSocketsProps) {
        super();
        debug('constructor()');

        //get controller
        this.controller = props.controller;

        this.url = props.url;

        this.strictSSL = props.strictSSL ?? true;

        this.isController = props.isController ?? false;

        //start websockets connexion
        // this.initWebSockets(props).catch((e) => {
        //     this._emit('ctrl.error', e);
        // });

        //register ws on globals
        this.controller.UnifiWebSockets.push(this);
        UnifiWebsockets.UnifiWebSockets.push(this);
    }

    public async initWebSockets(): Promise<void> {
        debug('initWebSockets()');
        const cookies = await this.controller.auth.getCookies(false);
        this.ws = new WebSocket(this.url, {
            perMessageDeflate: false,
            rejectUnauthorized: this.strictSSL,
            headers: {
                Cookie: cookies.map((c) => cookie.serialize(c.name, c.value, c)).join('; ')
            }
        });

        // init ping pong
        this.pingPongInterval = setInterval(() => {
            this.ws.send('ping');
        }, 15000) as number | NodeJS.Timeout as NodeJS.Timeout;

        this.ws.on('open', () => {
            this.isReconnecting = false;
            this._emit(EControllerEvents.CONNECTION);
        });

        this.ws.on('message', (data) => {
            if (data.toString() === 'pong') {
                this._emit(EControllerEvents.PONG);
                return;
            }
            try {
                this._handleEvent(data);
            } catch (err) {
                this._emit(EControllerEvents.ERROR, err);
            }
        });

        this.ws.on('close', () => {
            this._emit(EControllerEvents.CLOSE);
            clearInterval(this.pingPongInterval);
            this._reconnect();
        });

        this.ws.on('error', (err) => {
            this._emit(EControllerEvents.ERROR, err);
            clearInterval(this.pingPongInterval);
            this._reconnect();
        });
    }

    /**
     * reconnect to websocket
     */
    private _reconnect() {
        const curDebug = debug.extend('_reconnect');
        curDebug('()');
        if (!this.isReconnecting && !this.isClosed) {
            this.isReconnecting = true;
            setTimeout(async () => {
                try {
                    this._emit(EControllerEvents.RECONNECTION);
                    this.isReconnecting = false;
                    await this.initWebSockets();
                } catch (e) {
                    curDebug('fail to reconnect %O', e);
                    this._emit(EControllerEvents.FATAL_ERROR, e);
                }
            }, this.autoReconnectInterval);
        } else if (this.isReconnecting) {
            curDebug('reconnection already in progress');
        } else {
            curDebug('socket is closed');
        }
    }

    /**
     * closes all the websockets
     */
    static closeSockets(): void {
        debug('static.closeSockets()');
        this.UnifiWebSockets.forEach((s) => s.close());
    }

    /**
     * close this websocket connection
     */
    close(): void {
        debug('close()');
        this.isClosed = true;
        this.ws.close();
    }

    /**
     * emit an event on multiple events emitter
     * @param event - an event
     * @param args - an args
     */
    private _emit(event: events | string, ...args: Array<eventDataTypes>): boolean {
        eventSendDebug(event, ...args);
        //store the result about listeners
        const resEmit1 = this.emit(event, ...args);
        this.emit('*', event, ...args);

        //emit global events
        this.controller.globalWS.emit(event, ...args);
        this.controller.globalWS.emit('*', event, ...args);
        return resEmit1;
    }

    /**
     * Handle event for a site
     * @param event - event
     */
    private _handleSiteEvent(event: ISiteEvent): void {
        const curDebug = debug.extend('_handleSiteEvent');
        curDebug('()');
        eventReceivedDebug('receive event');
        eventReceivedDebug('meta : %O', event.meta);
        eventReceivedDebug('data : %O', event.data);
        if (event.meta?.message === 'events') {
            const evt = event as ISiteEventsEvent;
            evt.data.forEach((subEvent) => {
                const match = subEvent.key.match(/EVT_([A-Z]{2})_(.*)/);
                if (match) {
                    const [, group, eventName] = match;
                    this._emit([group.toLowerCase(), eventName.toLowerCase()].join(':'), subEvent);
                } else {
                    curDebug('unable to read the event key, %O', subEvent);
                }
            });
        } else {
            let evtName = event.meta?.message;
            if (event.meta?.product_line) {
                evtName = `${event.meta.product_line}:${evtName}`;
            }
            if (!evtName) {
                curDebug('fail to get name from meta : %O', event);
                evtName = 'unknown';
            }
            this._emit(evtName, event.data);
        }
    }

    /**
     * globally handle event
     * @param data - websocket data
     */
    private _handleEvent(data: WebSocket.Data) {
        const curDebug = debug.extend('_handleEvent');
        curDebug('()');

        let parsed: unknown;
        try {
            parsed = JSON.parse(data.toString());
        } catch (e) {
            curDebug('fail to parse event');
            curDebug(e);
        }

        if (this.isController) {
            const event = parsed as unifiControllerEvents;
            this._emit(event?.type ?? 'unknown', event);
        } else {
            this._handleSiteEvent(parsed as ISiteEvent);
        }
    }
}
