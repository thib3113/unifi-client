import _ObjectSubSite, { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { timestampDate } from '../commons/types';
import { AuthorizedBy, IGuestAuthorization } from './IGuestAuthorization';

export default class GuestAuthorization extends _ObjectSubSite implements IGuestAuthorization {
    _id: string;
    authorized_by: AuthorizedBy;
    end: timestampDate;
    mac: string;
    qos_usage_quota: number;
    site_id: string;
    start: timestampDate;

    constructor(config: IObjectSubSiteConfig, props: IGuestAuthorization) {
        super(config);

        if (props) {
            this._id = props._id;
            this.authorized_by = props.authorized_by;
            this.end = props.end;
            this.mac = props.mac;
            this.site_id = props.site_id;
            this.start = props.start;

            this.qos_usage_quota = props.qos_usage_quota;
            //sometimes non unifiOs return qos_usage_quota sometimes not
            // this.needVersion<number>('qos_usage_quota', props.qos_usage_quota, undefined, true);
        }
    }
}
