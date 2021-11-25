import { hexColor, IObjectSubSiteConfig } from '../../commons';
import { ClientError, EErrorsCodes } from '../../Errors';
import { IBaseNetworkDeviceRaw } from './IBaseNetworkDeviceRaw';
import { createDebugger } from '../../util';
import {
    EConnectionNetworkName,
    IConfigNetwork,
    IDownlinkTable,
    IEthernetTable,
    ILastUplink,
    ILldpTable,
    IPortTable,
    IStat,
    ISwitchCaps,
    ISysStats,
    ISystemStats,
    IUplink
} from './interfaces';
import { Validate } from '../../commons/Validate';
import { IUnifiResponseEnveloppe } from '../../interfaces';
import { EDeviceStates } from '../EDeviceStates';
import { ENetworkDeviceType } from './ENetworkDeviceType';
import { INetworkLEDsOverrideProps } from './INetworkLEDsOverrideProps';
import { IBaseDeviceMandatoryRaw } from '../IBaseDeviceMandatoryRaw';
import { BaseDevice } from '../BaseDevice';
import { EProductLine } from '../EProductLine';
import { EUpgradeState } from './EUpgradeState';

export class BaseNetworkDevice extends BaseDevice {
    static debug = createDebugger('BaseNetworkDevice');

    public _productLine = EProductLine.NETWORK;

