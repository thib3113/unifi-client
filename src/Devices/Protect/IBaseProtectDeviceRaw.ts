import { ipV4Address, macAddress } from '../../commons';
import { EDeviceStates } from '../EDeviceStates';
import { EDeviceType } from '../EDeviceType';
import { IICon } from '../IICon';
import { IBaseDeviceRaw } from '../IBaseDeviceRaw';

export enum EFirmwareStatus {
    UP_TO_DATE = 'UP_TO_DATE'
}

export interface IBaseProtectDeviceRaw extends IBaseDeviceRaw {
    _id: macAddress;
    connection_network_name: string;
    default: boolean;
    device_type: EDeviceType | string;
    displayable_version: string;
    download_speed_bytes_per_second: number;
    essid: string;
    firmware_status: EFirmwareStatus | string;
    icon_filename: string;
    icon_resolutions: Array<[number, number]>;
    icons: Array<IICon>;
    ip: ipV4Address;
    is_wired: boolean;
    last_seen: number;
    model: string;
    name: string;
    satisfaction: number;
    state: EDeviceStates;
    uplink_mac: macAddress;
    uptime: number;
    version: string;
}
