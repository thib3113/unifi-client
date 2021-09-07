import { LANDevice } from './LANDevice';
import { EDeviceType } from './EDeviceType';

//use this class for specific functions for USW
export class USWDevice extends LANDevice {
    public static type = EDeviceType.USW;
    public type = EDeviceType.USW;
}
