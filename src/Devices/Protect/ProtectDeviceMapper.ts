import { BaseDeviceMapper } from '../mappers/BaseDeviceMapper';
import { tDevice } from '../types';
import { IBaseProtectDeviceRaw } from './IBaseProtectDeviceRaw';
import { CameraDevice } from './CameraDevice';

export class ProtectDeviceMapper extends BaseDeviceMapper {
    public async mapDevice(rawDevice: IBaseProtectDeviceRaw): Promise<tDevice> {
        //for the moment, I found only camera here ... (not the NVR pro)
        return this.mapObject<CameraDevice>(CameraDevice, rawDevice);
    }
}
