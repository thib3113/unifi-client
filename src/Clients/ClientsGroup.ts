import { _ObjectSubSite, IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { ClientError, EErrorsCodes } from '../Errors';
import { createDebugger } from '../util';
import { Validate } from '../commons/Validate';
import { IClientGroupRaw } from './IClientGroupRaw';
import { IUnifiResponseEnveloppe } from '../interfaces';

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
        this.debug('import()');
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.siteId = props.site_id;
        }
        if (!Validate.isUndefined(props.attr_hidden_id)) {
            this.hiddenId = props.attr_hidden_id;
        }
        if (!Validate.isUndefined(props.attr_no_delete)) {
            this.noDelete = props.attr_no_delete;
        }
        if (!Validate.isUndefined(props.qos_rate_max_up)) {
            this.maxUploadBandwidth = props.qos_rate_max_up;
        }
        if (!Validate.isUndefined(props.qos_rate_max_down)) {
            this.maxDownloadBandwidth = props.qos_rate_max_down;
        }

        return this;
    }

    public async delete(): Promise<boolean> {
        this.debug('delete()');
        const res = await this.instance.delete<IUnifiResponseEnveloppe<Array<void>>>('/rest/usergroup/:_id', {
            urlParams: { _id: this._id }
        });

        return res.data.meta.rc === 'ok';
    }

    public async save(): Promise<this> {
        this.debug('save()');
        const payload = {
            _id: this._id,
            site_id: this.siteId,
            name: this.name,
            qos_rate_max_down: this.maxDownloadBandwidth,
            qos_rate_max_up: this.maxUploadBandwidth
        };

        const groups = (
            await this.instance.put<IUnifiResponseEnveloppe<Array<IClientGroupRaw>>>('/rest/usergroup/:_id', payload, {
                urlParams: { _id: this._id }
            })
        ).data.data;

        if (groups.length > 0) {
            this.import(groups[0]);
        }
        return this;
    }

    public _id: string;
    public siteId: string;
    public name: string;
    public hiddenId?: string;
    public noDelete?: boolean;
    /**
     * upload QOS for this group, in Kbps
     */
    public maxUploadBandwidth?: number;
    /**
     * download QOS for this group, in Kbps
     */
    public maxDownloadBandwidth?: number;
}
