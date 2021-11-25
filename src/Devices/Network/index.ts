import type { BaseNetworkDevice } from './BaseNetworkDevice';
import type { LANDevice } from './LANDevice';
import type { UAPDevice } from './UAPDevice';
import type { UBBDevice } from './UBBDevice';
import type { UDMDevice } from './UDMDevice';
import type { UGWDevice } from './UGWDevice';
import type { USWDevice } from './USWDevice';
import type { UXGDevice } from './UXGDevice';
import type { LTEDevice } from './LTEDevice';

export * from './BaseNetworkDevice';
export * from './ENetworkDeviceType';
export * from './EUpgradeState';
export * from './IBaseNetworkDeviceRaw';
export * from './ILANDeviceRaw';
export * from './INetworkLEDsOverrideProps';
export * from './interfaces';
export * from './IWLANDeviceRaw';
export * from './LANDevice';
export * from './LTEDevice';
export * from './NetworkDeviceMapper';
export * from './UAPDevice';
export * from './UBBDevice';
export * from './UDMDevice';
export * from './UGWDevice';
export * from './USWDevice';
export * from './UXGDevice';

export type networkDevice =
    | BaseNetworkDevice
    | LANDevice
    | UAPDevice
    | UBBDevice
    | UDMDevice
    | UGWDevice
    | USWDevice
    | UXGDevice
    | LTEDevice;
