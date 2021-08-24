import { IDeviceFingerprintRaw, FingerprintsRaw, IDeviceFingerprint } from './FingerPrintsTypes';

export class DeviceFingerPrints {
    devices: Record<string, IDeviceFingerprint>;
    deviceTypes: Record<string, string>;
    deviceFamilies: Record<string, string>;
    osClasses: Record<string, string>;
    osNames: Record<string, string>;
    vendors: Record<string, string>;
    categories: Record<string, string>;

    constructor(fingerprintsRaw: FingerprintsRaw) {
        this.categories = fingerprintsRaw.ctag_ids || {};
        this.devices = this.prepareDevices(fingerprintsRaw.dev_ids) || {};
        this.deviceTypes = fingerprintsRaw.dev_type_ids || {};
        this.deviceFamilies = fingerprintsRaw.family_ids || {};
        this.osNames = fingerprintsRaw.os_name_ids || {};
        this.osClasses = fingerprintsRaw.os_class_ids || {};
        this.vendors = fingerprintsRaw.vendor_ids || {};
    }

    private prepareDevice(dRaw: IDeviceFingerprintRaw): IDeviceFingerprint {
        return {
            deviceFamily: dRaw.family_id ? Number(dRaw.family_id) : undefined,
            deviceType: dRaw.dev_type_id ? Number(dRaw.dev_type_id) : undefined,
            name: dRaw.name,
            osClass: dRaw.os_class_id ? Number(dRaw.os_class_id) : undefined,
            osName: dRaw.os_name_id ? Number(dRaw.os_name_id) : undefined,
            fb: dRaw.fb_id ? Number(dRaw.fb_id) : undefined,
            tm: dRaw.tm_id ? Number(dRaw.tm_id) : undefined,
            category: dRaw.ctag_id ? Number(dRaw.ctag_id) : undefined,
            vendor: dRaw.vendor_id ? Number(dRaw.vendor_id) : undefined,
            classId: dRaw.class_id ? Number(dRaw.class_id) : undefined
        };
    }

    private prepareDevices(devIds?: Record<number, IDeviceFingerprintRaw>): Record<string, IDeviceFingerprint> | undefined {
        return !devIds
            ? undefined
            : Object.fromEntries(
                  Object.entries(devIds).map(([k, v]) => {
                      return [Number(k), this.prepareDevice(v)];
                  })
              );
    }
}
