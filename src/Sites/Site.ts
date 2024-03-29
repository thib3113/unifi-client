import { ISite } from './ISite';
import { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { Hotspots } from '../Hotspot';
import { Clients } from '../Clients';
import { Firewall } from '../Firewall';
import { _ObjectSubController } from '../commons/_ObjectSubController';
import { Controller } from '../Controller';
import { Validate } from '../commons/Validate';
import { INetworkStatus } from './INetworkStatus';
import { UnifiWebsockets } from '../WebSockets';
import { Stats } from '../Stats';
import { ClientError, EErrorsCodes } from '../Errors';
import { EProxyNamespaces, IUnifiResponseEnveloppe } from '../interfaces';
import { createDebugger } from '../util';
import { ClientsGroups } from '../Clients/ClientsGroups';
import { Devices } from '../Devices';
import type { BaseDevice } from '../Devices';
import { macAddress } from '../commons/types';
import { ISiteSettingsManagement, tSiteSettings } from './ISiteSettings';
import { Networks } from '../Networks';

export class Site extends _ObjectSubController implements ISite {
    static debug = createDebugger('site');
    /**
     * internal id
     */
    public _id: string;
    /**
     * an uuid of the site
     */
    public anonymous_id: string;
    /**
     * the technical name of the site (seems autogenerated)
     */
    public name: string;
    /**
     * the name you setup for this site
     */
    public desc: string;
    public attr_hidden_id: string;
    public attr_no_delete: boolean;
    public role: string;
    public role_hotspot: boolean;

    public firewall: Firewall;
    public hotspots: Hotspots;
    public clients: Clients;
    public clientsGroups: ClientsGroups;

    public ws: UnifiWebsockets;
    public stats: Stats;
    public devices: Devices;
    public networks: Networks;

    constructor(controller: Controller, props: ISite) {
        super({
            controller: controller,
            instance: controller.controllerInstance
        });

        if (!props.name) {
            throw new ClientError('name is mandatory for a site . The default unifi site name is "default"');
        }

        this.name = props.name;
        this.debug = Site.debug.extend(this.name);

        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.anonymous_id)) {
            this.anonymous_id = props.anonymous_id;
        }
        if (!Validate.isUndefined(props.desc)) {
            this.desc = props.desc;
        }
        if (!Validate.isUndefined(props.attr_hidden_id)) {
            this.attr_hidden_id = props.attr_hidden_id;
        }
        if (!Validate.isUndefined(props.attr_no_delete)) {
            this.attr_no_delete = props.attr_no_delete;
        }
        if (!Validate.isUndefined(props.role)) {
            this.role = props.role;
        }

        this.needVersion<boolean>('role_hotspot', props.role_hotspot, undefined, true);

        const config: IObjectSubSiteConfig = {
            controller: this.controller,
            site: this
        };

        //init objects
        this.firewall = new Firewall(config);
        this.hotspots = new Hotspots(config);
        this.clients = new Clients(config);
        this.clientsGroups = new ClientsGroups(config);
        this.devices = new Devices(config);
        this.stats = new Stats(config);
        this.networks = new Networks(config);

        this.instance = this.controller.createInstance(this.name, {
            proxyNamespace: EProxyNamespaces.NETWORK,
            apiPart: 'api'
        });
    }

    // TODO test return
    public async adoptDevice(device: string | BaseDevice): Promise<unknown> {
        let mac: macAddress;
        if (Validate.implementsTKeys<BaseDevice>(device, ['mac'])) {
            mac = device.mac;
        } else if (!Validate.mac(device)) {
            throw new ClientError('parameter need to be a mac address', EErrorsCodes.BAD_PARAMETERS);
        } else {
            mac = device;
        }
        const payload = { cmd: 'adopt', mac: mac.toLowerCase() };

        return (await this.devManager(payload)).data;
    }

    /**
     *
     * @param enable -  true switches LEDs of all the access points ON, false switches them OFF
     */
    public async enableLEDs(enable = true): Promise<ISiteSettingsManagement> {
        return (await this.settingsManager<ISiteSettingsManagement>({ led_enabled: enable })).data;
    }

    public async getSettings(): Promise<Array<tSiteSettings>> {
        return (await this.instance.get<IUnifiResponseEnveloppe<Array<tSiteSettings>>>('/get/setting')).data.data;
    }

    public async settingsManager<T>(settings: Record<string, unknown>): Promise<IUnifiResponseEnveloppe<T>> {
        return (await this.instance.post<IUnifiResponseEnveloppe<T>>('/set/setting/mgmt', settings)).data;
    }

    public async devManager<T>(payload: Record<string, unknown> & { cmd: string }): Promise<IUnifiResponseEnveloppe<T>> {
        return (await this.instance.post<IUnifiResponseEnveloppe<T>>('/cmd/devmgr', payload)).data;
    }

    // this function need to never be async !!! but return a promise ( so this.ws is init before the real init )
    public initWebSockets(): Promise<void> {
        this.debug('initWebSockets()');
        //build WS url
        const wsConfig = this.controller.buildUrl(
            {
                baseURL: this.controllerInstance.defaults.baseURL,
                url: '/events',
                site: this.name
            },
            true
        );

        if (!wsConfig.url) {
            throw new ClientError('fail to generate site WS url', EErrorsCodes.UNKNOWN_ERROR);
        }
        const wsURL = `${wsConfig.baseURL}${wsConfig.url}`;
        this.ws = new UnifiWebsockets({
            controller: this.controller,
            strictSSL: this.controller.strictSSL,
            url: wsURL.toString(),
            isController: false
        });

        return this.ws.initWebSockets();
    }
    public on(eventName: string, cb: (...args: Array<unknown>) => unknown): this {
        this.debug('on(%s)', eventName);
        if (!this.ws) {
            //ws initialization will be done asynchronously
            // noinspection JSIgnoredPromiseFromCall
            this.initWebSockets();
        }

        this.ws.on(eventName, cb);
        return this;
    }

    public async getNetworkStatus(): Promise<INetworkStatus> {
        this.debug('getNetworkStatus()');
        return (
            await this.instance.get(`/network_status`, {
                apiVersion: 2
            })
        ).data;
    }
}