    constructor(config: IObjectSubSiteConfig, props: Partial<IBaseNetworkDeviceRaw> & IBaseDeviceMandatoryRaw) {
        super(config);

        this.mac = props?.mac;
        if (!this.mac) {
            throw new ClientError('mac is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.debug = BaseNetworkDevice.debug.extend(this.mac);
        this.import(props);
    }

    public import(props: Partial<IBaseNetworkDeviceRaw> & IBaseDeviceMandatoryRaw): this {
        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.ip)) {
            this.ip = props.ip;
        }
        if (!Validate.isUndefined(props.model)) {
            this.model = props.model;
        }
        if (!Validate.isUndefined(props.model_in_lts)) {
            this.modelInLTS = props.model_in_lts;
        }
        if (!Validate.isUndefined(props.model_in_eol)) {
            this.modelInEOL = props.model_in_eol;
        }
        if (!Validate.isUndefined(props.type)) {
            this.type = props.type as ENetworkDeviceType;
        }
        if (!Validate.isUndefined(props.version)) {
            this.version = props.version;
        }
        if (!Validate.isUndefined(props.adopted)) {
            this.adopted = props.adopted;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.siteId = props.site_id;
        }
        if (!Validate.isUndefined(props.x_authkey)) {
            this.xAuthkey = props.x_authkey;
        }
        if (!Validate.isUndefined(props.cfgversion)) {
            this.cfgVersion = props.cfgversion;
        }
        if (!Validate.isUndefined(props.syslog_key)) {
            this.syslogKey = props.syslog_key;
        }
        if (!Validate.isUndefined(props.config_network)) {
            this.configNetwork = props.config_network;
        }
        if (!Validate.isUndefined(props.setup_id)) {
            this.setupId = props.setup_id;
        }
        if (!Validate.isUndefined(props.dot1x_portctrl_enabled)) {
            this.dot1xPortctrlEnabled = props.dot1x_portctrl_enabled;
        }
        if (!Validate.isUndefined(props.license_state)) {
            this.licenseState = props.license_state;
        }
        if (!Validate.isUndefined(props.x_fingerprint)) {
            this.xFingerprint = props.x_fingerprint;
        }
        if (!Validate.isUndefined(props.inform_url)) {
            this.informUrl = props.inform_url;
        }
        if (!Validate.isUndefined(props.inform_ip)) {
            this.informIp = props.inform_ip;
        }
        if (!Validate.isUndefined(props.x_aes_gcm)) {
            this.xAesGcm = props.x_aes_gcm;
        }
        if (!Validate.isUndefined(props.required_version)) {
            this.requiredVersion = props.required_version;
        }
        if (!Validate.isUndefined(props.kernel_version)) {
            this.kernelVersion = props.kernel_version;
        }
        if (!Validate.isUndefined(props.architecture)) {
            this.architecture = props.architecture;
        }
        if (!Validate.isUndefined(props.board_rev)) {
            this.boardRevision = props.board_rev;
        }
        if (!Validate.isUndefined(props.manufacturer_id)) {
            this.manufacturerId = props.manufacturer_id;
        }
        if (!Validate.isUndefined(props.model_incompatible)) {
            this.modelIncompatible = props.model_incompatible;
        }
        if (!Validate.isUndefined(props.internet)) {
            this.internet = props.internet;
        }
        if (!Validate.isUndefined(props.ethernet_table)) {
            this.ethernetTable = props.ethernet_table;
        }
        if (!Validate.isUndefined(props.port_table)) {
            this.portTable = props.port_table;
        }
        if (!Validate.isUndefined(props.has_speaker)) {
            this.hasSpeaker = props.has_speaker;
        }
        if (!Validate.isUndefined(props.has_eth1)) {
            this.hasEth1 = props.has_eth1;
        }
        if (!Validate.isUndefined(props.fw_caps)) {
            this.fwCaps = props.fw_caps;
        }
        if (!Validate.isUndefined(props.hw_caps)) {
            this.hwCaps = props.hw_caps;
        }
        if (!Validate.isUndefined(props.wifi_caps)) {
            this.wifiCaps = props.wifi_caps;
        }
        if (!Validate.isUndefined(props.switch_caps)) {
            this.switchCaps = props.switch_caps;
        }
        if (!Validate.isUndefined(props.has_fan)) {
            this.hasFan = props.has_fan;
        }
        if (!Validate.isUndefined(props.has_temperature)) {
            this.hasTemperature = props.has_temperature;
        }
        if (!Validate.isUndefined(props.connected_at)) {
            this.connectedAt = props.connected_at;
        }
        if (!Validate.isUndefined(props.provisioned_at)) {
            this.provisionedAt = props.provisioned_at;
        }
        if (!Validate.isUndefined(props.unsupported)) {
            this.unsupported = props.unsupported;
        }
        if (!Validate.isUndefined(props.unsupported_reason)) {
            this.unsupportedReason = props.unsupported_reason;
        }
        if (!Validate.isUndefined(props.serial)) {
            this.serial = props.serial;
        }
        if (!Validate.isUndefined(props.hash_id)) {
            this.hashId = props.hash_id;
        }
        if (!Validate.isUndefined(props.anon_id)) {
            this.anonId = props.anon_id;
        }
        if (!Validate.isUndefined(props.two_phase_adopt)) {
            this.twoPhaseAdopt = props.two_phase_adopt;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.device_id)) {
            this.deviceId = props.device_id;
        }
        if (!Validate.isUndefined(props.state)) {
            this.state = props.state;
        }
        if (!Validate.isUndefined(props.start_disconnected_millis)) {
            this.startDisconnectedMillis = props.start_disconnected_millis;
        }
        if (!Validate.isUndefined(props.last_seen)) {
            this.lastSeen = props.last_seen;
        }
        if (!Validate.isUndefined(props.known_cfgversion)) {
            this.knownCfgversion = props.known_cfgversion;
        }
        if (!Validate.isUndefined(props.start_connected_millis)) {
            this.startConnectedMillis = props.start_connected_millis;
        }
        if (!Validate.isUndefined(props.min_inform_interval_seconds)) {
            this.minInformIntervalSeconds = props.min_inform_interval_seconds;
        }
        if (!Validate.isUndefined(props.upgradable)) {
            this.upgradable = props.upgradable;
        }
        if (!Validate.isUndefined(props.upgrade_state)) {
            this.upgradeState = props.upgrade_state;
        }
        if (!Validate.isUndefined(props.upgrade_to_firmware)) {
            this.upgradeToFirmware = props.upgrade_to_firmware;
        }
        if (!Validate.isUndefined(props.adoptable_when_upgraded)) {
            this.adoptableWhenUpgraded = props.adoptable_when_upgraded;
        }
        if (!Validate.isUndefined(props.rollupgrade)) {
            this.rollupgrade = props.rollupgrade;
        }
        if (!Validate.isUndefined(props.next_interval)) {
            this.nextInterval = props.next_interval;
        }
        if (!Validate.isUndefined(props.uptime) || !Validate.isUndefined(props._uptime)) {
            this.uptime = props.uptime ?? (props._uptime as number);
        }
        if (!Validate.isUndefined(props.locating)) {
            this.locating = props.locating;
        }
        if (!Validate.isUndefined(props.sys_stats)) {
            this.sysStats = props.sys_stats;
        }
        if (!Validate.isUndefined(props['system-stats'])) {
            this.systemStats = props['system-stats'];
        }
        if (!Validate.isUndefined(props.lldp_table)) {
            this.lldpTable = props.lldp_table;
        }
        if (!Validate.isUndefined(props.displayable_version)) {
            this.displayableVersion = props.displayable_version;
        }
        if (!Validate.isUndefined(props.connection_network_name)) {
            this.connectionNetworkName = props.connection_network_name as EConnectionNetworkName;
        }
        if (!Validate.isUndefined(props.startup_timestamp)) {
            this.startupTimestamp = props.startup_timestamp;
        }
        if (!Validate.isUndefined(props.guest_kicks)) {
            this.guestKicks = props.guest_kicks;
        }
        if (!Validate.isUndefined(props.guest_token)) {
            this.guestToken = props.guest_token;
        }
        if (!Validate.isUndefined(props.uplink)) {
            this.uplink = props.uplink;
        }
        if (!Validate.isUndefined(props.downlink_table)) {
            this.downlinkTable = props.downlink_table;
        }
        if (!Validate.isUndefined(props.connect_request_ip)) {
            this.connectRequestIp = props.connect_request_ip;
        }
        if (!Validate.isUndefined(props.connect_request_port)) {
            this.connectRequestPort = props.connect_request_port;
        }
        if (!Validate.isUndefined(props.prev_non_busy_state)) {
            this.prevNonBusyState = props.prev_non_busy_state;
        }
        if (!Validate.isUndefined(props.stat)) {
            this.stat = props.stat;
        }
        if (!Validate.isUndefined(props.tx_bytes)) {
            this.txBytes = props.tx_bytes;
        }
        if (!Validate.isUndefined(props.rx_bytes)) {
            this.rxBytes = props.rx_bytes;
        }
        if (!Validate.isUndefined(props.bytes)) {
            this.bytes = props.bytes;
        }
        if (!Validate.isUndefined(props.num_sta)) {
            this.numSta = props.num_sta;
        }
        if (!Validate.isUndefined(props['user-wlan-num_sta'])) {
            this.userWLANNumSta = props['user-wlan-num_sta'];
        }
        if (!Validate.isUndefined(props['user-num_sta'])) {
            this.userNumSta = props['user-num_sta'];
        }
        if (!Validate.isUndefined(props['guest-wlan-num_sta'])) {
            this.guestWLANNumSta = props['guest-wlan-num_sta'];
        }
        if (!Validate.isUndefined(props['guest-num_sta'])) {
            this.guestNumSta = props['guest-num_sta'];
        }
        if (!Validate.isUndefined(props.x_has_ssh_hostkey)) {
            this.xHasSshHostkey = props.x_has_ssh_hostkey;
        }
        if (!Validate.isUndefined(props.gateway_mac)) {
            this.gatewayMac = props.gateway_mac;
        }
        if (!Validate.isUndefined(props.x_ssh_hostkey_fingerprint)) {
            this.xSshHostkeyFingerprint = props.x_ssh_hostkey_fingerprint;
        }
        if (!Validate.isUndefined(props.satisfaction)) {
            this.satisfaction = props.satisfaction;
        }
        if (!Validate.isUndefined(props.sys_error_caps)) {
            this.sysErrorCaps = props.sys_error_caps;
        }
        if (!Validate.isUndefined(props.last_uplink)) {
            this.lastUplink = props.last_uplink;
        }
        if (!Validate.isUndefined(props.ssh_session_table)) {
            this.sshSessionTable = props.ssh_session_table;
        }
        if (!Validate.isUndefined(props.led_override)) {
            this.ledOverride = props.led_override;
        }
        if (!Validate.isUndefined(props.led_override_color)) {
            this.ledOverrideColor = props.led_override_color;
        }
        if (!Validate.isUndefined(props.led_override_color_brightness)) {
            this.ledOverrideColorBrightness = props.led_override_color_brightness;
        }
        if (!Validate.isUndefined(props.outdoor_mode_override)) {
            this.outdoorModeOverride = props.outdoor_mode_override;
        }
        if (!Validate.isUndefined(props.lcm_brightness_override)) {
            this.lcmBrightnessOverride = props.lcm_brightness_override;
        }
        if (!Validate.isUndefined(props.lcm_idle_timeout_override)) {
            this.lcmIdleTimeoutOverride = props.lcm_idle_timeout_override;
        }
        if (!Validate.isUndefined(props.default)) {
            this.default = props.default;
        }
        if (!Validate.isUndefined(props.discovered_via)) {
            this.discoveredVia = props.discovered_via;
        }
        if (!Validate.isUndefined(props.adopt_ip)) {
            this.adoptIp = props.adopt_ip;
        }
        if (!Validate.isUndefined(props.adopt_url)) {
            this.adoptUrl = props.adopt_url;
        }
        if (!Validate.isUndefined(props.disabled)) {
            this.disabled = props.disabled;
        }

