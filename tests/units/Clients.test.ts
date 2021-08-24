import { Client, ClientError, EErrorsCodes } from '../../src';
import { controller, site } from '../mocks';
import { macAddress } from '../globals';
import axios from 'axios';

const clientRaw = {
    _id: '6059229dc3d8180463a57109',
    mac: macAddress,
    use_fixedip: true,
    fixed_ip: '192.168.1.3',
    site_id: '6001f8a73fd98c05e9465f91',
    is_wired: true,
    is_guest: false,
    oui: 'D-Link',
    noted: false,
    assoc_time: 1629481568,
    latest_assoc_time: 1629481569,
    user_id: '6001f1004fd98c05fa465fe5',
    first_seen: 1610742016,
    last_seen: 1629568957,
    hostname: 'ubnt',
    name: 'ubnt',
    note: '',
    usergroup_id: '',
    network_id: '6001f8ab3fd98c05e9465fa4',
    device_name: 'Google Pixel XL',
    fingerprint_override: true,
    dev_id_override: 2663,
    fingerprint_source: 0,
    dev_id: 234,
    dev_vendor: 234,
    os_name: 1,
    dev_type_id: 12,
    dev_family: 7,
    fb_id: 0,
    tm_id: 0,
    ctag_id: 101,
    dev_cat: 1,
    confidence: 99,
    fingerprint_engine_version: '1.0.2',
    _uptime_by_ugw: 87389,
    _last_seen_by_ugw: 1629568957,
    _is_guest_by_ugw: false,
    gw_mac: macAddress,
    network: 'LAN',
    uptime: 87389,
    tx_bytes: 343324422,
    rx_bytes: 6983966344,
    tx_packets: 2976772,
    tx_retries: 0,
    wifi_tx_attempts: 0,
    rx_packets: 3242216,
    'tx_bytes-r': 5167,
    'rx_bytes-r': 39144,
    qos_policy_applied: true,
    _uptime_by_usw: 87389,
    _last_seen_by_usw: 1629568957,
    _is_guest_by_usw: false,
    sw_mac: macAddress,
    sw_depth: 1,
    sw_port: 1,
    wired_rate_mbps: 10000,
    ip: '192.168.1.3',
    anomalies: -1,
    satisfaction: 100,
    'wired-tx_bytes': 59353757003,
    'wired-rx_bytes': 5507658927,
    'wired-tx_packets': 43810533,
    'wired-rx_packets': 17962055,
    'wired-tx_bytes-r': 1673277,
    'wired-rx_bytes-r': 23602,
    'bytes-r': 44311,
    fw_version: '',
    score: 73,
    blocked: false,
    _uptime_by_uap: 178391,
    _last_seen_by_uap: 1629568948,
    _is_guest_by_uap: false,
    ap_mac: macAddress,
    channel: 6,
    radio: 'ng',
    radio_name: 'ra0',
    essid: 'thib3113-wifi',
    bssid: macAddress,
    powersave_enabled: true,
    is_11r: false,

    user_group_id_computed: '6001f8ab3fd98c05e9465fa4',
    ccq: 0,
    rssi: 51,
    noise: -96,
    signal: -45,
    tx_rate: 72000,
    rx_rate: 72000,
    tx_power: 0,
    idletime: 37,
    dhcpend_time: 790276194,
    anon_client_id: '6001f8ab3fd98c05e9465fa4',
    tx_mcs: 7,
    vlan: 0,
    radio_proto: 'ng'
};
describe('Client', () => {
    describe('construct', () => {
        it('init with global values', () => {
            const client = new Client({ controller, site }, clientRaw);
            expect(client.mac).toBe(clientRaw.mac);
            expect(client._id).toBe(clientRaw._id);
            expect(client.mac).toBe(clientRaw.mac);
            expect(client.useFixedIp).toBe(clientRaw.use_fixedip);
            expect(client.fixedIp).toBe(clientRaw.fixed_ip);
            expect(client.siteId).toBe(clientRaw.site_id);
            expect(client.isWired).toBe(clientRaw.is_wired);
            expect(client.isGuest).toBe(clientRaw.is_guest);
            expect(client.oui).toBe(clientRaw.oui);
            expect(client.noted).toBe(clientRaw.noted);
            expect(client.assocTime).toStrictEqual(new Date('2021-08-20T17:46:08.000Z'));
            expect(client.latestAssocTime).toStrictEqual(new Date('2021-08-20T17:46:09.000Z'));
            expect(client.userId).toBe(clientRaw.user_id);
            expect(client.firstSeen).toStrictEqual(new Date('2021-01-15T20:20:16.000Z'));
            expect(client.lastSeen).toStrictEqual(new Date('2021-08-21T18:02:37.000Z'));
            expect(client.hostname).toBe(clientRaw.hostname);
            expect(client.name).toBe(clientRaw.name);
            expect(client.note).toBe(clientRaw.note);
            expect(client.groupId).toBe(clientRaw.usergroup_id);
            expect(client.networkId).toBe(clientRaw.network_id);
            expect(client.confidence).toBe(clientRaw.confidence);
            expect(client._uptimeByUGW).toBe(clientRaw._uptime_by_ugw);
            expect(client._lastSeenByUGW).toStrictEqual(new Date('2021-08-21T18:02:37.000Z'));
            expect(client._isGuestByUGW).toBe(false);
            expect(client.gwMac).toBe(clientRaw.gw_mac);
            expect(client.network).toBe(clientRaw.network);
            expect(client.uptime).toBe(clientRaw.uptime);
            expect(client.txBytes).toBe(clientRaw.tx_bytes);
            expect(client.rxBytes).toBe(clientRaw.rx_bytes);
            expect(client.txPackets).toBe(clientRaw.tx_packets);
            expect(client.txRetries).toBe(clientRaw.tx_retries);
            expect(client.wifiTxAttempts).toBe(clientRaw.wifi_tx_attempts);
            expect(client.rxPackets).toBe(clientRaw.rx_packets);
            expect(client.txBytesR).toBe(clientRaw['tx_bytes-r']);
            expect(client.rxBytesR).toBe(clientRaw['rx_bytes-r']);
            expect(client.qosPolicyApplied).toBe(clientRaw.qos_policy_applied);
            expect(client._uptimeByUSW).toBe(clientRaw._uptime_by_usw);
            expect(client._lastSeenByUSW).toStrictEqual(new Date('2021-08-21T18:02:37.000Z'));
            expect(client._isGuestByUSW).toBe(clientRaw._is_guest_by_usw);
            expect(client.swMac).toBe(clientRaw.sw_mac);
            expect(client.swDepth).toBe(clientRaw.sw_depth);
            expect(client.swPort).toBe(clientRaw.sw_port);
            expect(client.wiredRateMbps).toBe(clientRaw.wired_rate_mbps);
            expect(client.ip).toBe(clientRaw.ip);
            expect(client.anomalies).toBe(clientRaw.anomalies);
            expect(client.satisfaction).toBe(clientRaw.satisfaction);
            expect(client.wiredTxBytes).toBe(clientRaw['wired-tx_bytes']);
            expect(client.wiredRxBytes).toBe(clientRaw['wired-rx_bytes']);
            expect(client.wiredTxPackets).toBe(clientRaw['wired-tx_packets']);
            expect(client.wiredRxPackets).toBe(clientRaw['wired-rx_packets']);
            expect(client.wiredTxBytesR).toBe(clientRaw['wired-tx_bytes-r']);
            expect(client.wiredRxBytesR).toBe(clientRaw['wired-rx_bytes-r']);
            expect(client.bytesR).toBe(clientRaw['bytes-r']);
            expect(client.firmwareVersion).toBe(clientRaw.fw_version);
            expect(client.score).toBe(clientRaw.score);
            expect(client.blocked).toBe(clientRaw.blocked);
            expect(client._uptimeByUAP).toBe(clientRaw._uptime_by_uap);
            expect(client._lastSeenByUAP).toStrictEqual(new Date('2021-08-21T18:02:28.000Z'));
            expect(client._isGuestByUAP).toBe(clientRaw._is_guest_by_uap);
            expect(client.apMac).toBe(clientRaw.ap_mac);
            expect(client.channel).toBe(clientRaw.channel);
            expect(client.radio).toBe(clientRaw.radio);
            expect(client.radioName).toBe(clientRaw.radio_name);
            expect(client.radioProto).toBe(clientRaw.radio_proto);
            expect(client.userGroupIdComputed).toBe(clientRaw.user_group_id_computed);
            expect(client.ccq).toBe(clientRaw.ccq);
            expect(client.rssi).toBe(clientRaw.rssi);
            expect(client.noise).toBe(clientRaw.noise);
            expect(client.signal).toBe(clientRaw.signal);
            expect(client.txRate).toBe(clientRaw.tx_rate);
            expect(client.rxRate).toBe(clientRaw.rx_rate);
            expect(client.txPower).toBe(clientRaw.tx_power);
            expect(client.idletime).toBe(clientRaw.idletime);
            expect(client.dhcpendTime).toBe(clientRaw.dhcpend_time);
            expect(client.anonClientId).toBe(clientRaw.anon_client_id);
            expect(client.txMcs).toBe(clientRaw.tx_mcs);
            expect(client.vlan).toBe(clientRaw.vlan);
            expect(client.radioProto).toBe(clientRaw.radio_proto);
        });
        it('should force a mac', () => {
            try {
                // @ts-ignore
                new Client({ controller, site }, {});
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('mac is needed');
            }
        });
        it('should build device part', () => {
            const client = new Client(
                { controller, site },
                {
                    mac: macAddress,
                    fingerprint_source: clientRaw.fingerprint_source,
                    dev_cat: clientRaw.dev_cat,
                    dev_family: clientRaw.dev_family,
                    os_name: clientRaw.os_name,
                    dev_vendor: clientRaw.dev_vendor,
                    dev_id: clientRaw.dev_id,
                    fingerprint_engine_version: clientRaw.fingerprint_engine_version,
                    device_name: clientRaw.device_name
                }
            );

            expect(client.device).toStrictEqual({
                _fingerPrintSource: clientRaw.fingerprint_source,
                _fingerprintEngineVersion: clientRaw.fingerprint_engine_version,
                category: clientRaw.dev_cat,
                family: clientRaw.dev_family,
                id: clientRaw.dev_id,
                name: clientRaw.device_name,
                os: clientRaw.os_name,
                vendor: clientRaw.dev_vendor
            });

            client.import({
                dev_id_override: 123,
                fingerprint_override: true
            });

            expect(client.device).toStrictEqual({
                _original: {
                    _fingerPrintSource: clientRaw.fingerprint_source,
                    _fingerprintEngineVersion: clientRaw.fingerprint_engine_version,
                    category: clientRaw.dev_cat,
                    family: clientRaw.dev_family,
                    id: clientRaw.dev_id,
                    name: clientRaw.device_name,
                    os: clientRaw.os_name,
                    vendor: clientRaw.dev_vendor
                },
                _overridden: true,
                id: 123
            });

            client.import({
                dev_id_override: 234
            });

            expect(client.device).toStrictEqual({
                _original: {
                    _fingerPrintSource: clientRaw.fingerprint_source,
                    _fingerprintEngineVersion: clientRaw.fingerprint_engine_version,
                    category: clientRaw.dev_cat,
                    family: clientRaw.dev_family,
                    id: clientRaw.dev_id,
                    name: clientRaw.device_name,
                    os: clientRaw.os_name,
                    vendor: clientRaw.dev_vendor
                },
                _overridden: true,
                id: 234
            });
        });
    });

    describe('functions', () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        let client: Client;
        beforeEach(() => {
            (mockedAxios as unknown as jest.Mock).mockClear();
            client = new Client({ controller, site }, clientRaw);
        });
        describe('forget', () => {
            beforeEach(() => {
                mockedAxios.post.mockReset();
            });
            it('should fail', async () => {
                // @ts-ignore
                client.mapObject = jest.fn().mockImplementation((a) => a);
                mockedAxios.post.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            meta: { rc: 'fail' },
                            data: [clientRaw]
                        }
                    })
                );

                expect(await client.forget()).toBeFalsy();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/cmd/stamgr',
                    { cmd: 'forget-sta', macs: [clientRaw.mac] },
                    { timeout: 600000 }
                );

                mockedAxios.post.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            data: [clientRaw]
                        }
                    })
                );

                expect(await client.forget()).toBeFalsy();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/cmd/stamgr',
                    { cmd: 'forget-sta', macs: [clientRaw.mac] },
                    { timeout: 600000 }
                );

                mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

                expect(await client.forget()).toBeFalsy();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/cmd/stamgr',
                    { cmd: 'forget-sta', macs: [clientRaw.mac] },
                    { timeout: 600000 }
                );
            });

            it('should works', async () => {
                // @ts-ignore
                client.mapObject = jest.fn().mockImplementation((a) => a);
                mockedAxios.post.mockImplementationOnce(() => {
                    return Promise.resolve({
                        data: {
                            meta: {
                                rc: 'ok'
                            },
                            data: [clientRaw]
                        }
                    });
                });

                const forget = await client.forget();

                expect(forget).toBeTruthy();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/cmd/stamgr',
                    { cmd: 'forget-sta', macs: [clientRaw.mac] },
                    { timeout: 600000 }
                );
            });
        });
        describe('save', () => {
            it('should not update note if not updated', async () => {
                mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
                await client.save();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/upd/user/:id',
                    //no note
                    { fixed_ip: '192.168.1.3', name: 'ubnt', use_fixedip: true, user_group_id: '', usergroup_id: '' },
                    { urlParams: { id: '6059229dc3d8180463a57109', site: 'name' } }
                );
            });

            it('should update note if updated', async () => {
                mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
                client.note = 'test';
                await client.save();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/upd/user/:id',
                    {
                        fixed_ip: '192.168.1.3',
                        name: 'ubnt',
                        //note and noted
                        note: 'test',
                        noted: true,
                        use_fixedip: true,
                        user_group_id: '',
                        usergroup_id: ''
                    },
                    { urlParams: { id: '6059229dc3d8180463a57109', site: 'name' } }
                );
            });
            it('should set a default name', async () => {
                mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
                // @ts-ignore
                client.name = false;
                await client.save();
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/upd/user/:id',
                    //no note
                    { fixed_ip: '192.168.1.3', name: '', use_fixedip: true, user_group_id: '', usergroup_id: '' },
                    { urlParams: { id: '6059229dc3d8180463a57109', site: 'name' } }
                );
            });
            it('should update current object', async () => {
                mockedAxios.post.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            data: [
                                {
                                    name: 'foo:bar'
                                }
                            ]
                        }
                    })
                );
                // @ts-ignore
                client.name = false;
                await client.save();
                expect(client.name).toBe('foo:bar');
                expect(mockedAxios.post).toHaveBeenCalledWith(
                    '/upd/user/:id',
                    //no note
                    { fixed_ip: '192.168.1.3', name: '', use_fixedip: true, user_group_id: '', usergroup_id: '' },
                    { urlParams: { id: '6059229dc3d8180463a57109', site: 'name' } }
                );
            });
            describe('test setting fixed ip', () => {
                it('should force used fixed ip if setting fixed ip', async () => {
                    mockedAxios.post.mockImplementationOnce(() => Promise.resolve({ data: {} }));
                    client.useFixedIp = false;
                    client.fixedIp = '192.168.1.12';
                    await client.save();
                    expect(mockedAxios.post).toHaveBeenCalledWith(
                        '/upd/user/:id',
                        //no note
                        { fixed_ip: '192.168.1.12', name: 'ubnt', use_fixedip: true, user_group_id: '', usergroup_id: '' },
                        { urlParams: { id: '6059229dc3d8180463a57109', site: 'name' } }
                    );
                });
                it('should refuse a use fixed ip, without fixed ip', async () => {
                    client.useFixedIp = true;
                    client.fixedIp = '';
                    try {
                        await client.save();
                    } catch (e) {
                        expect(e).toBeInstanceOf(ClientError);
                        expect(e.message).toBe('fixed_ip is needed to use fixed_ip');
                        expect(e.code).toBe(EErrorsCodes.FIXED_IP_NEEDED);
                    }
                });
            });
        });
        describe('block', () => {
            it('should send a block-sta', async () => {
                mockedAxios.post.mockImplementation(() => {
                    return Promise.resolve({
                        data: {
                            meta: {
                                rc: 'ok'
                            },
                            data: {
                                blocked: true
                            }
                        }
                    });
                });
                await client.block();
                expect(client.blocked).toBe(true);
                expect(mockedAxios.post).toHaveBeenCalledWith('/cmd/stamgr', { cmd: 'block-sta', mac: clientRaw.mac });
            });
            it('should send a block-sta no return', async () => {
                mockedAxios.post.mockImplementation(() => {
                    return Promise.resolve({});
                });
                await client.block();
                //will not be updated
                expect(client.blocked).toBe(false);

                expect(mockedAxios.post).toHaveBeenCalledWith('/cmd/stamgr', { cmd: 'block-sta', mac: clientRaw.mac });
            });
        });
        describe('unblock', () => {
            it('should send a unblock-sta', async () => {
                mockedAxios.post.mockImplementation(() => {
                    return Promise.resolve({
                        data: {
                            meta: {
                                rc: 'ok'
                            },
                            data: {
                                blocked: false
                            }
                        }
                    });
                });
                client.blocked = true;
                await client.unblock();
                expect(client.blocked).toBe(false);
                expect(mockedAxios.post).toHaveBeenCalledWith('/cmd/stamgr', { cmd: 'unblock-sta', mac: clientRaw.mac });
            });
            it('should send a unblock-sta no return', async () => {
                mockedAxios.post.mockImplementation(() => {
                    return Promise.resolve({});
                });
                client.blocked = true;
                await client.unblock();
                //will not be updated
                expect(client.blocked).toBe(true);

                expect(mockedAxios.post).toHaveBeenCalledWith('/cmd/stamgr', { cmd: 'unblock-sta', mac: clientRaw.mac });
            });
        });
    });
});
