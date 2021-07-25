import { EventEmitter } from 'events';
import type { Controller } from '../Controller';
import WebSocket from 'ws';
import cookie from 'cookie';
import semver from 'semver';
import { EControllerEvents } from './events/EControllerEvents';
import { events, eventDataTypes } from './events';

export interface IUnifiWebSocketsProps {
    controller: Controller;
    url: string;
    strictSSL?: boolean;
}

export class UnifiWebsockets extends EventEmitter {
    private controller: Controller;
    private readonly url: string;
    private isClosed = true;
    private readonly autoReconnectInterval = 5 * 1000;
    private ws: WebSocket;
    private readonly strictSSL: boolean;
    private pingPongInterval: NodeJS.Timeout;
    private isReconnecting: boolean;

    static UnifiWebSockets: Array<UnifiWebsockets> = [];
    public static globalWS: EventEmitter = new EventEmitter();

    constructor(props: IUnifiWebSocketsProps) {
        super();

        //get controller
        this.controller = props.controller;

        this.url = props.url;

        this.strictSSL = props.strictSSL;

        //start websockets connexion
        // this.initWebSockets(props).catch((e) => {
        //     this._emit('ctrl.error', e);
        // });

        UnifiWebsockets.UnifiWebSockets.push(this);
    }

    public async initWebSockets(): Promise<void> {
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
        }, 15000);

        this.ws.on('open', () => {
            this.isReconnecting = false;
            this._emit(EControllerEvents.CONNECTION);
        });

        this.ws.on('message', (data) => {
            if (data === 'pong') {
                this._emit(EControllerEvents.PONG);
            }
            try {
                const parsed = JSON.parse(data.toString());

                // manage V6 or V5
                if (semver.lte(this.controller.version, '6.0.0')) {
                    if ('data' in parsed && Array.isArray(parsed.data)) {
                        parsed.data.forEach((entry) => {
                            this._eventV5(entry);
                        });
                    }
                } else {
                    this._emit(parsed.type ?? 'unknown', parsed);
                }
            } catch (err) {
                this._emit(EControllerEvents.ERROR, err);
            }
        });

        this.ws.on('close', () => {
            this._emit('ctrl.close');
            clearInterval(this.pingPongInterval);
            this._reconnect();
        });

        this.ws.on('error', (err) => {
            this._emit('ctrl.error', err);
            clearInterval(this.pingPongInterval);
            this._reconnect();
        });
    }

    private _eventV5(data) {
        if (data && data.key) {
            const match = data.key.match(/EVT_([A-Z]{2})_(.*)/);
            if (match) {
                const [, group, event] = match;
                this._emit([group.toLowerCase(), event.toLowerCase()].join('.'), data);
            }
        }
    }

    private _reconnect() {
        if (!this.isReconnecting && !this.isClosed) {
            this.isReconnecting = true;
            setTimeout(async () => {
                try {
                    this._emit(EControllerEvents.RECONNECTION);
                    this.isReconnecting = false;
                    await this.initWebSockets();
                } catch (e) {
                    console.dir('_reconnect() encountered an error');
                }
            }, this.autoReconnectInterval);
        }
    }

    static closeSockets(): void {
        this.UnifiWebSockets.forEach((s) => s.close());
    }

    close(): void {
        this.isClosed = true;
        this.ws.close();
    }

    private _emit(event: events | string, ...args: Array<eventDataTypes>): boolean {
        //store the result about listeners
        const resEmit1 = this.emit(event, ...args);
        this.emit('*', event, ...args);
        //emit global events
        UnifiWebsockets.globalWS.emit(event, ...args);
        UnifiWebsockets.globalWS.emit('*', event, ...args);
        return resEmit1;
    }
}
