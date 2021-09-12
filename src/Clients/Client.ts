import { _ObjectSubSite, IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { IDevice } from './IDevice';
import { ClientError, EErrorsCodes } from '../Errors';
import { Validate } from '../commons/Validate';
import { convertTimestampSecondsToDate, createDebugger } from '../util';
import { IClientRaw } from './IClientRaw';
import { IUnifiResponseEnveloppe } from '../interfaces';

export type DeviceData = Partial<IDevice> & {
    _original?: Partial<Omit<DeviceData, '_original'>>;
};

export class Client extends _ObjectSubSite {
    static debug = createDebugger('client');

    private get old(): Partial<Client> {
        return this.getPrivate('old');
    }

    private set old(data: Partial<Client>) {
        this.setPrivate('old', data);
    }

    private importValue(k: keyof Client, v: unknown) {
        // @ts-ignore
        this.old[k] = v;
        // @ts-ignore
        this[k] = v;
    }

    constructor(config: IObjectSubSiteConfig, props: Partial<IClientRaw> & { mac: string }) {
        super(config);

        this.mac = props.mac;
        if (!this.mac) {
            throw new ClientError('mac is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.debug = Client.debug.extend(this.mac);
        this.old = {
            mac: this.mac
        };
        this.import(props);
    }

    public import(props: Partial<IClientRaw>): this {
        this.debug('import()');
        if (!Validate.isUndefined(props._id)) {
            this.importValue('_id', props._id);
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.importValue('siteId', props.site_id);
        }
        if (!Validate.isUndefined(props.oui)) {
            this.importValue('oui', props.oui);
        }
        if (!Validate.isUndefined(props.hostname)) {
            this.importValue('hostname', props.hostname);
        }

        //prepare the device
        let device: DeviceData = this.device?._original ?? this.device ?? {};

        if (!Validate.isUndefined(props.fingerprint_source)) {
            device._fingerPrintSource = props.fingerprint_source;
        }
        if (!Validate.isUndefined(props.dev_cat)) {
            device.category = props.dev_cat;
        }
        if (!Validate.isUndefined(props.dev_family)) {
            device.family = props.dev_family;
        }
        if (!Validate.isUndefined(props.os_name)) {
            device.os = props.os_name;
        }
        if (!Validate.isUndefined(props.os_name)) {
            device.os = props.os_name;
        }
        if (!Validate.isUndefined(props.dev_vendor)) {
            device.vendor = props.dev_vendor;
        }
        if (!Validate.isUndefined(props.dev_id)) {
            device.id = props.dev_id;
        }
        if (!Validate.isUndefined(props.fingerprint_engine_version)) {
            device._fingerprintEngineVersion = props.fingerprint_engine_version;
        }
        if (!Validate.isUndefined(props.device_name)) {
            device.name = props.device_name;
        }

        if (props.fingerprint_override ?? this.device?._overridden ?? false) {
            const _original = { ...device };
            device = {
                id: props.dev_id_override,
                _overridden: true,
                _original
            };
        }

        this.importValue('device', device);

        if (!Validate.isUndefined(props.confidence)) {
            this.importValue('confidence', props.confidence);
        }

        if (!Validate.isUndefined(props.fw_version)) {
            this.importValue('firmwareVersion', props.fw_version);
        }
        if (!Validate.isUndefined(props.score)) {
            this.importValue('score', props.score);
        }
        if (!Validate.isUndefined(props.blocked)) {
            this.importValue('blocked', props.blocked);
        }
        if (!Validate.isUndefined(props.user_group_id) || !Validate.isUndefined(props.usergroup_id)) {
            this.importValue('groupId', props.user_group_id || props.usergroup_id);
        }
        if (!Validate.isUndefined(props.name)) {
            this.importValue('name', props.name);
        }
        if (!Validate.isUndefined(props.note)) {
            this.importValue('note', props.note);
        }
        if (!Validate.isUndefined(props.noted)) {
            this.importValue('noted', props.noted);
        }
        if (!Validate.isUndefined(props.is_guest)) {
            this.importValue('isGuest', props.is_guest);
        }
        if (!Validate.isUndefined(props.is_wired)) {
            this.importValue('isWired', props.is_wired);
        }
        if (!Validate.isUndefined(props.fixed_ip)) {
            this.importValue('fixedIp', props.fixed_ip);
        }
        if (!Validate.isUndefined(props.network_id)) {
            this.importValue('networkId', props.network_id);
        }
        if (!Validate.isUndefined(props.use_fixedip)) {
            this.importValue('useFixedIp', props.use_fixedip);
        }
        if (!Validate.isUndefined(props.first_seen)) {
            this.importValue('firstSeen', convertTimestampSecondsToDate(props.first_seen));
        }
        if (!Validate.isUndefined(props.last_seen)) {
            this.importValue('lastSeen', convertTimestampSecondsToDate(props.last_seen));
        }

        if (!Validate.isUndefined(props.assoc_time)) {
            this.importValue('assocTime', convertTimestampSecondsToDate(props.assoc_time));
        }
        if (!Validate.isUndefined(props.latest_assoc_time)) {
            this.importValue('latestAssocTime', convertTimestampSecondsToDate(props.latest_assoc_time));
        }
        if (!Validate.isUndefined(props.user_id)) {
            this.importValue('userId', props.user_id);
        }
        if (!Validate.isUndefined(props._uptime_by_ugw)) {
            this.importValue('_uptimeByUGW', props._uptime_by_ugw);
        }
        if (!Validate.isUndefined(props._last_seen_by_ugw)) {
            this.importValue('_lastSeenByUGW', convertTimestampSecondsToDate(props._last_seen_by_ugw));
        }
        if (!Validate.isUndefined(props._is_guest_by_ugw)) {
            this.importValue('_isGuestByUGW', props._is_guest_by_ugw);
        }
        if (!Validate.isUndefined(props.gw_mac)) {
            this.importValue('gwMac', props.gw_mac);
        }
        if (!Validate.isUndefined(props.network)) {
            this.importValue('network', props.network);
        }
        if (!Validate.isUndefined(props.uptime)) {
            this.importValue('uptime', props.uptime);
        }
        if (!Validate.isUndefined(props.tx_bytes)) {
            this.importValue('txBytes', props.tx_bytes);
        }
        if (!Validate.isUndefined(props.rx_bytes)) {
            this.importValue('rxBytes', props.rx_bytes);
        }
        if (!Validate.isUndefined(props.tx_packets)) {
            this.importValue('txPackets', props.tx_packets);
        }
        if (!Validate.isUndefined(props.tx_retries)) {
            this.importValue('txRetries', props.tx_retries);
        }
        if (!Validate.isUndefined(props.wifi_tx_attempts)) {
            this.importValue('wifiTxAttempts', props.wifi_tx_attempts);
        }
        if (!Validate.isUndefined(props.rx_packets)) {
            this.importValue('rxPackets', props.rx_packets);
        }
        if (!Validate.isUndefined(props['tx_bytes-r'])) {
            this.importValue('txBytesR', props['tx_bytes-r']);
        }
        if (!Validate.isUndefined(props['rx_bytes-r'])) {
            this.importValue('rxBytesR', props['rx_bytes-r']);
        }
        if (!Validate.isUndefined(props.qos_policy_applied)) {
            this.importValue('qosPolicyApplied', props.qos_policy_applied);
        }
        if (!Validate.isUndefined(props._uptime_by_usw)) {
            this.importValue('_uptimeByUSW', props._uptime_by_usw);
        }
        if (!Validate.isUndefined(props._last_seen_by_usw)) {
            this.importValue('_lastSeenByUSW', convertTimestampSecondsToDate(props._last_seen_by_usw));
        }
        if (!Validate.isUndefined(props._is_guest_by_usw)) {
            this.importValue('_isGuestByUSW', props._is_guest_by_usw);
        }
        if (!Validate.isUndefined(props.sw_mac)) {
            this.importValue('swMac', props.sw_mac);
        }
        if (!Validate.isUndefined(props.sw_depth)) {
            this.importValue('swDepth', props.sw_depth);
        }
        if (!Validate.isUndefined(props.sw_port)) {
            this.importValue('swPort', props.sw_port);
        }
        if (!Validate.isUndefined(props.wired_rate_mbps)) {
            this.importValue('wiredRateMbps', props.wired_rate_mbps);
        }
        if (!Validate.isUndefined(props.anomalies)) {
            this.importValue('anomalies', props.anomalies);
        }
        if (!Validate.isUndefined(props.ip)) {
            this.importValue('ip', props.ip);
        }
        if (!Validate.isUndefined(props.satisfaction)) {
            this.importValue('satisfaction', props.satisfaction);
        }
        if (!Validate.isUndefined(props['bytes-r'])) {
            this.importValue('bytesR', props['bytes-r']);
        }
        if (!Validate.isUndefined(props._uptime_by_uap)) {
            this.importValue('_uptimeByUAP', props._uptime_by_uap);
        }
        if (!Validate.isUndefined(props._last_seen_by_uap)) {
            this.importValue('_lastSeenByUAP', convertTimestampSecondsToDate(props._last_seen_by_uap));
        }
        if (!Validate.isUndefined(props._is_guest_by_uap)) {
            this.importValue('_isGuestByUAP', props._is_guest_by_uap);
        }
        if (!Validate.isUndefined(props.ap_mac)) {
            this.importValue('apMac', props.ap_mac);
        }
        if (!Validate.isUndefined(props.channel)) {
            this.importValue('channel', props.channel);
        }
        if (!Validate.isUndefined(props.radio)) {
            this.importValue('radio', props.radio);
        }
        if (!Validate.isUndefined(props.radio_name)) {
            this.importValue('radioName', props.radio_name);
        }
        if (!Validate.isUndefined(props.essid)) {
            this.importValue('essid', props.essid);
        }
        if (!Validate.isUndefined(props.bssid)) {
            this.importValue('bssid', props.bssid);
        }
        if (!Validate.isUndefined(props.powersave_enabled)) {
            this.importValue('powersaveEnabled', props.powersave_enabled);
        }
        if (!Validate.isUndefined(props.is_11r)) {
            this.importValue('is11r', props.is_11r);
        }
        if (!Validate.isUndefined(props.user_group_id_computed)) {
            this.importValue('userGroupIdComputed', props.user_group_id_computed);
        }
        if (!Validate.isUndefined(props.ccq)) {
            this.importValue('ccq', props.ccq);
        }
        if (!Validate.isUndefined(props.rssi)) {
            this.importValue('rssi', props.rssi);
        }
        if (!Validate.isUndefined(props['wired-tx_packets'])) {
            this.importValue('wiredTxPackets', props['wired-tx_packets']);
        }
        if (!Validate.isUndefined(props['wired-rx_packets'])) {
            this.importValue('wiredRxPackets', props['wired-rx_packets']);
        }
        if (!Validate.isUndefined(props['wired-tx_bytes-r'])) {
            this.importValue('wiredTxBytesR', props['wired-tx_bytes-r']);
        }
        if (!Validate.isUndefined(props['wired-rx_bytes-r'])) {
            this.importValue('wiredRxBytesR', props['wired-rx_bytes-r']);
        }
        if (!Validate.isUndefined(props.noise)) {
            this.importValue('noise', props.noise);
        }
        if (!Validate.isUndefined(props.signal)) {
            this.importValue('signal', props.signal);
        }
        if (!Validate.isUndefined(props.tx_rate)) {
            this.importValue('txRate', props.tx_rate);
        }
        if (!Validate.isUndefined(props.rx_rate)) {
            this.importValue('rxRate', props.rx_rate);
        }
        if (!Validate.isUndefined(props.tx_power)) {
            this.importValue('txPower', props.tx_power);
        }
        if (!Validate.isUndefined(props.idletime)) {
            this.importValue('idletime', props.idletime);
        }
        if (!Validate.isUndefined(props.dhcpend_time)) {
            this.importValue('dhcpendTime', props.dhcpend_time);
        }
        if (!Validate.isUndefined(props.anon_client_id)) {
            this.importValue('anonClientId', props.anon_client_id);
        }
        if (!Validate.isUndefined(props.tx_mcs)) {
            this.importValue('txMcs', props.tx_mcs);
        }
        if (!Validate.isUndefined(props.vlan)) {
            this.importValue('vlan', props.vlan);
        }
        if (!Validate.isUndefined(props.radio_proto)) {
            this.importValue('radioProto', props.radio_proto);
        }
        if (!Validate.isUndefined(props['wired-tx_bytes'])) {
            this.importValue('wiredTxBytes', props['wired-tx_bytes']);
        }
        if (!Validate.isUndefined(props['wired-rx_bytes'])) {
            this.importValue('wiredRxBytes', props['wired-rx_bytes']);
        }
        if (!Validate.isUndefined(props['disconnect_timestamp'])) {
            this.importValue('lastDisconnect', convertTimestampSecondsToDate(props.disconnect_timestamp));
        }
        return this;
    }

    /**
     * Forget one or more client devices
     *
     * NOTE:
     * only supported with controller versions 5.9.X and higher, can be
     * slow (up to 5 minutes) on larger controllers
     */
    public async forget(): Promise<boolean> {
        this.checkNeedVersion('5.9.0');
        this.debug('forget()');
        const json = { cmd: 'forget-sta', macs: [this.mac] };

        const res = (
            await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', json, {
                timeout: 10 * 60 * 1000
            })
        ).data;

        return res?.meta?.rc === 'ok';
    }

    public async save(): Promise<this> {
        this.debug('save()');
        const device: Partial<IClientRaw> = {};

        device.name = this.name || '';

        // check if note was updated
        if (this.note != this.old.note) {
            // add note / noted
            device.note = this.note;
            device.noted = !!this.note;
        }

        //set user group id
        device.user_group_id = this.groupId;
        device.usergroup_id = this.groupId;

        //check fixed ip
        if (this.useFixedIp && !this.fixedIp) {
            throw new ClientError('fixed_ip is needed to use fixed_ip', EErrorsCodes.FIXED_IP_NEEDED);
        } else if (this.fixedIp && !this.useFixedIp) {
            this.debug('warn : please set useFixedIp to true');
            this.useFixedIp = true;
        }

        device.use_fixedip = this.useFixedIp;
        device.fixed_ip = this.fixedIp;

        const res = (
            (
                await this.instance.post<IUnifiResponseEnveloppe<Array<IClientRaw>>>('/upd/user/:id', device, {
                    urlParams: {
                        site: this.site.name,
                        id: this._id
                    }
                })
            ).data.data || []
        ).pop();
        //import only if res is updated
        if (res) {
            this.import(res);
        }

        return this;
    }

    public async block(): Promise<this> {
        this.debug('block()');
        const res = (
            await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', {
                cmd: 'block-sta',
                mac: this.mac.toLowerCase()
            })
        ).data?.data;
        if (res) {
            this.import(res);
        }
        return this;
    }

    public async unblock(): Promise<this> {
        this.debug('unblock()');
        const res = (
            await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', {
                cmd: 'unblock-sta',
                mac: this.mac.toLowerCase()
            })
        ).data?.data;
        if (res) {
            this.import(res);
        }
        return this;
    }

    public device: DeviceData;
    public _id: string;
    public confidence?: number;
    public firstSeen?: Date;
    public hostname?: string;
    public isGuest?: boolean;
    public isWired?: boolean;
    public lastSeen?: Date;
    public mac: string;
    public name?: string;
    public note?: string;
    public noted?: boolean;
    public oui?: string;
    public siteId?: string;
    public groupId?: string;
    public useFixedIp?: boolean;
    public networkId?: string;
    public fixedIp?: string;
    public firmwareVersion?: string;
    public score?: number;
    public blocked?: boolean;
    public assocTime?: Date;
    public latestAssocTime?: Date;
    public userId?: string;
    public _uptimeByUGW?: number;
    public _lastSeenByUGW?: Date;
    public _isGuestByUGW?: boolean;
    public gwMac?: string;
    public network?: string;
    public uptime?: number;
    public txBytes?: number;
    public rxBytes?: number;
    public txPackets?: number;
    public txRetries?: number;
    public wifiTxAttempts?: number;
    public rxPackets?: number;
    public txBytesR?: number;
    public rxBytesR?: number;
    public qosPolicyApplied?: boolean;
    public _uptimeByUSW?: number;
    public _lastSeenByUSW?: Date;
    public _isGuestByUSW?: boolean;
    public swMac?: string;
    public swDepth?: number;
    public swPort?: number;
    public wiredRateMbps?: number;
    public anomalies?: number;
    public ip?: string;
    public satisfaction?: number;
    public bytesR?: number;
    public _uptimeByUAP?: number;
    public _lastSeenByUAP?: Date;
    public _isGuestByUAP?: boolean;
    public apMac?: string;
    public channel?: number;
    public radio?: string;
    public radioName?: string;
    public essid?: string;
    public bssid?: string;
    public powersaveEnabled?: boolean;
    public is11r?: boolean;
    public userGroupIdComputed?: string;
    public ccq?: number;
    public rssi?: number;
    public noise?: number;
    public signal?: number;
    public txRate?: number;
    public rxRate?: number;
    public txPower?: number;
    public idletime?: number;
    public dhcpendTime?: number;
    public anonClientId?: string;
    public txMcs?: number;
    public vlan?: number;
    public radioProto?: string;
    public wiredTxBytes?: number;
    public wiredRxBytes?: number;
    public wiredTxPackets?: number;
    public wiredRxPackets?: number;
    public wiredTxBytesR?: number;
    public wiredRxBytesR?: number;
    public lastDisconnect?: Date;
}
