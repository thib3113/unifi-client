import { ipString } from '../interfaces';

export interface IUnknownDevice {
    mac: string;
    user_group_id?: string;
    name: string;
    note: string;
    noted: boolean;
    is_guest: boolean;
    is_wired: boolean;

    fixed_ip?: ipString;
    network_id?: string;
    use_fixedip?: boolean;
}
