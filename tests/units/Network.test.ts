import { Network, INetwork, ClientError, EErrorsCodes } from '../../src';
import { controller, site } from '../mocks';
import axios from 'axios';

const expectNetworkEqual = jest.fn((network: Network, rawNetwork: Partial<INetwork>) => {
    expect(network._id).toBe(rawNetwork['_id']);
    expect(network.site_id).toBe(rawNetwork['site_id']);
    expect(network.name).toBe(rawNetwork['name']);
    expect(network.purpose).toBe(rawNetwork['purpose']);
    expect(network.enabled).toBe(rawNetwork['enabled']);
    expect(network.setting_preference).toBe(rawNetwork['setting_preference']);
    expect(network.attr_hidden_id).toBe(rawNetwork['attr_hidden_id']);
    expect(network.attr_no_delete).toBe(rawNetwork['attr_no_delete']);
    expect(network.mac_override_enabled).toBe(rawNetwork['mac_override_enabled']);
    expect(network.wan_load_balance_type).toBe(rawNetwork['wan_load_balance_type']);
    expect(network.wan_dns1).toBe(rawNetwork['wan_dns1']);
    expect(network.wan_dns2).toBe(rawNetwork['wan_dns2']);
    expect(network.wan_networkgroup).toBe(rawNetwork['wan_networkgroup']);
    expect(network.wan_type_v6).toBe(rawNetwork['wan_type_v6']);
    expect(network.wan_provider_capabilities).toBe(rawNetwork['wan_provider_capabilities']);
    expect(network.wan_smartq_enabled).toBe(rawNetwork['wan_smartq_enabled']);
    expect(network.wan_dns_preference).toBe(rawNetwork['wan_dns_preference']);
    expect(network.mac_override).toBe(rawNetwork['mac_override']);
    expect(network.wan_load_balance_weight).toBe(rawNetwork['wan_load_balance_weight']);
    expect(network.report_wan_event).toBe(rawNetwork['report_wan_event']);
    expect(network.wan_type).toBe(rawNetwork['wan_type']);
    expect(network.igmp_proxy_upstream).toBe(rawNetwork['igmp_proxy_upstream']);
    expect(network.dhcpd_leasetime).toBe(rawNetwork['dhcpd_leasetime']);
    expect(network.igmp_snooping).toBe(rawNetwork['igmp_snooping']);
    expect(network.dhcpguard_enabled).toBe(rawNetwork['dhcpguard_enabled']);
    expect(network.dhcpd_gateway_enabled).toBe(rawNetwork['dhcpd_gateway_enabled']);
    expect(network.dhcpd_time_offset_enabled).toBe(rawNetwork['dhcpd_time_offset_enabled']);
    expect(network.dhcpd_dns_1).toBe(rawNetwork['dhcpd_dns_1']);
    expect(network.dhcpd_start).toBe(rawNetwork['dhcpd_start']);
    expect(network.dhcpd_unifi_controller).toBe(rawNetwork['dhcpd_unifi_controller']);
    expect(network.ipv6_ra_enabled).toBe(rawNetwork['ipv6_ra_enabled']);
    expect(network.dhcpd_stop).toBe(rawNetwork['dhcpd_stop']);
    expect(network.domain_name).toBe(rawNetwork['domain_name']);
    expect(network.dhcpd_enabled).toBe(rawNetwork['dhcpd_enabled']);
    expect(network.ip_subnet).toBe(rawNetwork['ip_subnet']);
    expect(network.dhpcd_wpad_url).toBe(rawNetwork['dhpcd_wpad_url']);
    expect(network.ipv6_interface_type).toBe(rawNetwork['ipv6_interface_type']);
    expect(network.dhpcd_dns_2).toBe(rawNetwork['dhpcd_dns_2']);
    expect(network.networkgroup).toBe(rawNetwork['networkgroup']);
    expect(network.dhpcd_dns_3).toBe(rawNetwork['dhpcd_dns_3']);
    expect(network.vlan_enabled).toBe(rawNetwork['vlan_enabled']);
    expect(network.is_nat).toBe(rawNetwork['is_nat']);
    expect(network.dhcpdv6_enabled).toBe(rawNetwork['dhcpdv6_enabled']);
    expect(network.dhcpd_dns_enabled).toBe(rawNetwork['dhcpd_dns_enabled']);
    expect(network.gateway_type).toBe(rawNetwork['gateway_type']);
    expect(network.dhcpd_relay_enabled).toBe(rawNetwork['dhcpd_relay_enabled']);
    expect(network.dhcpd_boot_enabled).toBe(rawNetwork['dhcpd_boot_enabled']);
    expect(network.igmp_proxy_downstream).toBe(rawNetwork['igmp_proxy_downstream']);
    expect(network.upnp_lan_enabled).toBe(rawNetwork['upnp_lan_enabled']);
    expect(network.dhcpd_ntp_enabled).toBe(rawNetwork['dhcpd_ntp_enabled']);
    expect(network.mdns_enabled).toBe(rawNetwork['mdns_enabled']);
    expect(network.lte_lan_enabled).toBe(rawNetwork['lte_lan_enabled']);
    expect(network.dhpcd_tftp_server).toBe(rawNetwork['dhpcd_tftp_server']);
    expect(network.auto_scale_enabled).toBe(rawNetwork['auto_scale_enabled']);
    expect(network.vlan).toBe(rawNetwork['vlan']);
    expect(network.l2tp_allow_weak_ciphers).toBe(rawNetwork['l2tp_allow_weak_ciphers']);
    expect(network.l2tp_local_wan_ip).toBe(rawNetwork['l2tp_local_wan_ip']);
    expect(network.vpn_type).toBe(rawNetwork['vpn_type']);
    expect(network.radiusprofile_id).toBe(rawNetwork['radiusprofile_id']);
    expect(network.dhpcd_wins_enabled).toBe(rawNetwork['dhpcd_wins_enabled']);
    expect(network.require_mschapv2).toBe(rawNetwork['require_mschapv2']);
    expect(network.l2tp_interface).toBe(rawNetwork['l2tp_interface']);
    expect(network.exposed_to_site_vpn).toBe(rawNetwork['exposed_to_site_vpn']);
    expect(network.x_ipsec_pre_shared_key).toBe(rawNetwork['x_ipsec_pre_shared_key']);
});

