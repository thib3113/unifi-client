import { INetwork } from './INetwork';
import { Validate } from '../commons/Validate';
import { ClientError, EErrorsCodes } from '../Errors';
import { createDebugger } from '../util';
import { IObjectSubSiteConfig, _ObjectSubSite } from '../commons';

export class Network extends _ObjectSubSite {
    static debug = createDebugger('Network');

    constructor(config: IObjectSubSiteConfig, props: Partial<INetwork>) {
        super(config);

        if (!props._id) {
            throw new ClientError('_id is mandatory for a network.', EErrorsCodes.UNKNOWN_ERROR);
        }

        this.import(props);
    }

    public import(props: Partial<INetwork>): this {
        this.debug = Network.debug.extend(this.name);

        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.site_id = props.site_id;
        }
        if (!Validate.isUndefined(props.purpose)) {
            this.purpose = props.purpose;
        }
        if (!Validate.isUndefined(props.attr_hidden_id)) {
            this.attr_hidden_id = props.attr_hidden_id;
        }
        if (!Validate.isUndefined(props.attr_no_delete)) {
            this.attr_no_delete = props.attr_no_delete;
        }
        if (!Validate.isUndefined(props.setting_preference)) {
            this.setting_preference = props.setting_preference;
        }
        if (!Validate.isUndefined(props.attr_hidden_id)) {
            this.attr_hidden_id = props.attr_hidden_id;
        }
        if (!Validate.isUndefined(props.attr_no_delete)) {
            this.attr_no_delete = props.attr_no_delete;
        }
        if (!Validate.isUndefined(props.mac_override_enabled)) {
            this.mac_override_enabled = props.mac_override_enabled;
        }
        if (!Validate.isUndefined(props.wan_load_balance_type)) {
            this.wan_load_balance_type = props.wan_load_balance_type;
        }
        if (!Validate.isUndefined(props.wan_dns1)) {
            this.wan_dns1 = props.wan_dns1;
        }
        if (!Validate.isUndefined(props.wan_dns2)) {
            this.wan_dns2 = props.wan_dns2;
        }
        if (!Validate.isUndefined(props.wan_networkgroup)) {
            this.wan_networkgroup = props.wan_networkgroup;
        }
        if (!Validate.isUndefined(props.wan_type_v6)) {
            this.wan_type_v6 = props.wan_type_v6;
        }
        if (!Validate.isUndefined(props.wan_provider_capabilities)) {
            this.wan_provider_capabilities = props.wan_provider_capabilities;
        }
        if (!Validate.isUndefined(props.wan_smartq_enabled)) {
            this.wan_smartq_enabled = props.wan_smartq_enabled;
        }
        if (!Validate.isUndefined(props.wan_dns_preference)) {
            this.wan_dns_preference = props.wan_dns_preference;
        }
        if (!Validate.isUndefined(props.mac_override)) {
            this.mac_override = props.mac_override;
        }
        if (!Validate.isUndefined(props.wan_load_balance_weight)) {
            this.wan_load_balance_weight = props.wan_load_balance_weight;
        }
        if (!Validate.isUndefined(props.report_wan_event)) {
            this.report_wan_event = props.report_wan_event;
        }
        if (!Validate.isUndefined(props.wan_type)) {
            this.wan_type = props.wan_type;
        }
        if (!Validate.isUndefined(props.igmp_proxy_upstream)) {
            this.igmp_proxy_upstream = props.igmp_proxy_upstream;
        }
        if (!Validate.isUndefined(props.dhcpd_leasetime)) {
            this.dhcpd_leasetime = props.dhcpd_leasetime;
        }
        if (!Validate.isUndefined(props.igmp_snooping)) {
            this.igmp_snooping = props.igmp_snooping;
        }
        if (!Validate.isUndefined(props.dhcpguard_enabled)) {
            this.dhcpguard_enabled = props.dhcpguard_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_gateway_enabled)) {
            this.dhcpd_gateway_enabled = props.dhcpd_gateway_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_time_offset_enabled)) {
            this.dhcpd_time_offset_enabled = props.dhcpd_time_offset_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_dns_1)) {
            this.dhcpd_dns_1 = props.dhcpd_dns_1;
        }
        if (!Validate.isUndefined(props.dhcpd_start)) {
            this.dhcpd_start = props.dhcpd_start;
        }
        if (!Validate.isUndefined(props.dhcpd_unifi_controller)) {
            this.dhcpd_unifi_controller = props.dhcpd_unifi_controller;
        }
        if (!Validate.isUndefined(props.ipv6_ra_enabled)) {
            this.ipv6_ra_enabled = props.ipv6_ra_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_stop)) {
            this.dhcpd_stop = props.dhcpd_stop;
        }
        if (!Validate.isUndefined(props.enabled)) {
            this.enabled = props.enabled;
        }
        if (!Validate.isUndefined(props.domain_name)) {
            this.domain_name = props.domain_name;
        }
        if (!Validate.isUndefined(props.dhcpd_enabled)) {
            this.dhcpd_enabled = props.dhcpd_enabled;
        }
        if (!Validate.isUndefined(props.ip_subnet)) {
            this.ip_subnet = props.ip_subnet;
        }
        if (!Validate.isUndefined(props.dhpcd_wpad_url)) {
            this.dhpcd_wpad_url = props.dhpcd_wpad_url;
        }
        if (!Validate.isUndefined(props.ipv6_interface_type)) {
            this.ipv6_interface_type = props.ipv6_interface_type;
        }
        if (!Validate.isUndefined(props.dhpcd_dns_2)) {
            this.dhpcd_dns_2 = props.dhpcd_dns_2;
        }
        if (!Validate.isUndefined(props.networkgroup)) {
            this.networkgroup = props.networkgroup;
        }
        if (!Validate.isUndefined(props.dhpcd_dns_3)) {
            this.dhpcd_dns_3 = props.dhpcd_dns_3;
        }
        if (!Validate.isUndefined(props.vlan_enabled)) {
            this.vlan_enabled = props.vlan_enabled;
        }
        if (!Validate.isUndefined(props.is_nat)) {
            this.is_nat = props.is_nat;
        }
        if (!Validate.isUndefined(props.dhcpdv6_enabled)) {
            this.dhcpdv6_enabled = props.dhcpdv6_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_dns_enabled)) {
            this.dhcpd_dns_enabled = props.dhcpd_dns_enabled;
        }
        if (!Validate.isUndefined(props.gateway_type)) {
            this.gateway_type = props.gateway_type;
        }
        if (!Validate.isUndefined(props.dhcpd_relay_enabled)) {
            this.dhcpd_relay_enabled = props.dhcpd_relay_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_boot_enabled)) {
            this.dhcpd_boot_enabled = props.dhcpd_boot_enabled;
        }
        if (!Validate.isUndefined(props.igmp_proxy_downstream)) {
            this.igmp_proxy_downstream = props.igmp_proxy_downstream;
        }
        if (!Validate.isUndefined(props.upnp_lan_enabled)) {
            this.upnp_lan_enabled = props.upnp_lan_enabled;
        }
        if (!Validate.isUndefined(props.dhcpd_ntp_enabled)) {
            this.dhcpd_ntp_enabled = props.dhcpd_ntp_enabled;
        }
        if (!Validate.isUndefined(props.mdns_enabled)) {
            this.mdns_enabled = props.mdns_enabled;
        }
        if (!Validate.isUndefined(props.lte_lan_enabled)) {
            this.lte_lan_enabled = props.lte_lan_enabled;
        }
        if (!Validate.isUndefined(props.dhpcd_tftp_server)) {
            this.dhpcd_tftp_server = props.dhpcd_tftp_server;
        }
        if (!Validate.isUndefined(props.auto_scale_enabled)) {
            this.auto_scale_enabled = props.auto_scale_enabled;
        }
        if (!Validate.isUndefined(props.vlan)) {
            this.vlan = props.vlan;
        }
        if (!Validate.isUndefined(props.l2tp_allow_weak_ciphers)) {
            this.l2tp_allow_weak_ciphers = props.l2tp_allow_weak_ciphers;
        }
        if (!Validate.isUndefined(props.l2tp_local_wan_ip)) {
            this.l2tp_local_wan_ip = props.l2tp_local_wan_ip;
        }
        if (!Validate.isUndefined(props.vpn_type)) {
            this.vpn_type = props.vpn_type;
        }
        if (!Validate.isUndefined(props.radiusprofile_id)) {
            this.radiusprofile_id = props.radiusprofile_id;
        }
        if (!Validate.isUndefined(props.dhpcd_wins_enabled)) {
            this.dhpcd_wins_enabled = props.dhpcd_wins_enabled;
        }
        if (!Validate.isUndefined(props.require_mschapv2)) {
            this.require_mschapv2 = props.require_mschapv2;
        }
        if (!Validate.isUndefined(props.l2tp_interface)) {
            this.l2tp_interface = props.l2tp_interface;
        }
        if (!Validate.isUndefined(props.exposed_to_site_vpn)) {
            this.exposed_to_site_vpn = props.exposed_to_site_vpn;
        }
        if (!Validate.isUndefined(props.x_ipsec_pre_shared_key)) {
            this.x_ipsec_pre_shared_key = props.x_ipsec_pre_shared_key;
        }

        return this;
    }

    public async update(props: Partial<INetwork>): Promise<void> {
        if (!Validate.isDefinedNotNull(props._id)) {
            throw new Error('Cannot update network without _id');
        }

        return (
            await this.instance.put('/rest/networkconf/:id', props, {
                urlParams: {
                    site: this.site.name,
                    id: this._id
                }
            })
        ).data?.data;
    }

    public async save(): Promise<this> {
        if (!Validate.isDefinedNotNull(this._id)) {
            throw new Error('Cannot update network without _id');
        }

        const network: INetwork = { ...this } as INetwork;
        const res = (
            await this.instance.put('/rest/networkconf/:id', network, {
                urlParams: {
                    id: this._id
                }
            })
        ).data;
        if (res.data) {
            this.import(res.data[0]);
        }
        return this;
    }

    public _id: string;
    public site_id: string;
    public name: string;
    public purpose: string;
    public enabled: boolean;
    public setting_preference: string;
    public attr_hidden_id: string;
    public attr_no_delete: boolean;
    public mac_override_enabled: boolean;
    public wan_load_balance_type: string;
    public wan_dns1: string;
    public wan_dns2: string;
    public wan_networkgroup: string;
    public wan_type_v6: string;
    public wan_provider_capabilities: object;
    public wan_smartq_enabled: boolean;
    public wan_dns_preference: string;
    public mac_override: string;
    public wan_load_balance_weight: number;
    public report_wan_event: boolean;
    public wan_type: string;
    public igmp_proxy_upstream: boolean;
    public dhcpd_leasetime: number;
    public igmp_snooping: boolean;
    public dhcpguard_enabled: boolean;
    public dhcpd_gateway_enabled: boolean;
    public dhcpd_time_offset_enabled: boolean;
    public dhcpd_dns_1: string;
    public dhcpd_start: string;
    public dhcpd_unifi_controller: string;
    public ipv6_ra_enabled: boolean;
    public dhcpd_stop: string;
    public domain_name: string;
    public dhcpd_enabled: boolean;
    public ip_subnet: string;
    public dhpcd_wpad_url: string;
    public ipv6_interface_type: string;
    public dhpcd_dns_2: string;
    public networkgroup: string;
    public dhpcd_dns_3: string;
    public vlan_enabled: boolean;
    public is_nat: boolean;
    public dhcpdv6_enabled: boolean;
    public dhcpd_dns_enabled: boolean;
    public gateway_type: string;
    public dhcpd_relay_enabled: boolean;
    public dhcpd_boot_enabled: boolean;
    public igmp_proxy_downstream: boolean;
    public upnp_lan_enabled: boolean;
    public dhcpd_ntp_enabled: boolean;
    public mdns_enabled: boolean;
    public lte_lan_enabled: boolean;
    public dhpcd_tftp_server: string;
    public auto_scale_enabled: boolean;
    public vlan: number;
    public l2tp_allow_weak_ciphers: boolean;
    public l2tp_local_wan_ip: string;
    public vpn_type: string;
    public radiusprofile_id: string;
    public dhpcd_wins_enabled: boolean;
    public require_mschapv2: boolean;
    public l2tp_interface: string;
    public exposed_to_site_vpn: boolean;
    public x_ipsec_pre_shared_key: string;
}
