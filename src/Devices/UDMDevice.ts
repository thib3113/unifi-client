import { LANDevice } from './LANDevice';
import { EDeviceType } from './EDeviceType';

//use this class for specific functions for UDM
export class UDMDevice extends LANDevice {
    public static type = EDeviceType.UDM;
    public type = EDeviceType.UDM;
}
