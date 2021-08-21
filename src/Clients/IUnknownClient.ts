import { ipString } from '../interfaces';
import { macAddress } from '../commons/types';

export interface IUnknownClient {
    mac: macAddress;
    user_group_id?: string;
    usergroup_id?: string;
    name?: string;
    note?: string;
    noted?: boolean;
    is_guest: boolean;
    is_wired: boolean;

    fixed_ip?: ipString;
    network_id?: string;
    use_fixedip?: boolean;
}
