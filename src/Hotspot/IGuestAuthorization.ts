import { timestampDate } from '../commons/types';

export type AuthorizedBy = 'api' | string;

export interface IGuestAuthorization {
    _id: string;
    mac: string;
    start: timestampDate;
    site_id: string;
    authorized_by: AuthorizedBy;
    end: timestampDate;
    qos_usage_quota: number;
}
