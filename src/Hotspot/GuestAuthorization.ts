import { _ObjectSubSite, IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { timestampDate } from '../commons/types';
import { AuthorizedBy, IGuestAuthorization } from './IGuestAuthorization';

export class GuestAuthorization extends _ObjectSubSite implements IGuestAuthorization {
    _id: string;
    authorized_by: AuthorizedBy;
    end: timestampDate;
    mac: string;
    qos_usage_quota: number;
    site_id: string;
    start: timestampDate;
    qos_overwrite: boolean;
    qos_rate_max_down: number;
    qos_rate_max_up: number;

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

            this.needVersion<number>('qos_rate_max_up', props.qos_rate_max_up, undefined, false);
            this.needVersion<number>('qos_rate_max_down', props.qos_rate_max_down, undefined, false);
            this.needVersion<boolean>('qos_overwrite', props.qos_overwrite, undefined, false);
        }
    }
}