        return this;
    }

    /**
     *
     * @param type - two options: 'soft' or 'hard', defaults to soft
     *               soft can be used for all devices, requests a plain restart of that device
     *               hard is special for PoE switches and besides the restart also requests a
     *               power cycle on all PoE capable ports. Keep in mind that a 'hard' reboot
     *               does *NOT* trigger a factory-reset.
     */
    public async reboot(type: 'soft' | 'hard' = 'soft'): Promise<boolean> {
        return (
            (
                await this.site.devManager({
                    cmd: 'restart',
                    mac: this.mac.toLowerCase(),
                    reboot_type: type
                })
            ).meta.rc === 'ok'
        );
    }

    // not tested
    public forceProvision(): Promise<unknown> {
        return this.site.devManager({
            cmd: 'force-provision',
            mac: this.mac.toLowerCase()
        });
    }
    /**
     * Override LED mode for a device (using REST)
     */
    public setLedOverride(props: INetworkLEDsOverrideProps): unknown {
        const payload: {
            led_override?: 'on' | 'off' | 'default';
            led_override_color?: hexColor;
            led_override_color_brightness?: number;
        } = {};
        if (Validate.isDefinedNotNull(props.mode)) {
            payload.led_override = props.mode;
        }
        if (props.color) {
            if (!Validate.hexColor(props.color)) {
                throw new ClientError('color need to be in hexadecimal format', EErrorsCodes.BAD_PARAMETERS);
            }
            payload.led_override_color = props.color;
        }
        if (props.brightness) {
            if (!Validate.isNumber(props.brightness) || props.brightness < 0) {
                throw new ClientError('brightness need to be a positive number', EErrorsCodes.BAD_PARAMETERS);
            }
            payload.led_override_color_brightness = props.brightness;
        }

        return this.updateDevice(payload);
    }

    public async locate(locate: boolean = true): Promise<boolean> {
        return (
            (
                await this.site.devManager({
                    mac: this.mac.toLowerCase(),
                    cmd: locate ? 'set-locate' : 'unset-locate'
                })
            ).meta.rc === 'ok'
        );
    }

    public forget(): Promise<boolean> {
        return this.site.forgetDevices(this.mac);
    }

    public updateDevice(payload: Partial<IBaseNetworkDeviceRaw>): Promise<this> {
        return this._updateDevice(payload);
    }

    protected async _updateDevice(payload: unknown): Promise<this> {
        const res = (
            await this.instance.put<IUnifiResponseEnveloppe<Array<IBaseNetworkDeviceRaw>>>('/rest/device/:_id', payload, {
                urlParams: {
                    _id: this._id
                }
            })
        ).data;

        if (res.data.length > 0) {
            this.import(res.data[0]);
        }
        return this;
    }

    public mac: string;
    public _id: string;
    public ip: string;
    public model: string;
    public modelInLTS: boolean;
    public modelInEOL: boolean;
    public type: ENetworkDeviceType;
    public version: string;
    public adopted: boolean;
    public siteId: string;
    public xAuthkey: string;
    public cfgVersion: string;
    public syslogKey: string;
    public configNetwork: IConfigNetwork;
    public setupId: string;
    public dot1xPortctrlEnabled: boolean;
    public licenseState: string;
    public xFingerprint: string;
    public informUrl: string;
    public informIp: string;
    public xAesGcm: boolean;
    public requiredVersion: string;
    public kernelVersion: string;
    public architecture: string;
    public boardRevision: number;
    public manufacturerId: number;
    public modelIncompatible: boolean;
    public internet: boolean;
    public ethernetTable: Array<IEthernetTable>;
    public portTable: Array<IPortTable>;
    public hasSpeaker?: boolean;
    public hasEth1?: boolean;
    public fwCaps: number;
    public hwCaps: number;
    public wifiCaps?: number;
    public switchCaps: ISwitchCaps;
    public hasFan: boolean;
    public hasTemperature: boolean;
    public connectedAt: number;
    public provisionedAt: number;
    public unsupported: boolean;
    public unsupportedReason: number;
    public serial: string;
    public hashId: string;
    public anonId: string;
    public twoPhaseAdopt: boolean;
    public name?: string;
    public deviceId: string;
    public state: EDeviceStates;
    public startDisconnectedMillis: number;
    public lastSeen: number;
    public knownCfgversion: string;
    public startConnectedMillis: number;
    public minInformIntervalSeconds: number;
    public upgradable: boolean;
    public upgradeState?: EUpgradeState;
    public upgradeToFirmware?: string;
    public adoptableWhenUpgraded: boolean;
    public rollupgrade: boolean;
    public nextInterval: number;
    public uptime: number;
    public locating: boolean;
    public sysStats: ISysStats;
    public systemStats: ISystemStats;
    public lldpTable: Array<ILldpTable>;
    public displayableVersion: string;
    public connectionNetworkName: EConnectionNetworkName;
    public startupTimestamp: number;
    public guestKicks?: number;
    public guestToken?: string;
    public uplink: IUplink;
    public downlinkTable: Array<IDownlinkTable>;
    public connectRequestIp: string;
    public connectRequestPort: string;
    public prevNonBusyState: number;
    public stat: IStat;
    public txBytes: number;
    public rxBytes: number;
    public bytes: number;
    public numSta: number;
    public userWLANNumSta?: number;
    public userNumSta: number;
    public guestWLANNumSta?: number;
    public guestNumSta: number;
    public xHasSshHostkey: boolean;
    public gatewayMac?: string;
    public xSshHostkeyFingerprint?: string;
    public satisfaction?: number;
    public sysErrorCaps?: number;
    public lastUplink?: ILastUplink;
    public sshSessionTable?: Array<unknown>;
    public ledOverride?: string;
    public ledOverrideColor?: string;
    public ledOverrideColorBrightness?: number;
    public outdoorModeOverride?: string;
    public lcmBrightnessOverride?: boolean;
    public lcmIdleTimeoutOverride?: boolean;
    public default?: boolean;
    public discoveredVia?: string;
    public adoptIp?: string;
    public adoptUrl?: string;
    public disabled?: boolean;
}
