import { IFWGroup } from '../interfaces';
import _ObjectSubSite, { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';

export default class FWGroup extends _ObjectSubSite implements IFWGroup {
    _id: string;
    group_members: Array<string>;
    group_type: 'address-group' | 'port-group' | 'ipv6-address-group';
    name: string;
    site_id: string;

    constructor(config: IObjectSubSiteConfig, props: IFWGroup) {
        super(config);

        if (props) {
            this._id = props._id;
            this.name = props.name;
            this.group_type = props.group_type;
            this.group_members = props.group_members;
            this.site_id = props.site_id;
        }
    }
}
