import { ISite } from './ISite';
import { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { Hotspots } from '../Hotspot';
import { Devices } from '../Devices';
import { Firewall } from '../Firewall';
import { _ObjectSubController } from '../commons/_ObjectSubController';
import { Controller } from '../Controller';
import { Validate } from '../commons/Validate';
import { INetworkStatus } from './INetworkStatus';
import { UnifiWebsockets } from '../WebSockets';
import { Stats } from '../Stats';
import { ClientError, EErrorsCodes } from '../Errors';
import { EProxyNamespaces } from '../interfaces';

export class Site extends _ObjectSubController implements ISite {
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
    public devices: Devices;

    public ws: UnifiWebsockets;
    public stats: Stats;

    constructor(controller: Controller, props: ISite) {
        super({
            controller: controller,
            instance: controller.controllerInstance
        });
        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.anonymous_id)) {
            this.anonymous_id = props.anonymous_id;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
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
            instance: this.controller.controllerInstance,
            controller: this.controller,
            site: this
        };

        //init objects
        this.firewall = new Firewall(config);
        this.hotspots = new Hotspots(config);
        this.devices = new Devices(config);
        this.stats = new Stats(config);

        this.instance = this.controller.createInstance(this.name || 'default', {
            proxyNamespace: EProxyNamespaces.NETWORK,
            apiPart: 'api'
        });
    }

    // this function need to never be async !!! but return a promise ( so this.ws is init before the real init )
    public initWebSockets(): Promise<void> {
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
        if (!this.ws) {
            this.initWebSockets();
        }

        this.ws.on(eventName, cb);
        return this;
    }

    public async getNetworkStatus(): Promise<INetworkStatus> {
        return (
            await this.instance.get(`/network_status`, {
                apiVersion: 2
            })
        ).data;
    }
}
