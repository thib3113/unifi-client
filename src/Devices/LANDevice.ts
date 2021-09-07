import { BaseDevice } from './BaseDevice';
import { ILANDeviceRaw } from './ILANDeviceRaw';
import {
    IConfigNetworkLAN,
    IEthernetOverride,
    IGeoInfo,
    ILEDState,
    INetworkTable,
    IPortOverride,
    ISpeedtestStatus,
    IStorage,
    ITemperature,
    IUnifiCare,
    IUptimeStats,
    IWAN
} from './interfaces';
import { Validate } from '../commons/Validate';
import { IBaseDeviceMandatoryRaw } from './IBaseDeviceRaw';

export class LANDevice extends BaseDevice {
    import(props: Partial<ILANDeviceRaw> & IBaseDeviceMandatoryRaw): this {
        super.import(props);

        if (!Validate.isUndefined(props.jumboframe_enabled)) {
            this.jumboFrameEnabled = props.jumboframe_enabled;
        }
        if (!Validate.isUndefined(props.flowctrl_enabled)) {
            this.flowctrlEnabled = props.flowctrl_enabled;
        }
        if (!Validate.isUndefined(props.stp_version)) {
            this.stpVersion = props.stp_version;
        }
        if (!Validate.isUndefined(props.stp_priority)) {
            this.stpPriority = props.stp_priority;
        }
        if (!Validate.isUndefined(props.power_source_ctrl_enabled)) {
            this.powerSourceCtrlEnabled = props.power_source_ctrl_enabled;
        }
        if (!Validate.isUndefined(props.config_network_lan)) {
            this.configNetworkLAN = props.config_network_lan;
        }
        if (!Validate.isUndefined(props.ethernet_overrides)) {
            this.ethernetOverrides = props.ethernet_overrides;
        }
        if (!Validate.isUndefined(props.usg_caps)) {
            this.usgCaps = props.usg_caps;
        }
        if (!Validate.isUndefined(props.temperatures)) {
            this.temperatures = props.temperatures;
        }
        if (!Validate.isUndefined(props.storage)) {
            this.storage = props.storage;
        }
        if (!Validate.isUndefined(props.ruleset_interfaces)) {
            this.rulesetInterfaces = props.ruleset_interfaces;
        }
        if (!Validate.isUndefined(props.setup_provision_completed)) {
            this.setupProvisionCompleted = props.setup_provision_completed;
        }
        if (!Validate.isUndefined(props.setup_provision_tracking)) {
            this.setupProvisionTracking = props.setup_provision_tracking;
        }
        if (!Validate.isUndefined(props.unifi_care)) {
            this.unifiCare = props.unifi_care;
        }
        if (!Validate.isUndefined(props.port_overrides)) {
            this.portOverrides = props.port_overrides;
        }
        if (!Validate.isUndefined(props.mgmt_network_id)) {
            this.mgmtNetworkId = props.mgmt_network_id;
        }
        if (!Validate.isUndefined(props.hostname)) {
            this.hostname = props.hostname;
        }
        if (!Validate.isUndefined(props.snmp_contact)) {
            this.snmpContact = props.snmp_contact;
        }
        if (!Validate.isUndefined(props.snmp_location)) {
            this.snmpLocation = props.snmp_location;
        }
        if (!Validate.isUndefined(props.lcm_night_mode_begins)) {
            this.lcmNightModeBegins = props.lcm_night_mode_begins;
        }
        if (!Validate.isUndefined(props.lcm_night_mode_ends)) {
            this.lcmNightModeEnds = props.lcm_night_mode_ends;
        }
        if (!Validate.isUndefined(props.lcm_night_mode_enabled)) {
            this.lcmNightModeEnabled = props.lcm_night_mode_enabled;
        }
        if (!Validate.isUndefined(props.uptime_stats)) {
            this.uptimeStats = props.uptime_stats;
        }
        if (!Validate.isUndefined(props.overheating)) {
            this.overheating = props.overheating;
        }
        if (!Validate.isUndefined(props.geo_info)) {
            this.geoInfo = props.geo_info;
        }
        if (!Validate.isUndefined(props.led_state)) {
            this.LEDState = props.led_state;
        }
        if (!Validate.isUndefined(props['speedtest-status'])) {
            this.speedTest = props['speedtest-status'];
        }
        if (!Validate.isUndefined(props['speedtest-status-saved'])) {
            this.speedTestSaved = props['speedtest-status-saved'];
        }
        if (!Validate.isUndefined(props.wan2)) {
            this.wan2 = props.wan2;
        }
        if (!Validate.isUndefined(props.wan1)) {
            this.wan1 = props.wan1;
        }
        if (!Validate.isUndefined(props.network_table)) {
            this.networkTable = props.network_table;
        }
        if (!Validate.isUndefined(props.x_inform_authkey)) {
            this.xInformAuthkey = props.x_inform_authkey;
        }
        if (!Validate.isUndefined(props['wlan-num_sta'])) {
            this.wlanNumSta = props['wlan-num_sta'];
        }
        if (!Validate.isUndefined(props['lan-num_sta'])) {
            this.lanNumSta = props['lan-num_sta'];
        }
        if (!Validate.isUndefined(props['guest-lan-num_sta'])) {
            this.guestLanNumSta = props['guest-lan-num_sta'];
        }
        if (!Validate.isUndefined(props['user-lan-num_sta'])) {
            this.userLanNumSta = props['user-lan-num_sta'];
        }
        if (!Validate.isUndefined(props.anomalies)) {
            this.anomalies = props.anomalies;
        }
        if (!Validate.isUndefined(props.num_desktop)) {
            this.numDesktop = props.num_desktop;
        }
        if (!Validate.isUndefined(props.num_mobile)) {
            this.numMobile = props.num_mobile;
        }
        if (!Validate.isUndefined(props.num_handheld)) {
            this.numHandheld = props.num_handheld;
        }
        if (!Validate.isUndefined(props.total_max_power)) {
            this.totalMaxPower = props.total_max_power;
        }
        if (!Validate.isUndefined(props.dhcp_server_table)) {
            this.DHCPServerTable = props.dhcp_server_table;
        }
        if (!Validate.isUndefined(props.uplink_depth)) {
            this.uplinkDepth = props.uplink_depth;
        }
        return this;
    }

