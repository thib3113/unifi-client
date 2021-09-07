import { dateInput, ipV4Address, ipv4CIDR, macAddress, netMask } from '../commons/types';

// NEED TO BE COMPLETED AND IMPROVED

export interface IAccMeterStats {
    x: number;
    y: number;
    z: number;
}

export interface IAntennaTable {
    default: boolean;
    id: number;
    name: string;
    ra0_gain: number;
    rai0_gain: number;
}

export interface IConfigNetwork {
    type: EConfigNetworkType | string;
    ip: string;
    netmask?: netMask;
    gateway?: ipV4Address;
    dns1?: string;
    dns2?: string;
    dnssuffix?: string;
}

export enum EConfigNetworkType {
    DHCP = 'dhcp',
    STATIC = 'static'
}

export interface IConfigNetworkLAN {
    cidr: ipv4CIDR;
    dhcp_enabled: boolean;
    dhcp_range_start: string;
    dhcp_range_stop: string;
    vlan: number;
}

export enum EConnectionNetworkName {
    LAN = 'LAN',
    WAN = 'WAN',
    WaN2 = 'WAN2'
}

export interface IDownlinkTable {
    mac: macAddress;
    port_idx: number;
    speed: number;
    full_duplex: boolean;
}

export interface IEthernetOverride {
    ifname: string;
    networkgroup: EConnectionNetworkName | string;
}

export interface IEthernetTable {
    mac: string;
    num_port?: number;
    name: string;
}

export interface IGeoInfo {
    WAN2?: IGeoInfoWAN;
    WAN?: IGeoInfoWAN;
}

