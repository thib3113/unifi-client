import { LANDevice } from './LANDevice';
import { ENetworkDeviceType } from './ENetworkDeviceType';

//use this class for specific functions for UXG
export class UXGDevice extends LANDevice {
    public static type = ENetworkDeviceType.UXG;
    public type = ENetworkDeviceType.UXG;
}
