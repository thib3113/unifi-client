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

    constructor(config: IObjectSubSiteConfig, props: Partial<IClientRaw> & { mac: string }) {
        super(config);

        this.mac = props.mac;
        if (!this.mac) {
            throw new ClientError('mac is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.debug = Client.debug.extend(this.mac);
        this.import(props);

        this.needVersion('forget', this._forget, '5.9.0');
    }

    protected import(props: Partial<IClientRaw>): this {
        this.debug('import()');
        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.siteId = props.site_id;
        }
        if (!Validate.isUndefined(props.oui)) {
            this.oui = props.oui;
        }
        if (!Validate.isUndefined(props.hostname)) {
            this.hostname = props.hostname;
        }

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
                _original
            };
        }

        this.device = device;

        if (!Validate.isUndefined(props.confidence)) {
            this.confidence = props.confidence;
        }

        if (!Validate.isUndefined(props.fw_version)) {
            this.firmwareVersion = props.fw_version;
        }
        if (!Validate.isUndefined(props.score)) {
            this.score = props.score;
        }
        if (!Validate.isUndefined(props.blocked)) {
            this.blocked = props.blocked;
        }
        if (!Validate.isUndefined(props.user_group_id) || !Validate.isUndefined(props.usergroup_id)) {
            this.groupId = props.user_group_id || props.usergroup_id;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.note)) {
            this.note = props.note;
        }
        if (!Validate.isUndefined(props.noted)) {
            this.noted = props.noted;
        }
        if (!Validate.isUndefined(props.is_guest)) {
            this.isGuest = props.is_guest;
        }
        if (!Validate.isUndefined(props.is_wired)) {
            this.isWired = props.is_wired;
        }
        if (!Validate.isUndefined(props.fixed_ip)) {
            this.fixedIp = props.fixed_ip;
        }
        if (!Validate.isUndefined(props.network_id)) {
            this.networkId = props.network_id;
        }
        if (!Validate.isUndefined(props.use_fixedip)) {
            this.useFixedIp = props.use_fixedip;
        }
        if (!Validate.isUndefined(props.first_seen)) {
            this.firstSeen = convertTimestampSecondsToDate(props.first_seen);
        }
        if (!Validate.isUndefined(props.last_seen)) {
            this.lastSeen = convertTimestampSecondsToDate(props.last_seen);
        }

        if (!Validate.isUndefined(props.assoc_time)) {
            this.assocTime = convertTimestampSecondsToDate(props.assoc_time);
        }
        if (!Validate.isUndefined(props.latest_assoc_time)) {
            this.latestAssocTime = convertTimestampSecondsToDate(props.latest_assoc_time);
        }
        if (!Validate.isUndefined(props.user_id)) {
            this.userId = props.user_id;
        }
        if (!Validate.isUndefined(props._uptime_by_ugw)) {
            this._uptimeByUgw = props._uptime_by_ugw;
        }
        if (!Validate.isUndefined(props._last_seen_by_ugw)) {
            this._lastSeenByUgw = convertTimestampSecondsToDate(props._last_seen_by_ugw);
        }
        if (!Validate.isUndefined(props._is_guest_by_ugw)) {
            this._isGuestByUGW = props._is_guest_by_ugw;
        }
        if (!Validate.isUndefined(props.gw_mac)) {
            this.gwMac = props.gw_mac;
        }
        if (!Validate.isUndefined(props.network)) {
            this.network = props.network;
        }
        if (!Validate.isUndefined(props.uptime)) {
            this.uptime = props.uptime;
        }
        if (!Validate.isUndefined(props.tx_bytes)) {
            this.txBytes = props.tx_bytes;
        }
        if (!Validate.isUndefined(props.rx_bytes)) {
            this.rxBytes = props.rx_bytes;
        }
        if (!Validate.isUndefined(props.tx_packets)) {
            this.txPackets = props.tx_packets;
        }
        if (!Validate.isUndefined(props.tx_retries)) {
            this.txRetries = props.tx_retries;
        }
        if (!Validate.isUndefined(props.wifi_tx_attempts)) {
            this.wifiTxAttempts = props.wifi_tx_attempts;
        }
        if (!Validate.isUndefined(props.rx_packets)) {
            this.rxPackets = props.rx_packets;
        }
        if (!Validate.isUndefined(props['tx_bytes-r'])) {
            this.txBytesR = props['tx_bytes-r'];
        }
        if (!Validate.isUndefined(props['rx_bytes-r'])) {
            this.rxBytesR = props['rx_bytes-r'];
        }
        if (!Validate.isUndefined(props.qos_policy_applied)) {
            this.qosPolicyApplied = props.qos_policy_applied;
        }
        if (!Validate.isUndefined(props._uptime_by_usw)) {
            this._uptimeByUSW = props._uptime_by_usw;
        }
        if (!Validate.isUndefined(props._last_seen_by_usw)) {
            this._lastSeenByUSW = convertTimestampSecondsToDate(props._last_seen_by_usw);
        }
        if (!Validate.isUndefined(props._is_guest_by_usw)) {
            this._isGuestByUSW = props._is_guest_by_usw;
        }
        if (!Validate.isUndefined(props.sw_mac)) {
            this.swMac = props.sw_mac;
        }
        if (!Validate.isUndefined(props.sw_depth)) {
            this.swDepth = props.sw_depth;
        }
        if (!Validate.isUndefined(props.sw_port)) {
            this.swPort = props.sw_port;
        }
        if (!Validate.isUndefined(props.wired_rate_mbps)) {
            this.wiredRateMbps = props.wired_rate_mbps;
        }
        if (!Validate.isUndefined(props.anomalies)) {
            this.anomalies = props.anomalies;
        }
        if (!Validate.isUndefined(props.ip)) {
            this.ip = props.ip;
        }
        if (!Validate.isUndefined(props.satisfaction)) {
            this.satisfaction = props.satisfaction;
        }
        if (!Validate.isUndefined(props['bytes-r'])) {
            this.bytesR = props['bytes-r'];
        }
        if (!Validate.isUndefined(props._uptime_by_uap)) {
            this._uptimeByUAP = props._uptime_by_uap;
        }
        if (!Validate.isUndefined(props._last_seen_by_uap)) {
            this._lastSeenByUAP = convertTimestampSecondsToDate(props._last_seen_by_uap);
        }
        if (!Validate.isUndefined(props._is_guest_by_uap)) {
            this._isGuestByUAP = props._is_guest_by_uap;
        }
        if (!Validate.isUndefined(props.ap_mac)) {
            this.apMac = props.ap_mac;
        }
        if (!Validate.isUndefined(props.channel)) {
            this.channel = props.channel;
        }
        if (!Validate.isUndefined(props.radio)) {
            this.radio = props.radio;
        }
        if (!Validate.isUndefined(props.radio_name)) {
            this.radioName = props.radio_name;
        }
        if (!Validate.isUndefined(props.essid)) {
            this.essid = props.essid;
        }
        if (!Validate.isUndefined(props.bssid)) {
            this.bssid = props.bssid;
        }
        if (!Validate.isUndefined(props.powersave_enabled)) {
            this.powersaveEnabled = props.powersave_enabled;
        }
        if (!Validate.isUndefined(props.is_11r)) {
            this.is11r = props.is_11r;
        }
        if (!Validate.isUndefined(props.user_group_id_computed)) {
            this.userGroupIdComputed = props.user_group_id_computed;
        }
        if (!Validate.isUndefined(props.ccq)) {
            this.ccq = props.ccq;
        }
        if (!Validate.isUndefined(props.rssi)) {
            this.rssi = props.rssi;
        }
        if (!Validate.isUndefined(props.noise)) {
            this.noise = props.noise;
        }
        if (!Validate.isUndefined(props.signal)) {
            this.signal = props.signal;
        }
        if (!Validate.isUndefined(props.tx_rate)) {
            this.txRate = props.tx_rate;
        }
        if (!Validate.isUndefined(props.rx_rate)) {
            this.rxRate = props.rx_rate;
        }
        if (!Validate.isUndefined(props.tx_power)) {
            this.txPower = props.tx_power;
        }
        if (!Validate.isUndefined(props.idletime)) {
            this.idletime = props.idletime;
        }
        if (!Validate.isUndefined(props.dhcpend_time)) {
            this.dhcpendTime = props.dhcpend_time;
        }
        if (!Validate.isUndefined(props.anon_client_id)) {
            this.anonClientId = props.anon_client_id;
        }
        if (!Validate.isUndefined(props.tx_mcs)) {
            this.txMcs = props.tx_mcs;
        }
        if (!Validate.isUndefined(props.vlan)) {
            this.vlan = props.vlan;
        }
        if (!Validate.isUndefined(props.radio_proto)) {
            this.radioProto = props.radio_proto;
        }
        if (!Validate.isUndefined(props['wired-tx_bytes'])) {
            this.wiredTxBytes = props['wired-tx_bytes'];
        }
        if (!Validate.isUndefined(props['wired-rx_bytes'])) {
            this.wiredRxBytes = props['wired-rx_bytes'];
        }
        if (!Validate.isUndefined(props['wired-tx_packets'])) {
            this.wiredTxPackets = props['wired-tx_packets'];
        }
        if (!Validate.isUndefined(props['wired-rx_packets'])) {
            this.wiredRxPackets = props['wired-rx_packets'];
        }
        if (!Validate.isUndefined(props['wired-tx_bytes-r'])) {
            this.wiredTxBytesR = props['wired-tx_bytes-r'];
        }
        if (!Validate.isUndefined(props['wired-rx_bytes-r'])) {
            this.wiredRxBytesR = props['wired-rx_bytes-r'];
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
    public forget: () => Promise<Client>;
    private async _forget(): Promise<Client> {
        this.debug('forget()');
        const json = { cmd: 'forget-sta', macs: [this.mac] };
        return this.mapObject<Client>(
            Client,
            (
                (
                    await this.instance.post('/cmd/stamgr', json, {
                        timeout: 10 * 60 * 1000
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async delete(): Promise<void> {
        this.debug('delete()');
        return this.instance.delete('/rest/user/:id', {
            urlParams: {
                site: this.site.name,
                id: this._id
            }
        });
    }

    public async save(): Promise<unknown> {
        this.debug('save()');
        const device: Partial<IClientRaw> = {};

        device.name = this.name || '';

        device.note = this.note;
        device.noted = !!this.note;

        device.user_group_id = this.groupId;

        return this.instance.post('/upd/user/:id', device, {
            urlParams: {
                site: this.site.name,
                id: this._id
            }
        });
    }

    public async block(): Promise<this> {
        this.debug('block()');
        this.import(
            (
                await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', {
                    cmd: 'block-sta',
                    mac: this.mac.toLowerCase()
                })
            ).data?.data
        );
        return this;
    }

    public async unblock(): Promise<this> {
        this.debug('unblock()');

        this.import(
            (
                await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', {
                    cmd: 'unblock-sta',
                    mac: this.mac.toLowerCase()
                })
            ).data?.data
        );
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
    public _uptimeByUgw?: number;
    public _lastSeenByUgw?: Date;
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
}
