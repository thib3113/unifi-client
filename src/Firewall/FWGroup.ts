import { IFWGroup } from '../interfaces';
import _ObjectSubSite, { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { ClientError, EErrorsCodes } from '../Errors';
import Validate from '../commons/Validate';

export default class FWGroup extends _ObjectSubSite implements IFWGroup {
    _id: string;
    group_members: Array<string>;
    group_type: 'address-group' | 'port-group' | 'ipv6-address-group';
    name: string;
    site_id: string;

    constructor(config: IObjectSubSiteConfig, props: IFWGroup) {
        super(config);

        this._id = props._id;
        if (!this._id) {
            throw new ClientError('_id is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.import(props);
    }

    protected import(props: IFWGroup): this {
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.group_type)) {
            this.group_type = props.group_type;
        }
        if (!Validate.isUndefined(props.group_members)) {
            this.group_members = props.group_members;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.site_id = props.site_id;
        }

        return this;
    }

    public async save(): Promise<void> {
        const group: IFWGroup = { ...this };
        return (
            await this.instance.put('/rest/firewallgroup/:id', group, {
                urlParams: { site: this.site.name, id: this._id }
            })
        ).data?.data;
    }

    public async delete(): Promise<void> {
        await this.instance.delete('/rest/firewallgroup/:id', {
            urlParams: { site: this.site.name, id: this._id }
        });
    }
}
