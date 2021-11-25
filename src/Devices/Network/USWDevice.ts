import { LANDevice } from './LANDevice';
import { ENetworkDeviceType } from './ENetworkDeviceType';

//use this class for specific functions for USW
export class USWDevice extends LANDevice {
    public static type = ENetworkDeviceType.USW;
    public type = ENetworkDeviceType.USW;
}
