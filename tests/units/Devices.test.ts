import { BaseDevice, Devices, EDeviceType, UAPDevice, UBBDevice, UDMDevice, UGWDevice, USWDevice, UXGDevice } from '../../src';
import { controller, site } from '../mocks';
import axios from 'axios';
import { macAddress } from '../globals';

describe('Devices', () => {
    let devices: Devices;
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    beforeEach(() => {
        devices = new Devices({ controller, site });
    });
    describe('list', () => {
        const mapDeviceMock = jest.fn();
        beforeEach(() => {
            // @ts-ignore
            devices.mapDevice = mapDeviceMock.mockImplementation((d) => d);
        });
        it('should list devices', async () => {
            mockedAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [{ mac: macAddress }]
                    }
                })
            );

            const res = await devices.list();

            expect(mockedAxios.get).toHaveBeenCalledWith('/stat/device');
            expect(res).toStrictEqual([{ mac: macAddress }]);
            expect(mapDeviceMock).toHaveBeenCalledTimes(1);
            expect(mapDeviceMock).toHaveBeenCalledWith({ mac: macAddress });
        });
        it('should handle no results', async () => {
            mockedAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {}
                })
            );

            const res = await devices.list();

            expect(mockedAxios.get).toHaveBeenCalledWith('/stat/device');
            expect(res).toStrictEqual([]);
            expect(mapDeviceMock).not.toHaveBeenCalled();
        });
    });
    describe('mapDevice', () => {
        const data: Array<[EDeviceType | string | null, typeof BaseDevice]> = [
            [null, BaseDevice],
            ['any unknown device', BaseDevice],
            [EDeviceType.UAP, UAPDevice],
            [EDeviceType.UBB, UBBDevice],
            [EDeviceType.UDM, UDMDevice],
            [EDeviceType.UGW, UGWDevice],
            [EDeviceType.USW, USWDevice],
            [EDeviceType.UXG, UXGDevice]
        ];
        it.each(data)('should construct correct object with type %s', (type, instance) => {
            // @ts-ignore
            const res = devices.mapDevice({
                // @ts-ignore
                type,
                mac: macAddress
            });

            expect(res).toBeInstanceOf(instance);
            expect(res.type).toBe(type);
            expect(res.mac).toBe(macAddress);
        });
    });
});
