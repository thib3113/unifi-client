import { IDeviceFingerprintRaw, DeviceFingerPrints } from '../../src';

describe('DeviceFingerPrints', () => {
    it('should construct', () => {
        const fingerPrint = new DeviceFingerPrints({
            dev_ids: {
                19: {
                    name: 'Google Pixel XL',
                    // @ts-ignore just in case
                    vendor_id: undefined,
                    os_name_id: '56',
                    os_class_id: '5',
                    dev_type_id: '44',
                    family_id: '9',
                    fb_id: '11366',
                    tm_id: '2193',
                    ctag_id: null
                },
                20: {
                    name: 'Google Pixel',
                    vendor_id: '7',
                    os_name_id: undefined,
                    os_class_id: '5',
                    dev_type_id: '44',
                    family_id: '9',
                    fb_id: null,
                    tm_id: '2194',
                    ctag_id: null
                },
                21: {
                    name: 'Google Pixel C',
                    vendor_id: '7',
                    os_name_id: '56',
                    os_class_id: undefined,
                    dev_type_id: '44',
                    family_id: '10',
                    fb_id: '8438',
                    tm_id: '2195',
                    ctag_id: null
                },
                283: {
                    name: 'Google Pixel 2 ',
                    vendor_id: '7',
                    os_name_id: '56',
                    os_class_id: '5',
                    dev_type_id: undefined,
                    family_id: '9',
                    fb_id: '33901',
                    tm_id: '2889',
                    ctag_id: null
                },
                284: {
                    name: 'Google Pixel 2 XL',
                    vendor_id: '7',
                    os_name_id: '56',
                    os_class_id: '5',
                    dev_type_id: '44',
                    // @ts-ignore just in case
                    family_id: undefined,
                    fb_id: '33902',
                    tm_id: '2888',
                    ctag_id: null
                },
                2801: {
                    name: 'Google Pixel 3 XL',
                    vendor_id: '7',
                    os_name_id: '56',
                    os_class_id: '5',
                    dev_type_id: '44',
                    family_id: '9',
                    fb_id: undefined,
                    tm_id: '0',
                    ctag_id: null
                },
                2822: {
                    name: 'Google Pixel 3',
                    vendor_id: '7',
                    os_name_id: '56',
                    os_class_id: '5',
                    dev_type_id: '44',
                    family_id: '9',
                    fb_id: '43354',
                    tm_id: undefined,
                    ctag_id: null
                },
                3655: {
                    name: 'UniFi AP LR',
                    vendor_id: '234',
                    os_name_id: '1',
                    os_class_id: '1',
                    dev_type_id: '12',
                    family_id: '7',
                    fb_id: '0',
                    tm_id: '0',
                    ctag_id: '101'
                },
                3915: {
                    id: 3915,
                    name: 'Galaxy player 70 Plus',
                    vendor_id: 202,
                    class_id: 11,
                    family_id: 3809
                }
            },
            dev_type_ids: {
                1: 'Desktop/Laptop',
                2: 'Router',
                3: 'VoIP Phone',
                4: 'Miscellaneous',
                5: 'IPTV',
                6: 'Smartphone'
            },
            family_ids: {
                1: 'Smart TV & Set-top box',
                2: 'Game Console',
                3: 'Handheld'
            },
            os_class_ids: {
                1: 'Others',
                2: 'VxWorks',
                3: 'Linux',
                4: 'Network Boot Loader',
                5: 'Android'
            },
            os_name_ids: {
                1: 'Others',
                2: 'VxWorks',
                3: 'Linux'
            },
            vendor_ids: {
                1: 'Others',
                2: '2Wire, Inc.'
            },
            ctag_ids: { 101: 'network', 102: 'protect', 103: 'led', 104: 'talk', 105: 'access', 106: 'lte' }
        });

        expect(fingerPrint.devices).toStrictEqual({
            19: {
                deviceFamily: 9,
                deviceType: 44,
                fb: 11366,
                name: 'Google Pixel XL',
                osClass: 5,
                osName: 56,
                tm: 2193,
                vendor: undefined,
                category: undefined,
                classId: undefined
            },
            20: {
                deviceFamily: 9,
                deviceType: 44,
                name: 'Google Pixel',
                osClass: 5,
                osName: undefined,
                tm: 2194,
                fb: undefined,
                vendor: 7,
                category: undefined,
                classId: undefined
            },
            21: {
                deviceFamily: 10,
                deviceType: 44,
                fb: 8438,
                name: 'Google Pixel C',
                osClass: undefined,
                osName: 56,
                tm: 2195,
                vendor: 7,
                category: undefined,
                classId: undefined
            },
            283: {
                deviceFamily: 9,
                deviceType: undefined,
                fb: 33901,
                name: 'Google Pixel 2 ',
                osClass: 5,
                osName: 56,
                tm: 2889,
                vendor: 7,
                category: undefined,
                classId: undefined
            },
            284: {
                deviceFamily: undefined,
                deviceType: 44,
                fb: 33902,
                name: 'Google Pixel 2 XL',
                osClass: 5,
                osName: 56,
                tm: 2888,
                vendor: 7,
                category: undefined,
                classId: undefined
            },
            2801: {
                deviceFamily: 9,
                deviceType: 44,
                fb: undefined,
                name: 'Google Pixel 3 XL',
                osClass: 5,
                osName: 56,
                tm: 0,
                vendor: 7,
                category: undefined,
                classId: undefined
            },
            2822: {
                deviceFamily: 9,
                deviceType: 44,
                fb: 43354,
                name: 'Google Pixel 3',
                osClass: 5,
                osName: 56,
                tm: undefined,
                vendor: 7,
                category: undefined,
                classId: undefined
            },
            3655: {
                category: 101,
                deviceFamily: 7,
                deviceType: 12,
                fb: 0,
                name: 'UniFi AP LR',
                classId: undefined,
                osClass: 1,
                osName: 1,
                tm: 0,
                vendor: 234
            },
            3915: {
                classId: 11,
                deviceFamily: 3809,
                name: 'Galaxy player 70 Plus',
                vendor: 202,
                tm: undefined,
                category: undefined,
                deviceType: undefined,
                fb: undefined,
                osClass: undefined,
                osName: undefined
            }
        });
        expect(fingerPrint.categories).toStrictEqual({
            '101': 'network',
            '102': 'protect',
            '103': 'led',
            '104': 'talk',
            '105': 'access',
            '106': 'lte'
        });
        expect(fingerPrint.deviceFamilies).toStrictEqual({
            1: 'Smart TV & Set-top box',
            2: 'Game Console',
            3: 'Handheld'
        });
        expect(fingerPrint.deviceTypes).toStrictEqual({
            1: 'Desktop/Laptop',
            2: 'Router',
            3: 'VoIP Phone',
            4: 'Miscellaneous',
            5: 'IPTV',
            6: 'Smartphone'
        });
        expect(fingerPrint.osClasses).toStrictEqual({
            1: 'Others',
            2: 'VxWorks',
            3: 'Linux',
            4: 'Network Boot Loader',
            5: 'Android'
        });
        expect(fingerPrint.osNames).toStrictEqual({
            1: 'Others',
            2: 'VxWorks',
            3: 'Linux'
        });
        expect(fingerPrint.vendors).toStrictEqual({
            1: 'Others',
            2: '2Wire, Inc.'
        });
    });
    it('should prepare a device', () => {
        const fingerPrint = new DeviceFingerPrints({ dev_ids: {} });
        const rawData: IDeviceFingerprintRaw = {
            name: 'Google Pixel XL',
            vendor_id: '123',
            os_name_id: '56',
            os_class_id: '5',
            dev_type_id: '44',
            family_id: '9',
            fb_id: '11366',
            tm_id: '2193',
            ctag_id: '101',
            class_id: 11
        };
        const finalData = {
            name: 'Google Pixel XL',
            vendor: 123,
            osName: 56,
            osClass: 5,
            deviceType: 44,
            deviceFamily: 9,
            fb: 11366,
            tm: 2193,
            category: 101,
            classId: 11
        };

        // @ts-ignore
        expect(fingerPrint.prepareDevice(rawData)).toStrictEqual(finalData);

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, vendor_id: undefined })).toStrictEqual({ ...finalData, vendor: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, os_name_id: undefined })).toStrictEqual({ ...finalData, osName: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, os_class_id: undefined })).toStrictEqual({ ...finalData, osClass: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, dev_type_id: undefined })).toStrictEqual({ ...finalData, deviceType: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, family_id: undefined })).toStrictEqual({ ...finalData, deviceFamily: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, fb_id: undefined })).toStrictEqual({ ...finalData, fb: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, tm_id: undefined })).toStrictEqual({ ...finalData, tm: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, ctag_id: undefined })).toStrictEqual({ ...finalData, category: undefined });

        // @ts-ignore
        expect(fingerPrint.prepareDevice({ ...rawData, class_id: undefined })).toStrictEqual({ ...finalData, classId: undefined });
    });

    it('should prepareDevices', () => {
        const fingerPrint = new DeviceFingerPrints({ dev_ids: {} });
        const prepareDeviceMock = jest.fn();

        const fingerPrints = [
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: undefined,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: undefined,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: undefined,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: undefined,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: undefined,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: undefined,
                tm: 2193,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: undefined,
                category: 101,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: undefined,
                classId: 11
            },
            {
                name: 'Google Pixel XL',
                vendor: 123,
                osName: 56,
                osClass: 5,
                deviceType: 44,
                deviceFamily: 9,
                fb: 11366,
                tm: 2193,
                category: 101,
                classId: undefined
            }
        ];

        // @ts-ignore
        expect(fingerPrint.prepareDevices(undefined)).toBe(undefined);

        // @ts-ignore
        fingerPrint.prepareDevice = prepareDeviceMock;

        // @ts-ignore
        fingerPrint.prepareDevices(fingerPrints);

        fingerPrints.forEach((f: Partial<IDeviceFingerprintRaw>) => {
            expect(prepareDeviceMock).toHaveBeenCalledWith(f);
        });
    });
});
