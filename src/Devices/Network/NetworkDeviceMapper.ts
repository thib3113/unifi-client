import { BaseDeviceMapper } from '../mappers/BaseDeviceMapper';
import { tDevice } from '../types';
import { ENetworkDeviceType } from './ENetworkDeviceType';
import { BaseNetworkDevice } from './BaseNetworkDevice';
import { createDebugger } from '../../util';
import { IBaseNetworkDeviceRaw } from './IBaseNetworkDeviceRaw';
import { OpenAPRError } from '../../Errors/OpenAPR';
import { Validate } from '../../commons/Validate';

const debug = createDebugger('NetworkDeviceMapper');
export class NetworkDeviceMapper extends BaseDeviceMapper {
    public async mapDevice(device: IBaseNetworkDeviceRaw): Promise<tDevice> {
        debug('%s seems to be an %s', device.mac, device.type ?? ENetworkDeviceType.UNKNOWN);

        let constructor: typeof BaseNetworkDevice;
        switch (device.type as ENetworkDeviceType) {
            case ENetworkDeviceType.UAP:
                if (Validate.implementsTKeys<{ lte_imei: boolean }>(device, ['lte_imei'])) {
                    //it seems to be a LTE device
                    constructor = (await import('./LTEDevice')).LTEDevice;
                } else {
                    constructor = (await import('./UAPDevice')).UAPDevice;
                }
                break;
            case ENetworkDeviceType.UBB:
                constructor = (await import('./UBBDevice')).UBBDevice;
                break;
            case ENetworkDeviceType.UDM:
                constructor = (await import('./UDMDevice')).UDMDevice;
                break;
            case ENetworkDeviceType.UGW:
                constructor = (await import('./UGWDevice')).UGWDevice;
                break;
            case ENetworkDeviceType.USW:
                constructor = (await import('./USWDevice')).USWDevice;
                break;
            case ENetworkDeviceType.UXG:
                constructor = (await import('./UXGDevice')).UXGDevice;
                break;
            case ENetworkDeviceType.UNKNOWN:
            default:
                if (typeof jest === 'undefined') {
                    console.error(new OpenAPRError(`${device.mac} seems to be a new device for us`));
                }
                constructor = (await import('./BaseNetworkDevice')).BaseNetworkDevice;
                break;
        }

        return this.mapObject<tDevice>(constructor, device);
    }
}
