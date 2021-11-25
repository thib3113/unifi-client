import { Devices } from '../../src';
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
        const listOld = jest.fn();
        beforeEach(() => {
            // @ts-ignore
            devices.listOld = listOld.mockImplementation((d) => d);
        });
        // describe('', async () => {});
        it('should list devices, < 6.4.50', async () => {
            controller.version = '6.4.49';

            mockedAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [{ mac: macAddress }]
                    }
                })
            );

            const res = await devices.list();

            expect(mockedAxios.get).toHaveBeenCalledWith('/stat/device');
            expect(Array.isArray(res)).toBeTruthy();
            expect(res[0].toJSON()).toStrictEqual({ mac: macAddress, _productLine: 'NETWORK' });
            // expect(mapDeviceMock).toHaveBeenCalledTimes(1);
            // expect(mapDeviceMock).toHaveBeenCalledWith({ mac: macAddress });
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
            // expect(mapDeviceMock).not.toHaveBeenCalled();
        });
    });
    // describe('mapDevice', () => {
    //     const data: Array<[ENetworkDeviceType | string | null, typeof BaseNetworkDevice]> = [
    //         [null, BaseNetworkDevice],
    //         ['any unknown device', BaseNetworkDevice],
    //         [ENetworkDeviceType.UAP, UAPDevice],
    //         [ENetworkDeviceType.UBB, UBBDevice],
    //         [ENetworkDeviceType.UDM, UDMDevice],
    //         [ENetworkDeviceType.UGW, UGWDevice],
    //         [ENetworkDeviceType.USW, USWDevice],
    //         [ENetworkDeviceType.UXG, UXGDevice]
    //     ];
    //     it.each(data)('should construct correct object with type %s', (type, instance) => {
    //         // @ts-ignore
    //         const res = devices.mapDevice({
    //             // @ts-ignore
    //             type,
    //             mac: macAddress
    //         });
    //
    //         expect(res).toBeInstanceOf(instance);
    //         expect(res.type).toBe(type);
    //         expect(res.mac).toBe(macAddress);
    //     });
    // });
});
