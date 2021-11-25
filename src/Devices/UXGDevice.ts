import { LANDevice } from './LANDevice';
import { EDeviceType } from './EDeviceType';

//use this class for specific functions for UXG
export class UXGDevice extends LANDevice {
    public static type = EDeviceType.UXG;
    public type = EDeviceType.UXG;
}