export interface IGeoInfoWAN {
    accuracy: number;
    address: string;
    asn: number;
    city: string;
    continent_code: string;
    country_code: string;
    country_name: string;
    isp_name: string;
    isp_organization: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface ILastUplink {
    uplink_mac: string;
    uplink_remote_port: number;
    port_idx: number;
    type: ELastUplinkType | string;
}

export enum ELastUplinkType {
    WIRE = 'wire'
}

export interface ILEDState {
    pattern: string;
    tempo: number;
}

export enum ELicenseState {
    Registered = 'registered'
}

export interface ILldpTable {
    chassis_id: string;
    is_wired: boolean;
    local_port_idx: number;
    local_port_name: string;
    port_id: string;
    chassis_descr?: string;
    port_descr?: string;
}

export interface INetworkTable {
    _id: string;
    attr_no_delete?: boolean;
    attr_hidden_id?: EConnectionNetworkName | string;
    name: string;
    site_id: string;
    vlan_enabled: boolean;
    purpose: string;
    ip_subnet: string;
    ipv6_interface_type: string;
    domain_name?: string;
    is_nat: boolean;
    dhcpd_enabled: boolean;
    dhcpd_start: string;
    dhcpd_stop: string;
    dhcpdv6_enabled?: boolean;
    ipv6_ra_enabled?: boolean;
    lte_lan_enabled?: boolean;
    networkgroup: EConnectionNetworkName | string;
    dhcpd_leasetime: number;
    dhcpd_dns_enabled: boolean;
    dhcpd_gateway_enabled: boolean;
    dhcpd_time_offset_enabled: boolean;
    ipv6_pd_start?: string;
    ipv6_pd_stop?: string;
    gateway_type: string;
    dhcpd_dns_1?: string;
    dhcpd_dns_2?: string;
    dhcpd_unifi_controller?: string;
    enabled: boolean;
    dhcp_relay_enabled: boolean;
    ipv6_pd_interface?: EBr0;
    ipv6_ra_priority?: string;
    ipv6_ra_valid_lifetime?: number;
    ipv6_ra_preferred_lifetime?: number;
    dhcpdv6_leasetime?: number;
    dhcpdv6_dns_auto?: boolean;
    upnp_lan_enabled?: boolean;
    dhcpd_ntp_enabled?: boolean;
    dhcpd_ntp_1?: string;
    dhcpd_ntp_2?: string;
    ipv6_subnet?: string;
    dhcpdv6_start?: string;
    dhcpdv6_stop?: string;
    dhcpdv6_dns_1?: string;
    dhcpdv6_dns_2?: string;
    auto_scale_enabled?: boolean;
    dhcpd_boot_enabled?: boolean;
    dhcpd_tftp_server?: string;
    dhcpguard_enabled?: boolean;
    dhcpd_wpad_url?: string;
    igmp_snooping?: boolean;
    dhcpdv6_dns_4?: string;
    dhcpdv6_dns_3?: string;
    ipv6_pd_prefixid?: string;
    dhcpd_boot_server?: string;
    dhcpd_boot_filename?: string;
    nat_outbound_ip_addresses?: Array<unknown>;
    dhcpd_dns_3?: string;
    is_guest: boolean;
    ip: string;
    mac: string;
    up: boolean;
    active_dhcp_lease_count: number;
    gateway_interface_name: string;
    dpistats_table: IDpistatsTable;
    num_sta: number;
    rx_bytes: number;
    rx_packets: number;
    tx_bytes: number;
    tx_packets: number;
    vlan?: string;
}

export interface IDpistatsTable {
    last_updated: number;
    by_cat: Array<IByCat>;
    by_app: Array<IByApp>;
}

export interface IByApp {
    app: number;
    cat: number;
    clients: Array<IClient>;
    known_clients: number;
    rx_bytes: number;
    tx_bytes: number;
    rx_packets: number;
    tx_packets: number;
}

export interface IClient {
    mac: macAddress;
    rx_bytes: number;
    tx_bytes: number;
    rx_packets: number;
    tx_packets: number;
}

export interface IByCat {
    cat: number;
    apps: Array<number>;
    rx_bytes: number;
    tx_bytes: number;
    rx_packets: number;
    tx_packets: number;
}

export enum EBr0 {
    LAN = 'lan',
    WAN = 'wan',
    Wan2 = 'wan2'
}

export interface IPortOverride {
    port_idx: number;
    portconf_id?: string;
    op_mode?: EOpMode;
    port_security_mac_address?: Array<unknown>;
    aggregate_num_ports?: number;
    autoneg?: boolean;
}

export enum EOpMode {
    AGGREGATE = 'aggregate',
    MIRROR = 'mirror',
    SWITCH = 'switch'
}

export interface IPortTable {
    port_idx: number;
    media: EMedia | string;
    port_poe: boolean;
    speed_caps: number;
    op_mode: EOpMode | string;
    portconf_id: string;
    autoneg: boolean;
    enable: boolean;
    flowctrl_rx: boolean;
    flowctrl_tx: boolean;
    full_duplex: boolean;
    is_uplink: boolean;
    mac?: string;
    name: string;
    num_port?: number;
    rx_broadcast: number;
    rx_bytes: number;
    rx_dropped: number;
    rx_errors: number;
    rx_multicast: number;
    rx_packets: number;
    rx_rate?: number;
    'rx_rate-max'?: number;
    speed: number;
    tx_broadcast: number;
    tx_bytes: number;
    tx_dropped: number;
    tx_errors: number;
    tx_multicast: number;
    tx_packets: number;
    tx_rate?: number;
    'tx_rate-max'?: number;
    type?: EPortTableType | string;
    up: boolean;
    ifname?: string;
    'tx_bytes-r': number;
    'rx_bytes-r': number;
    'bytes-r': number;
    port_delta?: IPortDelta;
    network_name?: EBr0 | string;
    masked: boolean;
    aggregated_by: boolean | number;
    mac_table?: Array<IMACTable>;
    ip?: string;
    netmask?: netMask;
    dns?: Array<string>;
    poe_caps?: number;
    dot1x_mode?: EDot1XMode | string;
    dot1x_status?: EDot1XStatus | string;
    jumbo?: boolean;
    satisfaction?: number;
    satisfaction_reason?: number;
    stp_pathcost?: number;
    stp_state?: EDot1XStatus | string;
    poe_mode?: string;
    poe_enable?: boolean;
    poe_voltage?: string;
    aggregate_num_ports?: number;
    anomalies?: number;
    lacp_state?: Array<ILACPState>;
    lag_member?: boolean;
    partner_system_id?: string;
    service_mac_table?: Array<IServiceMACTable>;
    port_security_mac_address?: Array<unknown>;
    sfp_found?: boolean;
    sfp_compliance?: string;
    sfp_current?: string;
    sfp_part?: string;
    sfp_rev?: string;
    sfp_rxfault?: boolean;
    sfp_rxpower?: string;
    sfp_serial?: string;
    sfp_temperature?: string;
    sfp_txfault?: boolean;
    sfp_txpower?: string;
    sfp_vendor?: string;
    sfp_voltage?: string;
    poe_class?: string;
    poe_current?: string;
    poe_good?: boolean;
    poe_power?: string;
}

export enum EDot1XMode {
    Unknown = 'unknown'
}

export enum EDot1XStatus {
    Disabled = 'disabled',
    Forwarding = 'forwarding'
}

export interface ILACPState {
    active: boolean;
    member_port: number;
    speed: number;
}

export interface IMACTable {
    age: number;
    authorized: boolean;
    hostname: string;
    ip: ipV4Address;
    lastReachable: number;
    mac: macAddress;
}

export enum EMedia {
    GE = 'GE',
    SFP = 'SFP',
    SFP_PLUS = 'SFP+'
}

export interface IPortDelta {
    time_delta: number;
    time_delta_activity: number;
}

export interface IServiceMACTable {
    mac: string;
}

export enum EPortTableType {
    Ethernet = 'ethernet'
}

export interface IRadioTable {
    radio: string;
    name: string;
    channel?: number | string;
    ht?: string;
    tx_power_mode?: string;
    max_txpower: number;
    min_txpower: number;
    nss: number;
    min_rssi_enabled?: boolean;
    sens_level_enabled?: boolean;
    hard_noise_floor_enabled?: boolean;
    vwire_enabled?: boolean;
    radio_caps: number;
    radio_caps2: number;
    builtin_antenna: boolean;
    builtin_ant_gain: number;
    antenna_gain?: number;
    loadbalance_enabled?: boolean;
    current_antenna_gain: number;
    is_11ac?: boolean;
    has_dfs?: boolean;
    has_fccdfs?: boolean;
    has_ht160?: boolean;
    backup_channel?: number;
    is_11ax?: boolean;
}

export enum ERadio {
    Na = 'na',
    Ng = 'ng'
}

export interface IRadioTableStat {
    name: string;
    channel: number;
    radio: ERadio | string;
    ast_txto: null;
    ast_cst: null;
    ast_be_xmit: number | null;
    cu_total: number;
    cu_self_rx: number;
    cu_self_tx: number;
    gain: number;
    satisfaction: number;
    state: EState | string;
    extchannel: number;
    tx_power: number;
    tx_packets: number;
    tx_retries: number;
    num_sta: number;
    'guest-num_sta': number;
    'user-num_sta': number;
}

export enum EState {
    Run = 'RUN'
}

export interface IRps {
    power_management_mode: string;
    rps_port_table: Array<IRpsPortTable>;
}

export interface IRpsPortTable {
    port_idx: number;
    name: string;
    port_mode: string;
}

export interface ISpeedtestStatus {
    latency: number;
    rundate: number;
    runtime: number;
    server: ISpeedTestServer;
    source_interface: string;
    status_download: number;
    status_ping: number;
    status_summary: number;
    status_upload: number;
    xput_download: number;
    xput_upload: number;
}

export interface ISpeedTestServer {
    cc: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
    provider: string;
    provider_url: string;
}

export interface IStat {
    gw?: IGw;
    sw?: ISw;
    ap?: IApClass;
}

export interface IApClass {
    site_id: string;
    o: string;
    oid: string;
    ap: string;
    time: number;
    datetime: Date;
    'user-rai0-rx_packets': number;
    'user-ra0-rx_packets': number;
    'user-rx_packets': number;
    'guest-rx_packets': number;
    'ra0-rx_packets': number;
    'rai0-rx_packets': number;
    rx_packets: number;
    'user-rai0-rx_bytes': number;
    'user-ra0-rx_bytes': number;
    'user-rx_bytes': number;
    'guest-rx_bytes': number;
    'ra0-rx_bytes': number;
    'rai0-rx_bytes': number;
    rx_bytes: number;
    'user-rai0-rx_errors': number;
    'user-ra0-rx_errors': number;
    'user-rx_errors': number;
    'guest-rx_errors': number;
    'ra0-rx_errors': number;
    'rai0-rx_errors': number;
    rx_errors: number;
    'user-rai0-rx_dropped': number;
    'user-ra0-rx_dropped': number;
    'user-rx_dropped': number;
    'guest-rx_dropped': number;
    'ra0-rx_dropped': number;
    'rai0-rx_dropped': number;
    rx_dropped: number;
    'user-rai0-rx_crypts': number;
    'user-ra0-rx_crypts': number;
    'user-rx_crypts': number;
    'guest-rx_crypts': number;
    'ra0-rx_crypts': number;
    'rai0-rx_crypts': number;
    rx_crypts: number;
    'user-rai0-rx_frags': number;
    'user-ra0-rx_frags': number;
    'user-rx_frags': number;
    'guest-rx_frags': number;
    'ra0-rx_frags': number;
    'rai0-rx_frags': number;
    rx_frags: number;
    'user-rai0-tx_packets': number;
    'user-ra0-tx_packets': number;
    'user-tx_packets': number;
    'guest-tx_packets': number;
    'ra0-tx_packets': number;
    'rai0-tx_packets': number;
    tx_packets: number;
    'user-rai0-tx_bytes': number;
    'user-ra0-tx_bytes': number;
    'user-tx_bytes': number;
    'guest-tx_bytes': number;
    'ra0-tx_bytes': number;
    'rai0-tx_bytes': number;
    tx_bytes: number;
    'user-rai0-tx_errors': number;
    'user-ra0-tx_errors': number;
    'user-tx_errors': number;
    'guest-tx_errors': number;
    'ra0-tx_errors': number;
    'rai0-tx_errors': number;
    tx_errors: number;
    'user-rai0-tx_dropped': number;
    'user-ra0-tx_dropped': number;
    'user-tx_dropped': number;
    'guest-tx_dropped': number;
    'ra0-tx_dropped': number;
    'rai0-tx_dropped': number;
    tx_dropped: number;
    'user-rai0-tx_retries': number;
    'user-ra0-tx_retries': number;
    'user-tx_retries': number;
    'guest-tx_retries': number;
    'ra0-tx_retries': number;
    'rai0-tx_retries': number;
    tx_retries: number;
    'user-rai0-mac_filter_rejections': number;
    'user-ra0-mac_filter_rejections': number;
    'user-mac_filter_rejections': number;
    'guest-mac_filter_rejections': number;
    'ra0-mac_filter_rejections': number;
    'rai0-mac_filter_rejections': number;
    mac_filter_rejections: number;
    'user-rai0-wifi_tx_attempts': number;
    'user-ra0-wifi_tx_attempts': number;
    'user-wifi_tx_attempts': number;
    'guest-wifi_tx_attempts': number;
    'ra0-wifi_tx_attempts': number;
    'rai0-wifi_tx_attempts': number;
    wifi_tx_attempts: number;
    'user-rai0-wifi_tx_dropped': number;
    'user-ra0-wifi_tx_dropped': number;
    'user-wifi_tx_dropped': number;
    'guest-wifi_tx_dropped': number;
    'ra0-wifi_tx_dropped': number;
    'rai0-wifi_tx_dropped': number;
    wifi_tx_dropped: number;
    bytes: number;
    duration: number;
    'user-ra0-ra0-5f494127055b2304e2505485-rx_packets'?: number;
    'user-ra0-ra0-5f494127055b2304e2505485-rx_bytes'?: number;
    'user-ra0-ra0-5f494127055b2304e2505485-tx_packets'?: number;
    'user-ra0-ra0-5f494127055b2304e2505485-tx_bytes'?: number;
    'user-ra0-ra0-5f494127055b2304e2505485-wifi_tx_attempts'?: number;
    'user-ra0-ra0-5f494127055b2304e2505485-rx_dropped'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-rx_packets'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-rx_bytes'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-tx_packets'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-tx_bytes'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-wifi_tx_attempts'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-rx_packets'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-rx_bytes'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-rx_dropped'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-tx_packets'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-tx_bytes'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-wifi_tx_attempts'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-tx_retries'?: number;
    'user-ra0-ra1-5f497051055b2304e250598d-rx_packets'?: number;
    'user-ra0-ra1-5f497051055b2304e250598d-rx_bytes'?: number;
    'user-ra0-ra1-5f497051055b2304e250598d-tx_packets'?: number;
    'user-ra0-ra1-5f497051055b2304e250598d-tx_bytes'?: number;
    'user-ra0-ra1-5f497051055b2304e250598d-wifi_tx_attempts'?: number;
    'user-rai0-rai1-5f497051055b2304e250598d-wifi_tx_dropped'?: number;
    'user-ra0-ra0-5f494127055b2304e2505485-rx_errors'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-tx_retries'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-wifi_tx_dropped'?: number;
    'user-rai0-rai0-5f494127055b2304e2505485-rx_errors'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-rx_packets'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-rx_bytes'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-rx_packets'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-rx_bytes'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-tx_packets'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-tx_bytes'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-wifi_tx_attempts'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-rx_packets'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-rx_bytes'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-rx_errors'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-tx_packets'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-tx_bytes'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-wifi_tx_attempts'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-tx_packets'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-tx_bytes'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-tx_retries'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-wifi_tx_attempts'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-wifi_tx_dropped'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-rx_errors'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-tx_retries'?: number;
    'user-rai0-rai1-600962f9d5d92e03f8d24c21-rx_packets'?: number;
    'user-rai0-rai1-600962f9d5d92e03f8d24c21-rx_bytes'?: number;
    'user-rai0-rai1-600962f9d5d92e03f8d24c21-tx_packets'?: number;
    'user-rai0-rai1-600962f9d5d92e03f8d24c21-tx_bytes'?: number;
    'user-rai0-rai1-600962f9d5d92e03f8d24c21-wifi_tx_attempts'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-tx_retries'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-wifi_tx_dropped'?: number;
    'user-rai0-rai2-60180460d5d92e03f8d48ac6-rx_packets'?: number;
    'user-rai0-rai2-60180460d5d92e03f8d48ac6-rx_bytes'?: number;
    'user-rai0-rai2-60180460d5d92e03f8d48ac6-tx_packets'?: number;
    'user-rai0-rai2-60180460d5d92e03f8d48ac6-tx_bytes'?: number;
    'user-rai0-rai2-60180460d5d92e03f8d48ac6-wifi_tx_attempts'?: number;
    'user-rai0-rai2-60180460d5d92e03f8d48ac6-tx_retries'?: number;
    'user-rai0-rai1-600962f9d5d92e03f8d24c21-tx_retries'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-wifi_tx_dropped'?: number;
    'user-ra0-ra1-600962e0d5d92e03f8d24c20-rx_dropped'?: number;
    'user-ra0-ra0-6009620ed5d92e03f8d24bf3-rx_dropped'?: number;
    'user-rai0-rai0-6009620ed5d92e03f8d24bf3-rx_dropped'?: number;
}

export interface IGw {
    site_id: string;
    o: string;
    oid: string;
    gw: string;
    time: number;
    datetime: dateInput;
    duration: number;
    'wan2-rx_packets': number;
    'wan2-rx_bytes': number;
    'wan2-tx_packets': number;
    'wan2-tx_bytes': number;
    'lan-rx_packets': number;
    'lan-rx_bytes': number;
    'lan-tx_packets': number;
    'lan-tx_bytes': number;
    'wan2-rx_errors'?: number;
    'wan-rx_packets'?: number;
    'wan-rx_bytes'?: number;
    'wan-tx_packets'?: number;
    'wan-tx_bytes'?: number;
}

export interface ISw {
    site_id: string;
    o: string;
    oid: string;
    sw: string;
    time: number;
    datetime: dateInput;
    rx_packets: number;
    rx_bytes: number;
    rx_errors: number;
    rx_dropped: number;
    rx_crypts: number;
    rx_frags: number;
    tx_packets: number;
    tx_bytes: number;
    tx_errors: number;
    tx_dropped: number;
    tx_retries: number;
    rx_multicast: number;
    rx_broadcast: number;
    tx_multicast: number;
    tx_broadcast: number;
    bytes: number;
    duration: number;
    'port_1-rx_packets': number;
    'port_1-rx_bytes': number;
    'port_1-tx_packets': number;
    'port_1-tx_bytes': number;
    'port_1-rx_multicast'?: number;
    'port_1-rx_broadcast'?: number;
    'port_1-tx_multicast': number;
    'port_1-tx_broadcast': number;
    'port_1-tx_dropped'?: number;
}

export interface IStorage {
    mount_point: string;
    name: string;
    size: number;
    type: string;
    used: number;
}

export interface ISwitchCaps {
    max_mirror_sessions?: number;
    max_aggregate_sessions?: number;
    feature_caps?: number;
    max_l3_intf?: number;
    max_reserved_routes?: number;
    max_static_routes?: number;
}

export interface ISysStats {
    loadavg_1: string;
    loadavg_15: string;
    loadavg_5: string;
    mem_buffer: number;
    mem_total: number;
    mem_used: number;
}

export interface ISystemStats {
    cpu: string;
    mem: string;
    uptime: string;
}

export interface ITemperature {
    name: string;
    type: string;
    value: number;
}

export enum EWANDeviceType {
    Uap = 'uap',
    Udm = 'udm',
    Usw = 'usw'
}

export interface IUnifiCare {
    state: string;
    registration: number;
    activation_end: null;
    activation_url: null;
    coverage_start: null;
    coverage_end: null;
    rma_url: null;
    tracking_url: null;
    activation_dismissed: null;
}

export interface IUplink {
    drops?: number;
    ip: string;
    latency?: number;
    name: string;
    nameservers?: Array<string>;
    netmask: netMask;
    num_port: number;
    rx_bytes: number;
    rx_dropped: number;
    rx_errors: number;
    rx_multicast: number;
    rx_packets: number;
    speedtest_lastrun?: number;
    speedtest_ping?: number;
    speedtest_status?: string;
    tx_bytes: number;
    tx_dropped: number;
    tx_errors: number;
    tx_packets: number;
    up?: boolean;
    uptime?: number;
    xput_down?: number;
    xput_up?: number;
    port_idx: number;
    media?: EMedia | string;
    speed: number;
    full_duplex: boolean;
    rx_rate?: number;
    tx_rate?: number;
    max_speed: number;
    type: ELastUplinkType | string;
    'tx_bytes-r': number;
    'rx_bytes-r': number;
    'bytes-r'?: number;
    uplink_mac?: string;
    uplink_remote_port?: number;
    mac?: string;
}

export interface IUptimeStats {
    WAN: IUptimeStatsWAN;
    WAN2: IUptimeStatsWAN;
}

export interface IUptimeStatsWAN {
    downtime?: number;
    availability?: number;
    latency_average?: number;
    time_period?: number;
}

export interface IVapTable {
    anomalies_bar_chart: Record<string, number>;
    anomalies_bar_chart_now: Record<string, number>;
    avg_client_signal: number;
    bssid: string;
    bw: number;
    ccq: number;
    channel: number;
    dns_avg_latency: number;
    essid: string;
    extchannel?: number;
    icmp_avg_rtt: number;
    id: string;
    mac_filter_rejections: number;
    name: string;
    num_satisfaction_sta: number;
    num_sta: number;
    radio: ERadio | string;
    radio_name: string;
    reasons_bar_chart: Record<string, number>;
    reasons_bar_chart_now: Record<string, number>;
    rx_bytes: number;
    rx_crypts: number;
    rx_dropped: number;
    rx_errors: number;
    rx_frags: number;
    rx_nwids: number;
    rx_packets: number;
    rx_tcp_stats: IXTCPStats;
    satisfaction: number;
    state: EState | string;
    tx_bytes: number;
    tx_combined_retries: number;
    tx_data_mpdu_bytes: number;
    tx_dropped: number;
    tx_errors: number;
    tx_packets: number;
    tx_power: number;
    tx_retries: number;
    tx_rts_retries: number;
    tx_success: number;
    tx_tcp_stats: IXTCPStats;
    tx_total: number;
    up: boolean;
    usage: EUsage | string;
    wifi_tx_attempts: number;
    wifi_tx_dropped: number;
    t: string;
    wlanconf_id: string;
    is_guest: boolean;
    is_wep: boolean;
    ap_mac: macAddress;
    map_id: null;
    site_id: string;
    wifi_tx_latency_mov?: IWifiTxLatencyMOV;
}

export interface IXTCPStats {
    goodbytes: number;
    lat_avg: number;
    lat_max: number;
    lat_min: number;
    lat_samples: number;
    lat_sum: number;
    stalls: number;
}

export enum EUsage {
    User = 'user'
}

export interface IWifiTxLatencyMOV {
    avg: number;
    max: number;
    min: number;
    total: number;
    total_count: number;
}

export interface IWAN {
    max_speed: number;
    type: EPortTableType | string;
    autoneg: boolean;
    enable: boolean;
    flowctrl_rx: boolean;
    flowctrl_tx: boolean;
    full_duplex: boolean;
    is_uplink: boolean;
    mac: string;
    media: EMedia | string;
    name: string;
    num_port: number;
    port_idx: number;
    port_poe: boolean;
    rx_broadcast: number;
    rx_bytes: number;
    rx_dropped: number;
    rx_errors: number;
    rx_multicast: number;
    rx_packets: number;
    'rx_rate-max': number;
    speed: number;
    speed_caps: number;
    tx_broadcast: number;
    tx_bytes: number;
    tx_dropped: number;
    tx_errors: number;
    tx_multicast: number;
    tx_packets: number;
    tx_rate: number;
    'tx_rate-max': number;
    up: boolean;
    ifname: string;
    'tx_bytes-r': number;
    'rx_bytes-r': number;
    'bytes-r': number;
    mac_table?: Array<IMACTable>;
    rx_rate?: number;
    ip?: string;
    netmask?: netMask;
    dns?: Array<string>;
}
