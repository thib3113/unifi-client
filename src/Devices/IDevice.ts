import { IUnknownDevice } from './IUnknownDevice';

export interface IDevice extends IUnknownDevice {
    _id: string;
    site_id: string;
    oui: string;
    first_seen: number;
    last_seen: number;
    hostname: string;
    fingerprint_override: boolean;
    dev_id_override: number;
    fingerprint_source: number;
    dev_cat: number;
    dev_family: number;
    os_name: number;
    dev_vendor: number;
    dev_id: number;
    confidence: number;

    fingerprint_engine_version?: string;
}
