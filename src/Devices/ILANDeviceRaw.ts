import { IBaseDeviceRaw } from './IBaseDeviceRaw';
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

export interface IRPS {
    power_management_mode: string;
    rps_port_table: Array<IRPSPortTable>;
}

export interface IRPSPortTable {
    port_idx: number;
    name: string;
    port_mode: string;
}

export interface ILANDeviceRaw extends IBaseDeviceRaw {
    jumboframe_enabled: boolean;
    flowctrl_enabled: boolean;
    stp_version: string;
    stp_priority: string;
    power_source_ctrl_enabled: boolean;
    config_network_lan?: IConfigNetworkLAN;
    ethernet_overrides?: Array<IEthernetOverride>;
    usg_caps?: number;
    temperatures?: Array<ITemperature>;
    storage?: Array<IStorage>;
    ruleset_interfaces?: Record<string, string>;
    setup_provision_completed?: boolean;
    setup_provision_tracking?: boolean;
    unifi_care?: IUnifiCare;
    port_overrides?: Array<IPortOverride>;
    mgmt_network_id: string;
    hostname?: string;
    snmp_contact?: string;
    snmp_location?: string;
    lcm_night_mode_begins: string;
    lcm_night_mode_ends: string;
    lcm_night_mode_enabled: boolean;
    uptime_stats?: IUptimeStats;
    overheating: boolean;
    geo_info?: IGeoInfo;
    led_state?: ILEDState;
    'speedtest-status'?: ISpeedtestStatus;
    'speedtest-status-saved'?: boolean;
    wan2?: IWAN;
    wan1?: IWAN;
    network_table?: Array<INetworkTable>;
    x_inform_authkey?: string;
    'wlan-num_sta'?: number;
    'lan-num_sta'?: number;
    'guest-lan-num_sta'?: number;
    'user-lan-num_sta'?: number;
    anomalies?: number;
    num_desktop?: number;
    num_mobile?: number;
    num_handheld?: number;
    total_max_power?: number;
    dhcp_server_table?: Array<unknown>;
    uplink_depth?: number;

    device_domain?: string;
    power_source?: string;
    power_source_voltage?: string;
    general_temperature?: number;
    rps?: IRPS;
}
