export interface INetwork {
    _id: string;
    name?: string;
    enabled?: boolean;
    attr_hidden_id?: string;
    attr_no_delete?: boolean;
    site_id?: string;
    purpose?: string;
    setting_preference?: string;
    mac_override_enabled?: boolean;
    wan_load_balance_type?: string;
    wan_dns1?: string;
    wan_dns2?: string;
    wan_networkgroup?: string;
    wan_type_v6?: string;
    wan_provider_capabilities?: object;
    wan_smartq_enabled?: boolean;
    wan_dns_preference?: string;
    mac_override?: string;
    wan_load_balance_weight?: number;
    report_wan_event?: boolean;
    wan_type?: string;
    igmp_proxy_upstream?: boolean;
    dhcpd_leasetime?: number;
    igmp_snooping?: boolean;
    dhcpguard_enabled?: boolean;
    dhcpd_gateway_enabled?: boolean;
    dhcpd_time_offset_enabled?: boolean;
    dhcpd_dns_1?: string;
    dhcpd_start?: string;
    dhcpd_unifi_controller?: string;
    ipv6_ra_enabled?: boolean;
    dhcpd_stop?: string;
    domain_name?: string;
    dhcpd_enabled?: boolean;
    ip_subnet?: string;
    dhpcd_wpad_url?: string;
    ipv6_interface_type?: string;
    dhpcd_dns_2?: string;
    networkgroup?: string;
    dhpcd_dns_3?: string;
    vlan_enabled?: boolean;
    is_nat?: boolean;
    dhcpdv6_enabled?: boolean;
    dhcpd_dns_enabled?: boolean;
    gateway_type?: string;
    dhcpd_relay_enabled?: boolean;
    dhcpd_boot_enabled?: boolean;
    igmp_proxy_downstream?: boolean;
    upnp_lan_enabled?: boolean;
    dhcpd_ntp_enabled?: boolean;
    mdns_enabled?: boolean;
    lte_lan_enabled?: boolean;
    dhpcd_tftp_server?: string;
    auto_scale_enabled?: boolean;
    vlan?: number;
    l2tp_allow_weak_ciphers?: boolean;
    l2tp_local_wan_ip?: string;
    vpn_type?: string;
    radiusprofile_id?: string;
    dhpcd_wins_enabled?: boolean;
    require_mschapv2?: boolean;
    l2tp_interface?: string;
    exposed_to_site_vpn?: boolean;
    x_ipsec_pre_shared_key?: string;
}