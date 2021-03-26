import { ISite } from './ISite';
import Firewall from '../Firewall/Firewall';
import Validate from '../commons/Validate';
import { IController } from '../IController';
import { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import _ObjectSubController from '../commons/_ObjectSubController';
import Hotspots from '../Hotspot/Hotspots';
import { Devices } from '../Devices';

export default class Site extends _ObjectSubController implements ISite {
    public _id: string;
    public anonymous_id: string;
    public name: string;
    public desc: string;
    public attr_hidden_id: string;
    public attr_no_delete: boolean;
    public role: string;
    public role_hotspot: boolean;

    public firewall: Firewall;
    public hotspots: Hotspots;
    public devices: Devices;

    constructor(controller: IController, props: ISite) {
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
        this.firewall = new Firewall(config);
        this.hotspots = new Hotspots(config);
        this.devices = new Devices(config);
    }
}