    public updateDevice(payload: Partial<ILANDeviceRaw>): Promise<this> {
        return this._updateDevice(payload);
    }

    public jumboFrameEnabled: boolean;
    public flowctrlEnabled: boolean;
    public stpVersion: string;
    public stpPriority: string;
    public powerSourceCtrlEnabled: boolean;
    public configNetworkLAN?: IConfigNetworkLAN;
    public ethernetOverrides?: Array<IEthernetOverride>;
    public usgCaps?: number;
    public temperatures?: Array<ITemperature>;
    public storage?: Array<IStorage>;
    public rulesetInterfaces?: Record<string, string>;
    public setupProvisionCompleted?: boolean;
    public setupProvisionTracking?: boolean;
    public unifiCare?: IUnifiCare;
    public portOverrides?: Array<IPortOverride>;
    public mgmtNetworkId: string;
    public hostname?: string;
    public snmpContact?: string;
    public snmpLocation?: string;
    public lcmNightModeBegins: string;
    public lcmNightModeEnds: string;
    public lcmNightModeEnabled: boolean;
    public uptimeStats?: IUptimeStats;
    public overheating: boolean;
    public geoInfo?: IGeoInfo;
    public LEDState?: ILEDState;
    public speedTest?: ISpeedtestStatus;
    public speedTestSaved?: boolean;
    public wan2?: IWAN;
    public wan1?: IWAN;
    public networkTable?: Array<INetworkTable>;
    public xInformAuthkey?: string;
    public wlanNumSta?: number;
    public lanNumSta?: number;
    public guestLanNumSta?: number;
    public userLanNumSta?: number;
    public anomalies?: number;
    public numDesktop?: number;
    public numMobile?: number;
    public numHandheld?: number;
    public totalMaxPower?: number;
    public DHCPServerTable?: Array<unknown>;
    public uplinkDepth?: number;
}
