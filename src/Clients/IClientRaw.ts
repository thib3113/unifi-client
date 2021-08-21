import { IUnknownClient } from './IUnknownClient';
import { dateInput, semverVersion } from '../commons/types';

export interface IClientRaw extends IUnknownClient {
    _id: string;
    site_id: string;
    oui: string;
    first_seen: dateInput;
    last_seen: dateInput;
    hostname: string;
    fingerprint_override?: boolean;
    dev_id_override?: number;
    fingerprint_source?: number;
    dev_cat?: number;
    dev_family?: number;
    os_name?: number;
    dev_vendor?: number;
    dev_id?: number;
    confidence?: number;

    fingerprint_engine_version?: semverVersion;
    device_name?: string;
    fw_version?: string;
    score?: number;
    blocked?: boolean;
}
