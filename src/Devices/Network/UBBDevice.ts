import { LANDevice } from './LANDevice';
import { ENetworkDeviceType } from './ENetworkDeviceType';

//use this class for specific functions for UBB
export class UBBDevice extends LANDevice {
    public static type = ENetworkDeviceType.UBB;
    public type = ENetworkDeviceType.UBB;
}
