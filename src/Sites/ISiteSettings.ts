export interface ISiteSettings {
    _id: string;
    site_id: string;
    key: string;
}
export interface ISiteSettingsNTP extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'ntp';
    ntp_server_1: string;
    ntp_server_2: string;
    ntp_server_3: string;
    ntp_server_4: string;
}
export interface ISiteSettingsGuestAccess extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'guest_access';
    auth: string;
    redirect_https: boolean;
    restricted_subnet_1: string;
    restricted_subnet_2: string;
    restricted_subnet_3: string;
    redirect_url: string;
    portal_enabled: boolean;
    portal_customized_bg_color: string;
    portal_customized_bg_image_enabled: boolean;
    portal_customized_bg_image_tile: boolean;
    portal_customized_box_color: string;
    portal_customized_box_link_color: string;
    portal_customized_box_text_color: string;
    portal_customized_box_opacity: number;
    portal_customized_button_color: string;
    portal_customized_button_text_color: string;
    portal_customized_link_color: string;
    portal_customized_logo_enabled: boolean;
    portal_customized_text_color: string;
    portal_customized_tos: string;
    portal_customized_tos_enabled: boolean;
    portal_customized_welcome_text: string;
    portal_customized_welcome_text_enabled: boolean;
    portal_customized_welcome_text_position: string;
    template_engine: string;
    custom_ip: string;
    x_password: string;
    expire: number;
    expire_number: number;
    expire_unit: number;
    portal_customized: boolean;
    portal_customized_languages: Array<string>;
    redirect_enabled: boolean;
    ec_enabled: boolean;
    portal_hostname: string;
    portal_use_hostname: boolean;
    radius_enabled: boolean;
    radius_auth_type: string;
    radiusprofile_id: string;
    radius_disconnect_enabled: boolean;
    radius_disconnect_port: number;
    payment_enabled: boolean;
    gateway: string;
    authorize_use_sandbox: boolean;
    x_authorize_loginid: string;
    x_authorize_transactionkey: string;
    x_ippay_terminalid: string;
    ippay_use_sandbox: boolean;
    x_merchantwarrior_merchantuuid: string;
    x_merchantwarrior_apikey: string;
    x_merchantwarrior_apipassphrase: string;
    merchantwarrior_use_sandbox: boolean;
    paypal_use_sandbox: boolean;
    x_paypal_username: string;
    x_paypal_password: string;
    x_paypal_signature: string;
    quickpay_testmode: boolean;
    x_quickpay_agreementid: string;
    x_quickpay_apikey: string;
    x_quickpay_merchantid: string;
    x_stripe_api_key: string;
    facebook_enabled: boolean;
    voucher_enabled: boolean;
    wechat_enabled: boolean;
    password_enabled: boolean;
}
export interface ISiteSettingsElementAdopt extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'element_adopt';
    enabled: boolean;
    x_element_essid: string;
    x_element_psk: string;
}
export interface ISiteSettingsConnectivity extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'connectivity';
    enabled: boolean;
    uplink_type: string;
    x_mesh_essid: string;
    x_mesh_psk: string;
    uplink_host: string;
}
export interface ISiteSettingsSuperMail extends ISiteSettings {
    _id: string;
    key: 'super_mail';
    provider: string;
}
export interface ISiteSettingsSuperFingerBank extends ISiteSettings {
    _id: string;
    key: 'super_fingerbank';
    fingerbank_key: string;
}
export interface ISiteSettingsSuperManagement extends ISiteSettings {
    _id: string;
    key: 'super_mgmt';
    discoverable: boolean;
    minimum_usable_hd_space: number;
    autobackup_enabled: boolean;
    autobackup_cron_expr: string;
    autobackup_days: number;
    autobackup_timezone: string;
    enable_analytics: boolean;
    data_retention_time_enabled: boolean;
    data_retention_time_in_hours_for_5minutes_scale: number;
    data_retention_time_in_hours_for_hourly_scale: number;
    data_retention_time_in_hours_for_daily_scale: number;
    data_retention_time_in_hours_for_monthly_scale: number;
    data_retention_time_in_hours_for_others: number;
    time_series_per_client_stats_enabled: boolean;
    live_updates: string;
    autobackup_max_files: number;
    live_chat: string;
    multiple_sites_enabled: boolean;
    backup_to_cloud_enabled: boolean;
    override_inform_host: boolean;
    override_inform_host_type: string;
}
export interface ISiteSettingsSuperIdentity extends ISiteSettings {
    _id: string;
    key: 'super_identity';
    name: string;
    hostname: string;
}
export interface ISiteSettingsDPI extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'dpi';
    enabled: boolean;
    fingerprintingEnabled: boolean;
}
export interface ISiteSettingsUSW extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'usw';
    dhcp_snoop: boolean;
}
export interface ISiteSettingsUSG extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'usg';
    ftp_module: boolean;
    gre_module: boolean;
    h323_module: boolean;
    pptp_module: boolean;
    sip_module: boolean;
    tftp_module: boolean;
    broadcast_ping: boolean;
    receive_redirects: boolean;
    send_redirects: boolean;
    syn_cookies: boolean;
    offload_accounting: boolean;
    offload_sch: boolean;
    offload_l2_blocking: boolean;
    mdns_enabled: boolean;
    upnp_enabled: boolean;
    upnp_nat_pmp_enabled: boolean;
    upnp_secure_mode: boolean;
    mss_clamp: string;
    geo_ip_filtering_traffic_direction: string;
}
export interface ISiteSettingsRSyslogD extends ISiteSettings {
    _id: string;
    site_id: string;
    key: 'rsyslogd';
    enabled: boolean;
    this_controller: boolean;
    this_controller_encrypted_only: boolean;
    netconsole_enabled: boolean;
    debug: boolean;
    ip: string;
    port: string;
    netconsole_host: string;
    netconsole_port: string;
}
export interface ISiteSettingsRadioAI extends ISiteSettings {
    _id: string;
    key: 'radio_ai';
    site_id: string;
    cron_expr: string;
    default: boolean;
    enabled: boolean;
    radios: Array<string>;
    optimize: Array<string>;
    channels_ng: Array<number>;
    channels_na: Array<number>;
    ht_modes_ng: Array<string>;
    ht_modes_na: Array<string>;
    exclude_devices: Array<unknown>;
}
export interface ISiteSettingsNetworkOptimization extends ISiteSettings {
    _id: string;
    key: 'network_optimization';
    site_id: string;
    enabled: boolean;
}
export interface ISiteSettingsProviderCapabilities extends ISiteSettings {
    _id: string;
    key: 'provider_capabilities';
    site_id: string;
    // in Kbps
    upload: number;
    // in Kbps
    download: number;
}
export interface ISiteSettingsLocale extends ISiteSettings {
    _id: string;
    key: 'locale';
    site_id: string;
    timezone: string;
}
export interface ISiteSettingsCountry extends ISiteSettings {
    _id: string;
    key: 'country';
    site_id: string;
    code: string;
}
export interface ISiteSettingsAutoSpeedTest extends ISiteSettings {
    _id: string;
    key: 'auto_speedtest';
    site_id: string;
    enabled: boolean;
    interval: number;
}
export interface ISiteSettingsRadius extends ISiteSettings {
    _id: string;
    key: 'radius';
    site_id: string;
    enabled: boolean;
    x_secret: string;
    configure_whole_network: boolean;
    auth_port: number;
    acct_port: number;
    interim_update_interval: number;
    tunneled_reply: boolean;
}
export interface ISiteSettingsIPS extends ISiteSettings {
    _id: string;
    key: 'ips';
    site_id: string;
    enabled_categories: Array<string>;
    endpoint_scanning: boolean;
    honeypot: Array<unknown>;
    honeypot_enabled: boolean;
    ips_mode: string;
    restrict_ip_addresses: boolean;
    restrict_tor: boolean;
    suppression: { alerts: Array<unknown>; whitelist: Array<unknown> };
    dns_filtering: boolean;
    dns_filters: [
        {
            allowed_sites: Array<unknown>;
            blocked_sites: Array<unknown>;
            blocked_tld: Array<unknown>;
            description: string;
            filter: string;
            version: string;
            network_id: string;
            name: string;
        }
    ];
    utm_token: string;
    last_alert_id: string;
    last_nmap_id: string;
    last_honeypot_id: string;
}
export interface ISiteSettingsManagement extends ISiteSettings {
    key: 'mgmt';
    advanced_feature_enabled: boolean;
    x_ssh_enabled: boolean;
    x_ssh_bind_wildcard: boolean;
    x_ssh_auth_password_enabled: boolean;
    unifi_idp_enabled: boolean;
    wifiman_enabled: boolean;
    x_mgmt_key: string;
    x_ssh_username: string;
    x_ssh_password: string;
    x_ssh_sha512passwd: string;
    led_enabled: boolean;
    alert_enabled: boolean;
    x_ssh_keys: Array<unknown>;
    x_api_token: string;
}

export type tSiteSettings =
    | ISiteSettingsNTP
    | ISiteSettingsGuestAccess
    | ISiteSettingsElementAdopt
    | ISiteSettingsConnectivity
    | ISiteSettingsSuperMail
    | ISiteSettingsSuperFingerBank
    | ISiteSettingsSuperManagement
    | ISiteSettingsSuperIdentity
    | ISiteSettingsDPI
    | ISiteSettingsUSW
    | ISiteSettingsUSG
    | ISiteSettingsRSyslogD
    | ISiteSettingsRadioAI
    | ISiteSettingsNetworkOptimization
    | ISiteSettingsProviderCapabilities
    | ISiteSettingsLocale
    | ISiteSettingsCountry
    | ISiteSettingsAutoSpeedTest
    | ISiteSettingsRadius
    | ISiteSettingsIPS
    | ISiteSettingsManagement
    | ISiteSettings;
