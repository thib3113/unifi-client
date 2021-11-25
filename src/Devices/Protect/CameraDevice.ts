import { ClientError, EErrorsCodes } from '../../Errors';
import { createDebugger } from '../../util';
import { EDeviceStates } from '../EDeviceStates';
import { IBaseDeviceMandatoryRaw } from '../IBaseDeviceMandatoryRaw';
import { BaseDevice } from '../BaseDevice';
import { EProductLine } from '../EProductLine';
import { IBaseProtectDeviceRaw } from './IBaseProtectDeviceRaw';
import { EDeviceType } from '../EDeviceType';
import { IObjectSubSiteConfig, ipV4Address, macAddress } from '../../commons';
import { IICon } from '../IICon';
import { Validate } from '../../commons/Validate';

export class CameraDevice extends BaseDevice {
    static debug = createDebugger('CameraDevice');

    public _productLine = EProductLine.PROTECT;

    constructor(config: IObjectSubSiteConfig, props: Partial<IBaseProtectDeviceRaw> & IBaseDeviceMandatoryRaw) {
        super(config);

        this.mac = props?.mac;
        if (!this.mac) {
            throw new ClientError('mac is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.debug = CameraDevice.debug.extend(this.mac);
        this.import(props);
    }

    public import(props: Partial<IBaseProtectDeviceRaw> & IBaseDeviceMandatoryRaw): this {
        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.connection_network_name)) {
            this.connectionNetworkName = props.connection_network_name;
        }
        if (!Validate.isUndefined(props.default)) {
            this.default = props.default;
        }
        if (!Validate.isUndefined(props.device_type)) {
            this.deviceType = props.device_type;
        }
        if (!Validate.isUndefined(props.displayable_version)) {
            this.displayableVersion = props.displayable_version;
        }
        if (!Validate.isUndefined(props.download_speed_bytes_per_second)) {
            this.downloadSpeedBytesPerSecond = props.download_speed_bytes_per_second;
        }
        if (!Validate.isUndefined(props.upload_speed_bytes_per_second)) {
            this.uploadSpeedBytesPerSecond = props.upload_speed_bytes_per_second;
        }
        if (!Validate.isUndefined(props.essid)) {
            this.essid = props.essid;
        }
        if (!Validate.isUndefined(props.firmware_status)) {
            this.firmwareStatus = props.firmware_status;
        }
        if (!Validate.isUndefined(props.icon_filename)) {
            this.iconFilename = props.icon_filename;
        }
        if (!Validate.isUndefined(props.icon_resolutions)) {
            this.iconResolutions = props.icon_resolutions;
        }
        if (!Validate.isUndefined(props.icons)) {
            this.icons = props.icons;
        }
        if (!Validate.isUndefined(props.ip)) {
            this.ip = props.ip;
        }
        if (!Validate.isUndefined(props.is_wired)) {
            this.isWired = props.is_wired;
        }
        if (!Validate.isUndefined(props.last_seen)) {
            this.lastSeen = props.last_seen;
        }
        if (!Validate.isUndefined(props.model)) {
            this.model = props.model;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.satisfaction)) {
            this.satisfaction = props.satisfaction;
        }
        if (!Validate.isUndefined(props.state)) {
            this.state = props.state;
        }
        if (!Validate.isUndefined(props.uplink_mac)) {
            this.uplinkMac = props.uplink_mac;
        }
        if (!Validate.isUndefined(props.uptime)) {
            this.uptime = props.uptime;
        }
        if (!Validate.isUndefined(props.usage_bytes)) {
            this.usageBytes = props.usage_bytes;
        }
        if (!Validate.isUndefined(props.version)) {
            this.version = props.version;
        }
        return this;
    }

    public _id: macAddress;
    public connectionNetworkName: string;
    public default: boolean;
    public deviceType: EDeviceType | string;
    public displayableVersion: string;
    public downloadSpeedBytesPerSecond: number;
    public uploadSpeedBytesPerSecond: number;
    public essid: string;
    public firmwareStatus: string;
    public iconFilename: string;
    public iconResolutions: Array<[number, number]>;
    public icons: Array<IICon>;
    public ip: ipV4Address;
    public isWired: boolean;
    public lastSeen: number;
    public mac: macAddress;
    public model: string;
    public name: string;
    public satisfaction: number;
    public state: EDeviceStates;
    public uplinkMac: macAddress;
    public uptime: number;
    public usageBytes: number;
    public version: string;
}
