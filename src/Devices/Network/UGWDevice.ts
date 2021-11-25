import { LANDevice } from './LANDevice';
import { ENetworkDeviceType } from './ENetworkDeviceType';

//use this class for specific functions for UGW
export class UGWDevice extends LANDevice {
    public static type = ENetworkDeviceType.UGW;
    public type = ENetworkDeviceType.UGW;
}
