import {
    EConnectionNetworkName,
    IConfigNetwork,
    IDownlinkTable,
    IEthernetOverride,
    IEthernetTable,
    ILastUplink,
    ILldpTable,
    IPortTable,
    IRadioTable,
    IRadioTableStat,
    IStat,
    ISwitchCaps,
    ISysStats,
    ISystemStats,
    IUplink,
    IVapTable
} from './interfaces';
import { ENetworkDeviceType } from './ENetworkDeviceType';
import { EDeviceType } from '../EDeviceType';
import { IBaseDeviceRaw } from '../IBaseDeviceRaw';

export interface IBaseNetworkDeviceRaw extends IBaseDeviceRaw {
    _id: string;
    ip: string;
    model: string;
    model_in_lts: boolean;
    model_in_eol: boolean;
    type: ENetworkDeviceType | string;
    version: string;
    adopted: boolean;
    site_id: string;
    x_authkey: string;
    cfgversion: string;
    syslog_key: string;
    config_network: IConfigNetwork;
    setup_id: string;
    dot1x_portctrl_enabled: boolean;
    license_state: string;
    x_fingerprint: string;
    inform_url: string;
    inform_ip: string;
    x_aes_gcm: boolean;
    required_version: string;
    kernel_version: string;
    architecture: string;
    board_rev: number;
    manufacturer_id: number;
    model_incompatible: boolean;
    internet: boolean;
    ethernet_table: Array<IEthernetTable>;
    port_table: Array<IPortTable>;
    has_speaker?: boolean;
    has_eth1?: boolean;
    fw_caps: number;
    hw_caps: number;
    wifi_caps?: number;
    switch_caps: ISwitchCaps;
    has_fan: boolean;
    has_temperature: boolean;
    connected_at: number;
    provisioned_at: number;
    unsupported: boolean;
    unsupported_reason: number;
    serial: string;
    hash_id: string;
    anon_id: string;
    two_phase_adopt: boolean;
    name?: string;
    device_id: string;
    state: number;
    start_disconnected_millis: number;
    last_seen: number;
    known_cfgversion: string;
    start_connected_millis: number;
    min_inform_interval_seconds: number;
    upgradable: boolean;
    upgrade_to_firmware?: string;
    adoptable_when_upgraded: boolean;
    rollupgrade: boolean;
    next_interval: number;
    uptime: number;
    _uptime: number;
    locating: boolean;
    sys_stats: ISysStats;
    'system-stats': ISystemStats;
    lldp_table: Array<ILldpTable>;
    displayable_version: string;
    connection_network_name: EConnectionNetworkName | string;
    startup_timestamp: number;
    guest_kicks?: number;
    guest_token?: string;
    uplink: IUplink;
    downlink_table: Array<IDownlinkTable>;
    connect_request_ip: string;
    connect_request_port: string;
    prev_non_busy_state: number;
    stat: IStat;
    tx_bytes: number;
    rx_bytes: number;
    bytes: number;
    num_sta: number;
    'user-wlan-num_sta'?: number;
    'user-num_sta': number;
    'guest-wlan-num_sta'?: number;
    'guest-num_sta': number;
    x_has_ssh_hostkey: boolean;
    gateway_mac?: string;
    x_ssh_hostkey_fingerprint?: string;
    satisfaction?: number;
    sys_error_caps?: number;
    last_uplink?: ILastUplink;
    ssh_session_table?: Array<unknown>;
    led_override?: string;
    led_override_color?: string;
    led_override_color_brightness?: number;
    outdoor_mode_override?: string;
    lcm_brightness_override?: boolean;
    lcm_idle_timeout_override?: boolean;
    default?: boolean;
    discovered_via?: string;
    adopt_ip?: string;
    adopt_url?: string;
    disabled?: boolean;

    // new in v2 call
    device_type?: EDeviceType | string;
    lte_connected?: boolean;
    ethernet_overrides?: Array<IEthernetOverride>;
    radio_table?: Array<IRadioTable>;
    radio_table_stats?: Array<IRadioTableStat>;
    restarting?: boolean;
    spectrum_scanning?: boolean;
    upgrade_state?: number;
    vap_table?: Array<IVapTable>;
    wlan_overrides?: Array<unknown>;
}
