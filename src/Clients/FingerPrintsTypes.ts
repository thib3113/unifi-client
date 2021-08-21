export interface FingerprintsRaw {
    dev_ids: Record<number, DeviceFingerprintRaw>;
    dev_type_ids: Record<number, string>;
    family_ids: Record<number, string>;
    os_class_ids: Record<number, string>;
    os_name_ids: Record<number, string>;
    vendor_ids: Record<number, string>;
    ctag_ids: Record<number, string>;
}

export interface DeviceFingerprintRaw {
    name: string;
    vendor_id: string;
    os_name_id: string;
    os_class_id: string;
    dev_type_id: string;
    family_id: string;
    fb_id?: string;
    tm_id?: string;
    ctag_id?: string;
}

export interface Fingerprints {
    devices: Record<number, IDeviceFingerprint>;
    deviceTypes: Record<string, string>;
    deviceFamilies: Record<string, string>;
    osClass: Record<string, string>;
    osNames: Record<string, string>;
    vendors: Record<string, string>;
    categories: Record<string, string>;
}

export interface IDeviceFingerprint {
    name: string;
    vendor: string;
    osName: string;
    osClass: string;
    deviceType: string;
    deviceFamily: string;
    /**
     * unknown signification
     */
    fb?: string;
    /**
     * unknown signification
     */
    tm?: string;
    category?: string;
}
