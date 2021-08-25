import { _ObjectSubSite, IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { ClientError, EErrorsCodes } from '../Errors';
import { createDebugger } from '../util';
import { Validate } from '../commons/Validate';
import { IClientGroupRaw } from './IClientGroupRaw';

export class ClientsGroup extends _ObjectSubSite {
    static debug = createDebugger('clientsGroup');

    constructor(config: IObjectSubSiteConfig, props: Partial<IClientGroupRaw> & { _id: string }) {
        super(config);

        this._id = props._id;
        if (!this._id) {
            throw new ClientError('_id is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.debug = ClientsGroup.debug.extend(this._id);
        this.import(props);
    }

    public import(props: Partial<IClientGroupRaw>): this {
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.site_id = props.site_id;
        }

        if (!Validate.isUndefined(props.attr_hidden_id)) {
            this.attr_hidden_id = props.attr_hidden_id;
        }
        if (!Validate.isUndefined(props.attr_no_delete)) {
            this.attr_no_delete = props.attr_no_delete;
        }
        if (!Validate.isUndefined(props.qos_rate_max_up)) {
            this.qos_rate_max_up = props.qos_rate_max_up;
        }
        if (!Validate.isUndefined(props.qos_rate_max_down)) {
            this.qos_rate_max_down = props.qos_rate_max_down;
        }

        return this;
    }

    public _id: string;
    public site_id: string;
    public name: string;
    public attr_hidden_id?: string;
    public attr_no_delete?: boolean;
    /**
     * upload QOS for this group, in kbps
     */
    public qos_rate_max_up?: number;
    /**
     * download QOS for this group, in kbps
     */
    public qos_rate_max_down?: number;
}
