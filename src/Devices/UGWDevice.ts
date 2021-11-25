import { LANDevice } from './LANDevice';
import { EDeviceType } from './EDeviceType';

//use this class for specific functions for UGW
export class UGWDevice extends LANDevice {
    public static type = EDeviceType.UGW;
    public type = EDeviceType.UGW;
}
