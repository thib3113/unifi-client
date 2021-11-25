import { IBaseDeviceMandatoryRaw } from '../IBaseDeviceMandatoryRaw';
import { tDevice } from '../types';
import { EProductLine } from '../EProductLine';
import { BaseDeviceMapper } from './BaseDeviceMapper';
import { ClientError } from '../../Errors';
import { IObjectSubSiteConfigComplete } from '../../commons';
import { OpenAPRError } from '../../Errors/OpenAPR';

export class DeviceMapper {
    static async mapDevice(
        deviceRaw: IBaseDeviceMandatoryRaw,
        productLine: EProductLine,
        config: IObjectSubSiteConfigComplete
    ): Promise<tDevice | undefined> {
        let mapper: new (config: IObjectSubSiteConfigComplete) => BaseDeviceMapper;
        switch (productLine) {
            case EProductLine.ACCESS:
                mapper = (await import('../Access/AccessDeviceMapper')).AccessDeviceMapper;
                break;
            case EProductLine.CONNECT:
                mapper = (await import('../Connect/ConnectDeviceMapper')).ConnectDeviceMapper;
                break;
            case EProductLine.LED:
                mapper = (await import('../LED/LEDDeviceMapper')).LEDDeviceMapper;
                break;
            case EProductLine.NETWORK:
                mapper = (await import('../Network/NetworkDeviceMapper')).NetworkDeviceMapper;
                break;
            case EProductLine.PROTECT:
                mapper = (await import('../Protect/ProtectDeviceMapper')).ProtectDeviceMapper;
                break;
            case EProductLine.TALK:
                mapper = (await import('../Talk/TalkDeviceMapper')).TalkDeviceMapper;
                break;
            default:
                throw new ClientError(`unknown family ${productLine}`);
        }

        try {
            return new mapper(config).mapDevice(deviceRaw);
        } catch (e) {
            if (e instanceof OpenAPRError) {
                console.error(e?.stack);
            } else {
                throw e;
            }
        }
    }
}
