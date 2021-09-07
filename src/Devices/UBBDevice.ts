import { LANDevice } from './LANDevice';
import { EDeviceType } from './EDeviceType';

//use this class for specific functions for UBB
export class UBBDevice extends LANDevice {
    public static type = EDeviceType.UBB;
    public type = EDeviceType.UBB;
}
