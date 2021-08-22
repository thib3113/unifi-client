export interface FingerprintsRaw {
    dev_ids: Record<number, DeviceFingerprintRaw>;
    dev_type_ids?: Record<number, string>;
    family_ids?: Record<number, string>;
    os_class_ids?: Record<number, string>;
    os_name_ids?: Record<number, string>;
    vendor_ids?: Record<number, string>;
    ctag_ids?: Record<number, string>;
}

export interface DeviceFingerprintRaw {
    id?: number;
    name: string;
    vendor_id: number | string;
    class_id?: number;
    family_id: number | string;
    dev_type_id?: string;
    os_class_id?: string;
    os_name_id?: string;
    fb_id?: null | string;
    tm_id?: null | string;
    ctag_id?: null | string;
}

export interface Fingerprints {
    devices: Record<number, IDeviceFingerprint>;
    deviceTypes: Record<number, string>;
    deviceFamilies: Record<number, string>;
    osClass: Record<number, string>;
    osNames: Record<number, string>;
    vendors: Record<number, string>;
    categories: Record<number, string>;
}

export interface IDeviceFingerprint {
    name: string;
    vendor?: number;
    osName?: number;
    osClass?: number;
    deviceType?: number;
    deviceFamily?: number;
    /**
     * unknown signification
     */
    fb?: number;
    /**
     * unknown signification
     */
    tm?: number;
    category?: number;
    classId?: number;
}
