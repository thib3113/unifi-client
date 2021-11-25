import { LANDevice } from './LANDevice';
import { ENetworkDeviceType } from './ENetworkDeviceType';

//use this class for specific functions for UDM
export class UDMDevice extends LANDevice {
    public static type = ENetworkDeviceType.UDM;
    public type = ENetworkDeviceType.UDM;
}
