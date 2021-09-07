import {
    BaseDevice,
    ClientError,
    EErrorsCodes,
    IBaseDeviceMandatoryRaw,
    IBaseDeviceRaw,
    ILANDeviceRaw,
    IWLANDeviceRaw,
    LANDevice,
    UAPDevice,
    UBBDevice,
    UDMDevice,
    UGWDevice,
    USWDevice,
    UXGDevice
} from '../../src';
import { controller, site } from '../mocks';
import { macAddress } from '../globals';
import axios from 'axios';

describe('Device', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    describe('construct', () => {
        describe('baseDevice', () => {
            it('should construct BaseDevice', () => {
                const dev = new BaseDevice({ controller, site }, { mac: macAddress });
            });
            it('should construct BaseDevice with _uptime', () => {
                const dev = new BaseDevice({ controller, site }, { mac: macAddress, _uptime: 162999 });
                expect(dev.uptime).toBe(162999);
            });
            it('should refuse a BaseDevice without mac', () => {
                expect.assertions(3);
                try {
                    // @ts-ignore
                    new BaseDevice({ controller, site });
                } catch (e) {
                    expect(e).toBeInstanceOf(ClientError);
                    expect(e.message).toBe('mac is needed');
                    expect(e.code).toBe(EErrorsCodes.UNKNOWN_ERROR);
                }
            });
            it('should construct with all values', () => {
                const rawDev: Partial<IBaseDeviceRaw> & { mac: string } = {
                    mac: macAddress,
                    _id: '6001f8c53fd98c05e81375b5',
                    ip: '51.254.200.228',
                    model: 'UDMPRO',
                    model_in_lts: false,
                    model_in_eol: false,
                    type: 'udm',
                    version: '1.11.0-14.3859',
                    adopted: true,
                    site_id: '6001f8a73fd98c05e9465f91',
                    x_authkey: '57ae1897567523e08da5c3461c0718ed',
                    cfgversion: 'fd20c632ac927c69',
                    syslog_key: '1530c973630ed5bc1f76900323f68f77494e617d9779b46136fa6febd098a916',
                    config_network: {
                        type: 'dhcp',
                        ip: '192.168.1.1'
                    },
                    setup_id: '73b50333-f17b-4198-b19b-b055e55ebccf',
                    dot1x_portctrl_enabled: false,
                    license_state: 'registered',
                    x_fingerprint: 'd0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0',
                    inform_url: 'http://localhost:8080/inform',
                    inform_ip: '127.0.0.1',
                    x_aes_gcm: true,
                    required_version: '1.0.15',
                    kernel_version: '4.19.152-al-linux-v10.2.0-v1.11.0-14.3859-c147cc8',
                    architecture: 'aarch64',
                    board_rev: 10,
                    manufacturer_id: 4,
                    model_incompatible: false,
                    internet: true,
                    ethernet_table: [
                        {
                            mac: '04:18:d6:85:ed:f1',
                            num_port: 1,
                            name: 'eth0'
                        }
                    ],
                    port_table: [
                        {
                            port_idx: 1,
                            media: 'GE',
                            port_poe: false,
                            speed_caps: 1048623,
                            op_mode: 'switch',
                            portconf_id: '6001f9fc6e518c05e9465fa8',
                            autoneg: true,
                            enable: true,
                            flowctrl_rx: false,
                            flowctrl_tx: false,
                            full_duplex: true,
                            is_uplink: false,
                            mac: '04:18:d6:85:ed:f1',
                            name: 'Port 1',
                            num_port: 1,
                            rx_broadcast: 0,
                            rx_bytes: 199370473,
                            rx_dropped: 3,
                            rx_errors: 0,
                            rx_multicast: 0,
                            rx_packets: 749244,
                            rx_rate: 30520,
                            'rx_rate-max': 40928,
                            speed: 1000,
                            tx_broadcast: 350893,
                            tx_bytes: 137487713,
                            tx_dropped: 0,
                            tx_errors: 0,
                            tx_multicast: 300981,
                            tx_packets: 1400175,
                            tx_rate: 8184,
                            'tx_rate-max': 23112,
                            type: 'ethernet',
                            up: true,
                            ifname: 'eth0',
                            'tx_bytes-r': 751,
                            'rx_bytes-r': 1222,
                            'bytes-r': 1974,
                            ip: '192.168.1.1',
                            netmask: '255.255.255.0',
                            network_name: 'lan',
                            masked: false,
                            aggregated_by: false
                        }
                    ],
                    has_speaker: false,
                    has_eth1: false,
                    fw_caps: 1651416107,
                    hw_caps: 24,
                    wifi_caps: 524288,
                    switch_caps: {
                        max_mirror_sessions: 1,
                        max_aggregate_sessions: 4
                    },
                    has_fan: false,
                    has_temperature: false,
                    connected_at: 1629836280,
                    provisioned_at: 1629988276,
                    unsupported: false,
                    unsupported_reason: 0,
                    serial: 'E634CB896753',
                    hash_id: 'n13456789541235de',
                    anon_id: 'd3c660ac-d3b6-4ee4-b7b8-6a3a11bbb2fc',
                    two_phase_adopt: false,
                    name: 'Dream Machine Pro',
                    device_id: '1234f8c53fd98c05e9465fb5',
                    state: 1,
                    start_disconnected_millis: 1629836276935,
                    last_seen: 1629999135,
                    known_cfgversion: 'efg12c345ac927c69',
                    start_connected_millis: 1629836280274,
                    min_inform_interval_seconds: 1,
                    upgradable: false,
                    adoptable_when_upgraded: false,
                    rollupgrade: false,
                    next_interval: 16,
                    uptime: 162999,
                    _uptime: 162999,
                    locating: false,
                    sys_stats: {
                        loadavg_1: '1.20',
                        loadavg_15: '1.38',
                        loadavg_5: '1.04',
                        mem_buffer: 311672832,
                        mem_total: 4139810816,
                        mem_used: 4008153088
                    },
                    'system-stats': {
                        cpu: '20.5',
                        mem: '74.1',
                        uptime: '162999'
                    },
                    lldp_table: [
                        {
                            chassis_id: '04:18:d6:85:ed:fb',
                            is_wired: true,
                            local_port_idx: 11,
                            local_port_name: 'eth10',
                            port_id: 'local Port 7'
                        }
                    ],
                    displayable_version: '1.11.0',
                    connection_network_name: 'LAN',
                    startup_timestamp: 1629836137,
                    guest_kicks: 0,
                    guest_token: '7E90EFF11D456789B26DFA67A19B9DC2',
                    uplink: {
                        drops: 2,
                        ip: '51.254.200.228',
                        latency: 12,
                        name: 'eth9',
                        nameservers: ['1.1.1.1', '8.8.8.8'],
                        netmask: '255.255.255.0',
                        num_port: 1,
                        rx_bytes: 426831259752,
                        rx_dropped: 0,
                        rx_errors: 0,
                        rx_multicast: 0,
                        rx_packets: 294636846,
                        speedtest_lastrun: 1629969488,
                        speedtest_ping: 16,
                        speedtest_status: 'Success',
                        tx_bytes: 26083368607,
                        tx_dropped: 0,
                        tx_errors: 0,
                        tx_packets: 48113594,
                        up: true,
                        uptime: 32237,
                        xput_down: 131.688,
                        xput_up: 513.231,
                        port_idx: 10,
                        media: 'SFP+',
                        speed: 10000,
                        full_duplex: true,
                        rx_rate: 20211,
                        tx_rate: 16526,
                        max_speed: 1000,
                        type: 'wire',
                        'tx_bytes-r': 2170,
                        'rx_bytes-r': 2657,
                        'bytes-r': 4827
                    },
                    downlink_table: [
                        {
                            mac: '04:18:d6:85:ed:fb',
                            port_idx: 11,
                            speed: 10000,
                            full_duplex: true
                        }
                    ],
                    connect_request_ip: '127.0.0.1',
                    connect_request_port: '36219',
                    prev_non_busy_state: 1,
                    stat: {
                        gw: {
                            site_id: '6001f8a73fd98c05e9465f91',
                            o: 'gw',
                            oid: '04:18:d6:85:ed:f2',
                            gw: '04:18:d6:85:ed:f2',
                            time: 1629836100000,
                            datetime: '2021-08-24T20:15:00Z',
                            duration: 1.6285e8,
                            'wan-rx_packets': 2.94343022e8,
                            'wan-rx_bytes': 4.26721536425e11,
                            'wan-tx_packets': 4.7847237e7,
                            'wan-tx_bytes': 2.6057981285e10,
                            'wan2-rx_packets': 243038.0,
                            'wan2-rx_bytes': 5.2163178e7,
                            'wan2-tx_packets': 245282.0,
                            'wan2-tx_bytes': 2.1894095e7,
                            'lan-rx_packets': 2.33628994e8,
                            'lan-rx_bytes': 1.60305512794e11,
                            'lan-tx_packets': 5.00701506e8,
                            'lan-tx_bytes': 5.93893552911e11
                        },
                        sw: {
                            site_id: '6001f8a73fd98c05e9465f91',
                            o: 'sw',
                            oid: '04:18:d6:85:ed:f2',
                            sw: '04:18:d6:85:ed:f2',
                            time: 1629836100000,
                            datetime: '2021-08-24T20:15:00Z',
                            rx_packets: 2.33628994e8,
                            rx_bytes: 1.60305512794e11,
                            rx_errors: 0.0,
                            rx_dropped: 0.0,
                            rx_crypts: 0.0,
                            rx_frags: 0.0,
                            tx_packets: 5.00701506e8,
                            tx_bytes: 5.93893552911e11,
                            tx_errors: 0.0,
                            tx_dropped: 0.0,
                            tx_retries: 0.0,
                            rx_multicast: 59909.0,
                            rx_broadcast: 28129.0,
                            tx_multicast: 1410513.0,
                            tx_broadcast: 1721636.0,
                            bytes: 7.54199065705e11,
                            duration: 1.6285e8,
                            'port_1-rx_packets': 748813.0,
                            'port_1-rx_bytes': 1.99257189e8,
                            'port_1-tx_packets': 1390823.0,
                            'port_1-tx_bytes': 1.36390528e8,
                            'port_1-tx_multicast': 292998.0,
                            'port_1-tx_broadcast': 349953.0
                        }
                    },
                    tx_bytes: 426831259752,
                    rx_bytes: 26083368607,
                    bytes: 452914628359,
                    num_sta: 34,
                    'user-wlan-num_sta': 0,
                    'user-num_sta': 34,
                    'guest-wlan-num_sta': 0,
                    'guest-num_sta': 0,
                    x_has_ssh_hostkey: false,
                    gateway_mac: '04:18:d6:85:ed:fc',
                    x_ssh_hostkey_fingerprint: 'd0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0:d0',
                    satisfaction: 50,
                    sys_error_caps: 5,
                    last_uplink: {
                        uplink_mac: '04:18:d6:85:ed:fc',
                        uplink_remote_port: 1,
                        port_idx: 1,
                        type: 'wire'
                    },
                    ssh_session_table: [],
                    led_override: 'default',
                    led_override_color: '#FFFFFF',
                    led_override_color_brightness: 100,
                    outdoor_mode_override: 'default',
                    lcm_brightness_override: true,
                    lcm_idle_timeout_override: false,
                    default: false,
                    discovered_via: '',
                    adopt_ip: '192.168.1.1',
                    adopt_url: 'http://192.168.1.1:8080/inform',
                    disabled: false
                };

                const dev = new BaseDevice({ controller, site }, rawDev);
                expect(dev.mac).toBe(rawDev.mac);
                expect(dev._id).toBe(rawDev._id);
                expect(dev.ip).toBe(rawDev.ip);
                expect(dev.model).toBe(rawDev.model);
                expect(dev.modelInLTS).toBe(rawDev.model_in_lts);
                expect(dev.modelInEOL).toBe(rawDev.model_in_eol);
                expect(dev.type).toBe(rawDev.type);
                expect(dev.version).toBe(rawDev.version);
                expect(dev.adopted).toBe(rawDev.adopted);
                expect(dev.siteId).toBe(rawDev.site_id);
                expect(dev.xAuthkey).toBe(rawDev.x_authkey);
                expect(dev.cfgVersion).toBe(rawDev.cfgversion);
                expect(dev.syslogKey).toBe(rawDev.syslog_key);
                expect(dev.configNetwork).toBe(rawDev.config_network);
                expect(dev.setupId).toBe(rawDev.setup_id);
                expect(dev.dot1xPortctrlEnabled).toBe(rawDev.dot1x_portctrl_enabled);
                expect(dev.licenseState).toBe(rawDev.license_state);
                expect(dev.xFingerprint).toBe(rawDev.x_fingerprint);
                expect(dev.informUrl).toBe(rawDev.inform_url);
                expect(dev.informIp).toBe(rawDev.inform_ip);
                expect(dev.xAesGcm).toBe(rawDev.x_aes_gcm);
                expect(dev.requiredVersion).toBe(rawDev.required_version);
                expect(dev.kernelVersion).toBe(rawDev.kernel_version);
                expect(dev.architecture).toBe(rawDev.architecture);
                expect(dev.boardRevision).toBe(rawDev.board_rev);
                expect(dev.manufacturerId).toBe(rawDev.manufacturer_id);
                expect(dev.modelIncompatible).toBe(rawDev.model_incompatible);
                expect(dev.internet).toBe(rawDev.internet);
                expect(dev.ethernetTable).toBe(rawDev.ethernet_table);
                expect(dev.portTable).toBe(rawDev.port_table);
                expect(dev.hasSpeaker).toBe(rawDev.has_speaker);
                expect(dev.hasEth1).toBe(rawDev.has_eth1);
                expect(dev.fwCaps).toBe(rawDev.fw_caps);
                expect(dev.hwCaps).toBe(rawDev.hw_caps);
                expect(dev.wifiCaps).toBe(rawDev.wifi_caps);
                expect(dev.switchCaps).toBe(rawDev.switch_caps);
                expect(dev.hasFan).toBe(rawDev.has_fan);
                expect(dev.hasTemperature).toBe(rawDev.has_temperature);
                expect(dev.connectedAt).toBe(rawDev.connected_at);
                expect(dev.provisionedAt).toBe(rawDev.provisioned_at);
                expect(dev.unsupported).toBe(rawDev.unsupported);
                expect(dev.unsupportedReason).toBe(rawDev.unsupported_reason);
                expect(dev.serial).toBe(rawDev.serial);
                expect(dev.hashId).toBe(rawDev.hash_id);
                expect(dev.anonId).toBe(rawDev.anon_id);
                expect(dev.twoPhaseAdopt).toBe(rawDev.two_phase_adopt);
                expect(dev.name).toBe(rawDev.name);
                expect(dev.deviceId).toBe(rawDev.device_id);
                expect(dev.state).toBe(rawDev.state);
                expect(dev.startDisconnectedMillis).toBe(rawDev.start_disconnected_millis);
                expect(dev.lastSeen).toBe(rawDev.last_seen);
                expect(dev.knownCfgversion).toBe(rawDev.known_cfgversion);
                expect(dev.startConnectedMillis).toBe(rawDev.start_connected_millis);
                expect(dev.minInformIntervalSeconds).toBe(rawDev.min_inform_interval_seconds);
                expect(dev.upgradable).toBe(rawDev.upgradable);
                expect(dev.adoptableWhenUpgraded).toBe(rawDev.adoptable_when_upgraded);
                expect(dev.rollupgrade).toBe(rawDev.rollupgrade);
                expect(dev.nextInterval).toBe(rawDev.next_interval);
                expect(dev.uptime).toBe(rawDev.uptime);
                expect(dev.locating).toBe(rawDev.locating);
                expect(dev.sysStats).toBe(rawDev.sys_stats);
                expect(dev.systemStats).toBe(rawDev['system-stats']);
                expect(dev.lldpTable).toBe(rawDev.lldp_table);
                expect(dev.displayableVersion).toBe(rawDev.displayable_version);
                expect(dev.connectionNetworkName).toBe(rawDev.connection_network_name);
                expect(dev.startupTimestamp).toBe(rawDev.startup_timestamp);
                expect(dev.guestKicks).toBe(rawDev.guest_kicks);
                expect(dev.guestToken).toBe(rawDev.guest_token);
                expect(dev.uplink).toBe(rawDev.uplink);
                expect(dev.downlinkTable).toBe(rawDev.downlink_table);
                expect(dev.connectRequestIp).toBe(rawDev.connect_request_ip);
                expect(dev.connectRequestPort).toBe(rawDev.connect_request_port);
                expect(dev.prevNonBusyState).toBe(rawDev.prev_non_busy_state);
                expect(dev.stat.gw).toBeDefined();
                expect(dev.stat.gw).toBe(rawDev.stat?.gw);
                expect(dev.stat.sw).toBeDefined();
                expect(dev.stat.sw).toBe(rawDev.stat?.sw);
                expect(dev.txBytes).toBe(rawDev.tx_bytes);
                expect(dev.rxBytes).toBe(rawDev.rx_bytes);
                expect(dev.bytes).toBe(rawDev.bytes);
                expect(dev.numSta).toBe(rawDev.num_sta);
                expect(dev.userWLANNumSta).toBe(rawDev['user-wlan-num_sta']);
                expect(dev.userNumSta).toBe(rawDev['user-num_sta']);
                expect(dev.guestWLANNumSta).toBe(rawDev['guest-wlan-num_sta']);
                expect(dev.guestNumSta).toBe(rawDev['guest-num_sta']);
                expect(dev.xHasSshHostkey).toBe(rawDev.x_has_ssh_hostkey);
                expect(dev.gatewayMac).toBe(rawDev.gateway_mac);
                expect(dev.xSshHostkeyFingerprint).toBe(rawDev.x_ssh_hostkey_fingerprint);
                expect(dev.satisfaction).toBe(rawDev.satisfaction);
                expect(dev.sysErrorCaps).toBe(rawDev.sys_error_caps);
                expect(dev.lastUplink).toBe(rawDev.last_uplink);
                expect(dev.sshSessionTable).toBe(rawDev.ssh_session_table);
                expect(dev.ledOverride).toBe(rawDev.led_override);
                expect(dev.ledOverrideColor).toBe(rawDev.led_override_color);
                expect(dev.ledOverrideColorBrightness).toBe(rawDev.led_override_color_brightness);
                expect(dev.outdoorModeOverride).toBe(rawDev.outdoor_mode_override);
                expect(dev.lcmBrightnessOverride).toBe(rawDev.lcm_brightness_override);
                expect(dev.lcmIdleTimeoutOverride).toBe(rawDev.lcm_idle_timeout_override);
                expect(dev.default).toBe(rawDev.default);
                expect(dev.discoveredVia).toBe(rawDev.discovered_via);
                expect(dev.adoptIp).toBe(rawDev.adopt_ip);
                expect(dev.adoptUrl).toBe(rawDev.adopt_url);
                expect(dev.disabled).toBe(rawDev.disabled);
            });
        });
        describe('LANDevice', () => {
            it('should construct LANDevice', () => {
                const dev = new LANDevice({ controller, site }, { mac: macAddress });
                expect(dev.mac).toBe(macAddress);
            });
            it('should construct LANDevice with all values', () => {
                const rawDev: Partial<ILANDeviceRaw> & { mac: string } = {
                    mac: macAddress,
                    jumboframe_enabled: false,
                    flowctrl_enabled: false,
                    stp_version: 'rstp',
                    stp_priority: '32768',
                    power_source_ctrl_enabled: false,
                    config_network_lan: {
                        cidr: '192.168.1.1/24',
                        dhcp_enabled: true,
                        dhcp_range_start: '192.168.1.6/24',
                        dhcp_range_stop: '192.168.1.254/24',
                        vlan: 10
                    },
                    ethernet_overrides: [
                        {
                            ifname: 'eth0',
                            networkgroup: 'LAN'
                        }
                    ],
                    usg_caps: 3008508,
                    temperatures: [
                        {
                            name: 'CPU',
                            type: 'cpu',
                            value: 58.25
                        },
                        {
                            name: 'Local',
                            type: 'board',
                            value: 57.25
                        },
                        {
                            name: 'PHY',
                            type: 'board',
                            value: 59.25
                        }
                    ],
                    storage: [
                        {
                            mount_point: '/mnt/persistent',
                            name: 'Backup',
                            size: 125783040,
                            type: 'eMMC',
                            used: 1591296
                        }
                    ],
                    ruleset_interfaces: {
                        br0: 'lan',
                        eth9: 'eth9',
                        eth8: 'eth8'
                    },
                    setup_provision_completed: true,
                    setup_provision_tracking: false,
                    unifi_care: {
                        state: 'NOT_AVAILABLE',
                        registration: 1610742076,
                        activation_end: null,
                        activation_url: null,
                        coverage_start: null,
                        coverage_end: null,
                        rma_url: null,
                        tracking_url: null,
                        activation_dismissed: null
                    },
                    port_overrides: [
                        {
                            port_idx: 1,
                            autoneg: true
                        }
                    ],
                    mgmt_network_id: '5f3c5a1771bcb702f7504175',
                    hostname: 'Dream-Machine-Pro',
                    snmp_contact: '',
                    snmp_location: '',
                    lcm_night_mode_begins: '22:00',
                    lcm_night_mode_ends: '08:00',
                    lcm_night_mode_enabled: true,
                    uptime_stats: {
                        WAN: {
                            availability: 100,
                            latency_average: 12,
                            time_period: 2
                        },
                        WAN2: {
                            downtime: 155994
                        }
                    },
                    overheating: false,
                    geo_info: {
                        WAN: {
                            accuracy: 200,
                            address: '51.254.200.228',
                            asn: 12322,
                            city: '',
                            continent_code: 'EU',
                            country_code: 'FR',
                            country_name: 'France',
                            isp_name: 'Free SAS',
                            isp_organization: 'Free SAS',
                            latitude: 48.574,
                            longitude: 2.4487,
                            timezone: 'Europe/Paris'
                        }
                    },
                    led_state: {
                        pattern: '1',
                        tempo: 120
                    },
                    'speedtest-status': {
                        latency: 16,
                        rundate: 1629969488,
                        runtime: 28,
                        server: {
                            cc: 'FR',
                            city: 'Paris',
                            country: 'France',
                            lat: 48.8714,
                            lon: 2.32131,
                            provider: 'OneProvider.com',
                            provider_url: 'https://www.oneprovider.com'
                        },
                        source_interface: '',
                        status_download: 2,
                        status_ping: 2,
                        status_summary: 2,
                        status_upload: 2,
                        xput_download: 131.68785095214844,
                        xput_upload: 513.23095703125
                    },
                    'speedtest-status-saved': true,
                    wan2: {
                        max_speed: 1000,
                        type: 'ethernet',
                        autoneg: true,
                        enable: true,
                        flowctrl_rx: false,
                        flowctrl_tx: false,
                        full_duplex: true,
                        is_uplink: false,
                        mac: '04:18:d6:85:ed:f2',
                        mac_table: [
                            {
                                age: 155987,
                                authorized: false,
                                hostname: '?',
                                ip: '192.168.1.1',
                                lastReachable: 8,
                                mac: '04:18:d6:85:ed:f2'
                            }
                        ],
                        media: 'GE',
                        name: 'eth8',
                        num_port: 1,
                        port_idx: 9,
                        port_poe: false,
                        rx_broadcast: 0,
                        rx_bytes: 49966966,
                        rx_dropped: 0,
                        rx_errors: 0,
                        rx_multicast: 0,
                        rx_packets: 232847,
                        rx_rate: 592,
                        'rx_rate-max': 21401,
                        speed: 1000,
                        speed_caps: 1048623,
                        tx_broadcast: 0,
                        tx_bytes: 20973404,
                        tx_dropped: 0,
                        tx_errors: 0,
                        tx_multicast: 0,
                        tx_packets: 234960,
                        tx_rate: 465,
                        'tx_rate-max': 8181,
                        up: true,
                        ifname: 'eth8',
                        'tx_bytes-r': 58,
                        'rx_bytes-r': 74,
                        'bytes-r': 132,
                        ip: '192.168.1.2',
                        netmask: '255.255.255.0',
                        dns: ['1.1.1.1', '8.8.8.8']
                    },
                    wan1: {
                        max_speed: 1000,
                        type: 'ethernet',
                        autoneg: true,
                        enable: true,
                        flowctrl_rx: false,
                        flowctrl_tx: false,
                        full_duplex: true,
                        is_uplink: true,
                        mac: '04:18:d6:85:ed:f2',
                        mac_table: [
                            {
                                age: 155987,
                                authorized: false,
                                hostname: '51-254-200-228.subs.proxad.net',
                                ip: '51.254.200.254',
                                lastReachable: 3,
                                mac: '04:18:d6:85:ed:f2'
                            }
                        ],
                        media: 'SFP+',
                        name: 'eth9',
                        num_port: 1,
                        port_idx: 10,
                        port_poe: false,
                        rx_broadcast: 0,
                        rx_bytes: 426300071286,
                        rx_dropped: 0,
                        rx_errors: 0,
                        rx_multicast: 0,
                        rx_packets: 293685867,
                        rx_rate: 300983,
                        'rx_rate-max': 2019786,
                        speed: 10000,
                        speed_caps: 1048864,
                        tx_broadcast: 0,
                        tx_bytes: 25960368084,
                        tx_dropped: 0,
                        tx_errors: 0,
                        tx_multicast: 0,
                        tx_packets: 47274982,
                        tx_rate: 74029,
                        'tx_rate-max': 932658,
                        up: true,
                        ifname: 'eth9',
                        'tx_bytes-r': 9253,
                        'rx_bytes-r': 37622,
                        'bytes-r': 46875,
                        ip: '51.254.200.228',
                        netmask: '255.255.255.0',
                        dns: ['1.1.1.1', '8.8.8.8']
                    },
                    network_table: [
                        {
                            _id: '6001f8ab3fd98c05e9465fa4',
                            attr_no_delete: true,
                            attr_hidden_id: 'LAN',
                            name: 'LAN',
                            site_id: '6001f8a73fd98c05e9465f91',
                            vlan_enabled: false,
                            purpose: 'corporate',
                            ip_subnet: '192.168.1.1/24',
                            ipv6_interface_type: 'none',
                            domain_name: 'dev.lan',
                            is_nat: true,
                            dhcpd_enabled: true,
                            dhcpd_start: '192.168.1.200',
                            dhcpd_stop: '192.168.1.254',
                            dhcpdv6_enabled: false,
                            ipv6_ra_enabled: false,
                            lte_lan_enabled: true,
                            auto_scale_enabled: true,
                            networkgroup: 'LAN',
                            dhcpd_dns_enabled: false,
                            dhcpd_leasetime: 0,
                            dhcp_relay_enabled: false,
                            dhcpd_boot_enabled: false,
                            dhcpd_gateway_enabled: false,
                            dhcpd_ntp_enabled: false,
                            dhcpd_tftp_server: '',
                            dhcpd_time_offset_enabled: false,
                            dhcpd_unifi_controller: '',
                            dhcpguard_enabled: false,
                            dhcpd_wpad_url: '',
                            enabled: true,
                            igmp_snooping: false,
                            upnp_lan_enabled: false,
                            gateway_type: 'default',
                            is_guest: false,
                            ip: '192.168.1.1',
                            mac: '04:18:d6:85:ed:f2',
                            up: true,
                            active_dhcp_lease_count: 28,
                            gateway_interface_name: 'br0',
                            dpistats_table: {
                                last_updated: 1629992174,
                                by_cat: [
                                    {
                                        cat: 0,
                                        apps: [39, 41],
                                        rx_bytes: 350376632,
                                        tx_bytes: 34921414,
                                        rx_packets: 255265,
                                        tx_packets: 266511
                                    }
                                ],
                                by_app: [
                                    {
                                        app: 1,
                                        cat: 6,
                                        clients: [
                                            {
                                                mac: '04:18:d6:85:ed:f2',
                                                rx_bytes: 64036,
                                                tx_bytes: 20874,
                                                rx_packets: 104,
                                                tx_packets: 114
                                            },
                                            {
                                                mac: '04:18:d6:85:ed:f2',
                                                rx_bytes: 38357,
                                                tx_bytes: 10025,
                                                rx_packets: 65,
                                                tx_packets: 60
                                            }
                                        ],
                                        known_clients: 2,
                                        rx_bytes: 102393,
                                        tx_bytes: 30899,
                                        rx_packets: 169,
                                        tx_packets: 174
                                    }
                                ]
                            },
                            num_sta: 25,
                            rx_bytes: 141663626857,
                            rx_packets: 205909885,
                            tx_bytes: 460391032668,
                            tx_packets: 319072743
                        }
                    ],
                    x_inform_authkey: '',
                    'wlan-num_sta': 0,
                    'lan-num_sta': 35,
                    'guest-lan-num_sta': 0,
                    'user-lan-num_sta': 35,
                    anomalies: -1,
                    num_desktop: 0,
                    num_mobile: 0,
                    num_handheld: 0,
                    total_max_power: 0,
                    dhcp_server_table: [],
                    uplink_depth: 3
                };
                const dev = new LANDevice({ controller, site }, rawDev);
                expect(dev.mac).toBe(rawDev.mac);
                expect(dev.jumboFrameEnabled).toBe(rawDev.jumboframe_enabled);
                expect(dev.flowctrlEnabled).toBe(rawDev.flowctrl_enabled);
                expect(dev.stpVersion).toBe(rawDev.stp_version);
                expect(dev.stpPriority).toBe(rawDev.stp_priority);
                expect(dev.powerSourceCtrlEnabled).toBe(rawDev.power_source_ctrl_enabled);
                expect(dev.configNetworkLAN).toBe(rawDev.config_network_lan);
                expect(dev.ethernetOverrides).toBe(rawDev.ethernet_overrides);
                expect(dev.usgCaps).toBe(rawDev.usg_caps);
                expect(dev.temperatures).toBe(rawDev.temperatures);
                expect(dev.storage).toBe(rawDev.storage);
                expect(dev.rulesetInterfaces).toBe(rawDev.ruleset_interfaces);
                expect(dev.setupProvisionCompleted).toBe(rawDev.setup_provision_completed);
                expect(dev.setupProvisionTracking).toBe(rawDev.setup_provision_tracking);
                expect(dev.unifiCare).toBe(rawDev.unifi_care);
                expect(dev.portOverrides).toBe(rawDev.port_overrides);
                expect(dev.mgmtNetworkId).toBe(rawDev.mgmt_network_id);
                expect(dev.hostname).toBe(rawDev.hostname);
                expect(dev.snmpContact).toBe(rawDev.snmp_contact);
                expect(dev.snmpLocation).toBe(rawDev.snmp_location);
                expect(dev.lcmNightModeBegins).toBe(rawDev.lcm_night_mode_begins);
                expect(dev.lcmNightModeEnds).toBe(rawDev.lcm_night_mode_ends);
                expect(dev.lcmNightModeEnabled).toBe(rawDev.lcm_night_mode_enabled);
                expect(dev.uptimeStats).toBe(rawDev.uptime_stats);
                expect(dev.overheating).toBe(rawDev.overheating);
                expect(dev.geoInfo).toBe(rawDev.geo_info);
                expect(dev.LEDState).toBe(rawDev.led_state);
                expect(dev.speedTest).toBe(rawDev['speedtest-status']);
                expect(dev.speedTestSaved).toBe(rawDev['speedtest-status-saved']);
                expect(dev.wan2).toBe(rawDev.wan2);
                expect(dev.wan1).toBe(rawDev.wan1);
                expect(dev.networkTable).toBe(rawDev.network_table);
                expect(dev.xInformAuthkey).toBe(rawDev.x_inform_authkey);
                expect(dev.wlanNumSta).toBe(rawDev['wlan-num_sta']);
                expect(dev.lanNumSta).toBe(rawDev['lan-num_sta']);
                expect(dev.guestLanNumSta).toBe(rawDev['guest-lan-num_sta']);
                expect(dev.userLanNumSta).toBe(rawDev['user-lan-num_sta']);
                expect(dev.anomalies).toBe(rawDev.anomalies);
                expect(dev.numDesktop).toBe(rawDev.num_desktop);
                expect(dev.numMobile).toBe(rawDev.num_mobile);
                expect(dev.numHandheld).toBe(rawDev.num_handheld);
                expect(dev.totalMaxPower).toBe(rawDev.total_max_power);
                expect(dev.DHCPServerTable).toBe(rawDev.dhcp_server_table);
                expect(dev.uplinkDepth).toBe(rawDev.uplink_depth);
            });
            it('should pass update device to parent', () => {
                const updateDeviceMock = jest.fn();
                const dev = new LANDevice({ controller, site }, { mac: macAddress });
                // @ts-ignore
                dev._updateDevice = updateDeviceMock;

                dev.updateDevice({ name: 'test' });

                expect(updateDeviceMock).toHaveBeenCalledWith({ name: 'test' });
            });
        });

        describe('UAPDevice', () => {
            it('should construct with only mac', () => {
                const dev = new UAPDevice({ controller, site }, { mac: macAddress });
                expect(dev.mac).toBe(macAddress);
            });
            it('should construct UAPDevice with full values', () => {
                const rawDev: Partial<IWLANDeviceRaw> & IBaseDeviceMandatoryRaw = {
                    mac: macAddress,
                    x_vwirekey: 'aaaaaaaaaaaaaaaaa',
                    vwire_table: [],
                    antenna_table: [
                        {
                            default: true,
                            id: 4,
                            name: 'Combined',
                            ra0_gain: 3,
                            rai0_gain: 3
                        }
                    ],
                    radio_table: [
                        {
                            radio: 'ng',
                            name: 'ra0',
                            max_txpower: 23,
                            min_txpower: 6,
                            nss: 4,
                            radio_caps: 67256324,
                            radio_caps2: 1,
                            builtin_antenna: true,
                            builtin_ant_gain: 3,
                            current_antenna_gain: 0
                        },
                        {
                            radio: 'na',
                            name: 'rai0',
                            channel: 44,
                            backup_channel: 0,
                            ht: '40',
                            max_txpower: 26,
                            min_txpower: 6,
                            nss: 4,
                            is_11ac: true,
                            is_11ax: true,
                            has_dfs: true,
                            has_fccdfs: true,
                            has_ht160: true,
                            radio_caps: 251805700,
                            radio_caps2: 15,
                            builtin_antenna: true,
                            builtin_ant_gain: 3,
                            current_antenna_gain: 0
                        }
                    ],
                    scan_radio_table: [],
                    country_code: 0,
                    countrycode_table: [],
                    wlangroup_id_na: '',
                    wlangroup_id_ng: '',
                    acc_meter_stats: {
                        x: 40,
                        y: -1008,
                        z: 40
                    },
                    supports_fingerprint_ml: false,
                    disconnection_reason: '',
                    scanning: false,
                    spectrum_scanning: false,
                    meshv3_peer_mac: '',
                    element_peer_mac: '',
                    hide_ch_width: '',
                    isolated: false,
                    radio_table_stats: [
                        {
                            name: 'rai0',
                            channel: 44,
                            radio: 'na',
                            ast_txto: null,
                            ast_cst: null,
                            ast_be_xmit: null,
                            cu_total: 11,
                            cu_self_rx: 9,
                            cu_self_tx: 1,
                            gain: 3,
                            satisfaction: 98,
                            state: 'RUN',
                            extchannel: 1,
                            tx_power: 20,
                            tx_packets: 0,
                            tx_retries: 14,
                            num_sta: 8,
                            'guest-num_sta': 0,
                            'user-num_sta': 8
                        }
                    ],
                    port_stats: [],
                    vap_table: [
                        {
                            anomalies_bar_chart: {
                                high_disconnect_count: 0,
                                high_dns_latency: 0,
                                high_icmp_rtt: 0,
                                high_tcp_latency: 0,
                                high_tcp_packet_loss: 0,
                                high_wifi_latency: 0,
                                high_wifi_retries: 0,
                                low_phy_rate: 0,
                                poor_stream_eff: 0,
                                sleepy_client: 0,
                                sta_arp_timeout: 0,
                                sta_dns_timeout: 0,
                                sta_ip_timeout: 0,
                                weak_signal: 0
                            },
                            anomalies_bar_chart_now: {
                                high_disconnect_count: 0,
                                high_dns_latency: 0,
                                high_icmp_rtt: 0,
                                high_tcp_latency: 0,
                                high_tcp_packet_loss: 0,
                                high_wifi_latency: 0,
                                high_wifi_retries: 0,
                                low_phy_rate: 0,
                                poor_stream_eff: 0,
                                sleepy_client: 0,
                                sta_arp_timeout: 0,
                                sta_dns_timeout: 0,
                                sta_ip_timeout: 0,
                                weak_signal: 0
                            },
                            avg_client_signal: -57,
                            bssid: '04:18:d6:85:ed:f2',
                            bw: 40,
                            ccq: 0,
                            channel: 44,
                            dns_avg_latency: -1,
                            essid: 'thib3113',
                            extchannel: 1,
                            icmp_avg_rtt: -1,
                            id: '60180460d5d24e03f8d48ac6',
                            mac_filter_rejections: 0,
                            name: 'rai2',
                            num_satisfaction_sta: 1,
                            num_sta: 1,
                            radio: 'na',
                            radio_name: 'rai0',
                            reasons_bar_chart: {
                                phy_rate: 1,
                                signal: 0,
                                sleepy_client: 0,
                                sta_arp_timeout: 0,
                                sta_disconnects: 0,
                                sta_dns_latency: 0,
                                sta_dns_timeout: 0,
                                sta_icmp_rtt: 0,
                                sta_ip_timeout: 0,
                                stream_eff: 0,
                                tcp_latency: 0,
                                tcp_packet_loss: 0,
                                wifi_latency: 0,
                                wifi_retries: 0
                            },
                            reasons_bar_chart_now: {
                                phy_rate: 1,
                                signal: 0,
                                sleepy_client: 0,
                                sta_arp_timeout: 0,
                                sta_disconnects: 0,
                                sta_dns_latency: 0,
                                sta_dns_timeout: 0,
                                sta_icmp_rtt: 0,
                                sta_ip_timeout: 0,
                                stream_eff: 0,
                                tcp_latency: 0,
                                tcp_packet_loss: 0,
                                wifi_latency: 0,
                                wifi_retries: 0
                            },
                            rx_bytes: 4513009,
                            rx_crypts: 0,
                            rx_dropped: 0,
                            rx_errors: 0,
                            rx_frags: 0,
                            rx_nwids: 0,
                            rx_packets: 40668,
                            rx_tcp_stats: {
                                goodbytes: 0,
                                lat_avg: -1,
                                lat_max: -1,
                                lat_min: -1,
                                lat_samples: 0,
                                lat_sum: 0,
                                stalls: 0
                            },
                            satisfaction: 99,
                            state: 'RUN',
                            tx_bytes: 22094829,
                            tx_combined_retries: 220,
                            tx_data_mpdu_bytes: 0,
                            tx_dropped: 8,
                            tx_errors: 0,
                            tx_packets: 43811,
                            tx_power: 20,
                            tx_retries: 220,
                            tx_rts_retries: 0,
                            tx_success: 0,
                            tx_tcp_stats: {
                                goodbytes: 0,
                                lat_avg: -1,
                                lat_max: -1,
                                lat_min: -1,
                                lat_samples: 0,
                                lat_sum: 0,
                                stalls: 0
                            },
                            tx_total: 0,
                            up: true,
                            usage: 'user',
                            wifi_tx_attempts: 2578,
                            wifi_tx_dropped: 0,
                            t: 'vap',
                            wlanconf_id: '60180460d5d24e03f8d48ac6',
                            is_guest: false,
                            is_wep: false,
                            ap_mac: '04:18:d6:85:ed:f2',
                            map_id: null,
                            site_id: '6001f8a73fd98c05e9465f91'
                        }
                    ],
                    vwire_vap_table: [],
                    'bytes-d': 23633193,
                    'tx_bytes-d': 345891,
                    'rx_bytes-d': 23287302,
                    'bytes-r': 1390187,
                    last_scan: 1629969198,
                    vwireEnabled: false,
                    uplink_table: []
                };
                const dev = new UAPDevice({ controller, site }, rawDev);
                expect(dev.mac).toBe(rawDev.mac);
                expect(dev.xVwirekey).toBe(rawDev.x_vwirekey);
                expect(dev.vwireTable).toBe(rawDev.vwire_table);
                expect(dev.antennaTable).toBe(rawDev.antenna_table);
                expect(dev.radioTable).toBe(rawDev.radio_table);
                expect(dev.scanRadioTable).toBe(rawDev.scan_radio_table);
                expect(dev.countryCode).toBe(rawDev.country_code);
                expect(dev.countrycodeTable).toBe(rawDev.countrycode_table);
                expect(dev.wlangroupIdNa).toBe(rawDev.wlangroup_id_na);
                expect(dev.wlangroupIdNg).toBe(rawDev.wlangroup_id_ng);
                expect(dev.accMeterStats).toBe(rawDev.acc_meter_stats);
                expect(dev.supportsFingerprintMl).toBe(rawDev.supports_fingerprint_ml);
                expect(dev.disconnectionReason).toBe(rawDev.disconnection_reason);
                expect(dev.scanning).toBe(rawDev.scanning);
                expect(dev.spectrumScanning).toBe(rawDev.spectrum_scanning);
                expect(dev.meshv3PeerMAC).toBe(rawDev.meshv3_peer_mac);
                expect(dev.elementPeerMAC).toBe(rawDev.element_peer_mac);
                expect(dev.hideChWidth).toBe(rawDev.hide_ch_width);
                expect(dev.isolated).toBe(rawDev.isolated);
                expect(dev.radioTableStats).toBe(rawDev.radio_table_stats);
                expect(dev.portStats).toBe(rawDev.port_stats);
                expect(dev.vapTable).toBe(rawDev.vap_table);
                expect(dev.vwireVapTable).toBe(rawDev.vwire_vap_table);
                expect(dev.lastScan).toBe(rawDev.last_scan);
                expect(dev.vwireEnabled).toBe(rawDev.vwireEnabled);
                expect(dev.uplinkTable).toBe(rawDev.uplink_table);
            });
            it('should pass update device to parent', () => {
                const updateDeviceMock = jest.fn();
                const dev = new UAPDevice({ controller, site }, { mac: macAddress });
                // @ts-ignore
                dev._updateDevice = updateDeviceMock;

                dev.updateDevice({ name: 'test' });

                expect(updateDeviceMock).toHaveBeenCalledWith({ name: 'test' });
            });
            it('should enable the device', () => {
                const updateDeviceMock = jest.fn();
                const dev = new UAPDevice({ controller, site }, { mac: macAddress });
                dev.updateDevice = updateDeviceMock;

                dev.enable();

                expect(updateDeviceMock).toHaveBeenCalledWith({ disabled: false });
            });
            it('should disable the device', () => {
                const updateDeviceMock = jest.fn();
                const dev = new UAPDevice({ controller, site }, { mac: macAddress });
                dev.updateDevice = updateDeviceMock;

                dev.enable(false);

                expect(updateDeviceMock).toHaveBeenCalledWith({ disabled: true });
            });
        });
        it('should construct UBBDevice', () => {
            const dev = new UBBDevice({ controller, site }, { mac: macAddress });
        });
        it('should construct UDMDevice', () => {
            const dev = new UDMDevice({ controller, site }, { mac: macAddress });
        });
        it('should construct UGWDevice', () => {
            const dev = new UGWDevice({ controller, site }, { mac: macAddress });
        });
        it('should construct USWDevice', () => {
            const dev = new USWDevice({ controller, site }, { mac: macAddress });
        });
        it('should construct UXGDevice', () => {
            const dev = new UXGDevice({ controller, site }, { mac: macAddress });
        });
    });
    describe('functions', () => {
        let dev: BaseDevice;
        const devManagerMock = jest.fn();
        beforeEach(() => {
            dev = new BaseDevice({ controller, site }, { mac: macAddress });

            // @ts-ignore
            dev.site = {
                devManager: devManagerMock,
                getInstance: jest.fn().mockImplementation(() => mockedAxios)
            };
        });
        describe('reboot', () => {
            it('should send reboot method', async () => {
                devManagerMock.mockImplementationOnce(() =>
                    Promise.resolve({
                        meta: {
                            rc: 'ok'
                        }
                    })
                );
                expect(await dev.reboot('hard')).toBeTruthy();
                expect(devManagerMock).toHaveBeenCalledWith({ cmd: 'restart', mac: '04:18:d6:85:ed:f2', reboot_type: 'hard' });

                devManagerMock.mockClear();
            });
            it('should fail reboot method', async () => {
                devManagerMock.mockImplementationOnce(() =>
                    Promise.resolve({
                        meta: {
                            rc: 'fail'
                        }
                    })
                );
                expect(await dev.reboot()).toBeFalsy();
                expect(devManagerMock).toHaveBeenCalledWith({ cmd: 'restart', mac: '04:18:d6:85:ed:f2', reboot_type: 'soft' });

                devManagerMock.mockClear();
            });
        });
        it('force provision', async () => {
            await dev.forceProvision();
            expect(devManagerMock).toHaveBeenCalledWith({
                cmd: 'force-provision',
                mac: macAddress
            });
        });
        describe('setLedOverride', () => {
            const updateDeviceMock = jest.fn();
            beforeEach(() => {
                dev.updateDevice = updateDeviceMock;
            });
            it('should allow partial call', async () => {
                await dev.setLedOverride({});
                expect(updateDeviceMock).toHaveBeenCalledWith({});
            });
            it('should change the mode', async () => {
                await dev.setLedOverride({
                    mode: 'off'
                });
                expect(updateDeviceMock).toHaveBeenCalledWith({
                    led_override: 'off'
                });
            });
            describe('color', () => {
                it('should override the color', async () => {
                    await dev.setLedOverride({ color: '#CCCCCC' });
                    expect(updateDeviceMock).toHaveBeenCalledWith({ led_override_color: '#CCCCCC' });
                });
                it('should refuse an invalid color', async () => {
                    expect.assertions(4);
                    try {
                        await dev.setLedOverride({ color: 'white' });
                    } catch (e) {
                        expect(e).toBeInstanceOf(ClientError);
                        expect(e.message).toBe('color need to be in hexadecimal format');
                        expect(e.code).toBe(EErrorsCodes.BAD_PARAMETERS);
                        expect(updateDeviceMock).not.toHaveBeenCalled();
                    }
                });
            });
            describe('brightness', () => {
                it('should override the color', async () => {
                    await dev.setLedOverride({ brightness: 100 });
                    expect(updateDeviceMock).toHaveBeenCalledWith({ led_override_color_brightness: 100 });
                });
                it('should refuse a non-number brightness', async () => {
                    expect.assertions(4);
                    try {
                        // @ts-ignore
                        await dev.setLedOverride({ brightness: '10' });
                    } catch (e) {
                        expect(e).toBeInstanceOf(ClientError);
                        expect(e.message).toBe('brightness need to be a positive number');
                        expect(e.code).toBe(EErrorsCodes.BAD_PARAMETERS);
                        expect(updateDeviceMock).not.toHaveBeenCalled();
                    }
                });
                it('should refuse a negative number brightness', async () => {
                    expect.assertions(4);
                    try {
                        await dev.setLedOverride({ brightness: -5 });
                    } catch (e) {
                        expect(e).toBeInstanceOf(ClientError);
                        expect(e.message).toBe('brightness need to be a positive number');
                        expect(e.code).toBe(EErrorsCodes.BAD_PARAMETERS);
                        expect(updateDeviceMock).not.toHaveBeenCalled();
                    }
                });
            });
        });

        describe('locate', () => {
            it('should disable locate mode', async () => {
                devManagerMock.mockImplementationOnce(() => Promise.resolve({ meta: { rc: 'ok' } }));
                expect(await dev.locate(false)).toBeTruthy();
                expect(devManagerMock).toHaveBeenCalledWith({
                    cmd: 'unset-locate',
                    mac: macAddress
                });
            });
            it('should enable locate mode', async () => {
                devManagerMock.mockImplementationOnce(() => Promise.resolve({ meta: { rc: 'ok' } }));
                expect(await dev.locate()).toBeTruthy();
                expect(devManagerMock).toHaveBeenCalledWith({
                    cmd: 'set-locate',
                    mac: macAddress
                });
            });
            it('should fail to enable locate mode', async () => {
                devManagerMock.mockImplementationOnce(() => Promise.resolve({ meta: { rc: 'fail' } }));
                expect(await dev.locate()).toBeFalsy();
                expect(devManagerMock).toHaveBeenCalledWith({
                    cmd: 'set-locate',
                    mac: macAddress
                });
            });
        });

        it('updateDevice', () => {
            const updateDeviceMock = jest.fn();
            // @ts-ignore
            dev._updateDevice = updateDeviceMock;
            // @ts-ignore
            dev.updateDevice({ foo: 'bar' });
            expect(updateDeviceMock).toHaveBeenCalledWith({ foo: 'bar' });
        });

        describe('_updateDevice', () => {
            const importMock = jest.fn();
            beforeEach(() => {
                dev.import = importMock;
            });
            it('should put the data', async () => {
                mockedAxios.put.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            data: [
                                {
                                    model: 'UDMPRO2'
                                }
                            ]
                        }
                    })
                );

                dev._id = 'aaaaaaa';

                expect(await dev.updateDevice({ model: 'UDMPRO2' })).toBe(dev);

                expect(importMock).toBeCalledWith({ model: 'UDMPRO2' });
                expect(mockedAxios.put).toHaveBeenCalledWith('/rest/device/:_id', { model: 'UDMPRO2' }, { urlParams: { _id: 'aaaaaaa' } });
            });
            it('should return empty data', async () => {
                mockedAxios.put.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            data: []
                        }
                    })
                );

                dev._id = 'aaaaaaa';

                expect(await dev.updateDevice({ model: 'UDMPRO2' })).toBe(dev);

                expect(importMock).not.toBeCalled();
                expect(mockedAxios.put).toHaveBeenCalledWith('/rest/device/:_id', { model: 'UDMPRO2' }, { urlParams: { _id: 'aaaaaaa' } });
            });
        });
    });
});