describe('Network', () => {
    describe('construct', () => {
        describe('network', () => {
            it('should refuse a Network without _id', () => {
                expect.assertions(3);
                try {
                    // @ts-ignore
                    new Network({ controller, site }, { name: 'aaaaa' });
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('_id is mandatory for a network.');
                    expect(e.code).toBe(EErrorsCodes.UNKNOWN_ERROR);
                }
            });
            it('should construct Network with just _id', () => {
                const network = new Network({ controller, site }, { _id: '12345' });
            });
            it('should construct Network with enabled', () => {
                const network = new Network({ controller, site }, { _id: '12345', enabled: true });
                expect(network.enabled).toBe(true);
            });
            it('should construct with all values', () => {
                const rawNetwork: Partial<INetwork> = {
                    _id: '1234567890',
                    site_id: 'default',
                    name: 'Test Network',
                    purpose: 'Testing purposes',
                    enabled: true,
                    setting_preference: 'Testing',
                    attr_hidden_id: 'Testing',
                    attr_no_delete: true,
                    mac_override_enabled: true,
                    wan_load_balance_type: 'Testing',
                    wan_dns1: 'Testing',
                    wan_dns2: 'Testing',
                    wan_networkgroup: 'Testing',
                    wan_type_v6: 'Testing',
                    wan_provider_capabilities: {},
                    wan_smartq_enabled: true,
                    wan_dns_preference: 'Testing',
                    mac_override: 'Testing',
                    wan_load_balance_weight: 12345,
                    report_wan_event: true,
                    wan_type: 'Testing',
                    igmp_proxy_upstream: true,
                    dhcpd_leasetime: 12345,
                    igmp_snooping: true,
                    dhcpguard_enabled: true,
                    dhcpd_gateway_enabled: true,
                    dhcpd_time_offset_enabled: true,
                    dhcpd_dns_1: 'Testing',
                    dhcpd_start: 'Testing',
                    dhcpd_unifi_controller: 'Testing',
                    ipv6_ra_enabled: true,
                    dhcpd_stop: 'Testing',
                    domain_name: 'Testing',
                    dhcpd_enabled: true,
                    ip_subnet: 'Testing',
                    dhpcd_wpad_url: 'Testing',
                    ipv6_interface_type: 'Testing',
                    dhpcd_dns_2: 'Testing',
                    networkgroup: 'Testing',
                    dhpcd_dns_3: 'Testing',
                    vlan_enabled: true,
                    is_nat: true,
                    dhcpdv6_enabled: true,
                    dhcpd_dns_enabled: true,
                    gateway_type: 'Testing',
                    dhcpd_relay_enabled: true,
                    dhcpd_boot_enabled: true,
                    igmp_proxy_downstream: true,
                    upnp_lan_enabled: true,
                    dhcpd_ntp_enabled: true,
                    mdns_enabled: true,
                    lte_lan_enabled: true,
                    dhpcd_tftp_server: 'Testing',
                    auto_scale_enabled: true,
                    vlan: 12345,
                    l2tp_allow_weak_ciphers: true,
                    l2tp_local_wan_ip: 'Testing',
                    vpn_type: 'Testing',
                    radiusprofile_id: 'Testing',
                    dhpcd_wins_enabled: true,
                    require_mschapv2: true,
                    l2tp_interface: 'Testing',
                    exposed_to_site_vpn: true,
                    x_ipsec_pre_shared_key: 'Testing'
                };

                const network = new Network({ controller, site }, rawNetwork);
                expectNetworkEqual(network, rawNetwork);
            });
        });
    });
    describe('functions', () => {
        let network: Network;
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        beforeEach(() => {
            (mockedAxios as unknown as jest.Mock).mockClear();
            network = new Network(
                { controller, site },
                {
                    _id: 'aaaaaaa',
                    name: 'UDMPRO2',
                    enabled: false
                }
            );
        });

        describe('save', () => {
            beforeEach(() => {
                mockedAxios.put.mockReset();
            });
            it('should save the network', async () => {
                mockedAxios.put.mockImplementationOnce(() => Promise.resolve({ data: {} }));

                network.enabled = true;
                await network.save();

                expect(mockedAxios.put).toHaveBeenCalledWith(
                    '/rest/networkconf/:id',
                    { ...network },
                    {
                        urlParams: expect.objectContaining({
                            id: network._id
                        })
                    }
                );
            });
        });

        describe('update network', () => {
            beforeEach(() => {
                mockedAxios.put.mockReset();
            });
            it('should update network with original _id', async () => {
                mockedAxios.put.mockImplementationOnce(() => Promise.resolve({ data: {} }));

                network = new Network(
                    { controller, site },
                    {
                        _id: '12345',
                        name: 'UDMPRO2'
                    }
                );
                const props = { _id: '54321', name: 'UDMPRO4' };
                await network.update(props);

                expect(mockedAxios.put).toHaveBeenCalledWith(
                    '/rest/networkconf/:id',
                    { ...props },
                    {
                        urlParams: expect.objectContaining({
                            id: network._id
                        })
                    }
                );
            });

            it('should update network', async () => {
                mockedAxios.put.mockImplementationOnce(() => Promise.resolve({ data: {} }));

                network = new Network(
                    { controller, site },
                    {
                        _id: '12345',
                        name: 'UDMPRO2'
                    }
                );
                const props = { _id: '12345', name: 'UDMPRO4' };
                await network.update(props);

                expect(mockedAxios.put).toHaveBeenCalledWith(
                    '/rest/networkconf/:id',
                    { ...props },
                    {
                        urlParams: expect.objectContaining({
                            id: props._id
                        })
                    }
                );
            });
        });
    });
});
