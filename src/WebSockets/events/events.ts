import { ipV4Address, LANWAN, macAddress, timestampDate, timeZone, uuid } from '../../commons/types';
import { IApp, IEventController, IReleaseInformations, ISystem, releaseChannels } from '../Interfaces';

/**
 * only known events, open PR to add more
 */
export enum EUnifiControllerEvents {
    /**
     * check link to get data associated with this event
     * {@link IErrorEvent}
     */
    ERROR = 'ERROR',

    /**
     * check link to get data associated with this event
     * {@link ISystemEvent}
     */
    SYSTEM = 'SYSTEM',
    /**
     * check link to get data associated with this event
     * {@link IUpdateDeviceRestoreProgressEvent}
     */
    UPDATE_DEVICE_RESTORE_PROGRESS = 'UPDATE_DEVICE_RESTORE_PROGRESS',
    /**
     * check link to get data associated with this event
     * {@link IDeviceStateChangedEvent}
     */
    DEVICE_STATE_CHANGED = 'DEVICE_STATE_CHANGED'
}

export interface IControllerEvent {
    type: string;
    [key: string]: unknown;
}

export interface IErrorEvent extends IControllerEvent {
    type: 'ERROR';
    message: string;
}

export interface ISystemEvent extends IControllerEvent {
    type: 'SYSTEM';
    apps: {
        apps: Array<IApp>;
        controllers: Array<IEventController>;
    };
    settings: {
        isSetup: boolean;
        location: {
            lat: number;
            long: number;
            radius: number;
        };
        name: string;
        timezone: timeZone;
        sendDiagnostics: 'full';
        setupType: unknown;
        setup_device_id: uuid;
        anonymous_device_id: uuid;
        country: number;
        encryptionKeyGenerated: boolean;
        encryptionKeyChecked: boolean;
        hasUCare: false;
        setupDuration: unknown;
        backupEnabled: boolean;
        backupSchedule: {
            frequency: 'daily' | string;
            day: number;
            hour: number;
            includeFirmware: boolean;
            includeControllers: boolean;
        };
        setupStartTime: unknown;
    };
    system: ISystem;
    firmware: {
        latest: IReleaseInformations;
        latestByChannel: Record<releaseChannels, IReleaseInformations>;
        progress: {
            state: string;
            url: string;
            progress: number;
            bytes: number;
        };
        token: uuid;
        channels: Array<releaseChannels>;
        schedule: unknown;
        releaseChannel: releaseChannels;
    };
    unadoptedUnifiOSDevices: Array<unknown>;
}

export interface IUpdateDeviceRestoreProgressEvent extends IControllerEvent {
    type: 'UPDATE_DEVICE_RESTORE_PROGRESS';
    backup: {
        device: {
            restoreInfo: unknown;
            restoreInProgress: boolean;
            restoreProgress: number;
            restoreStarted: boolean;
            restoreCompleted: boolean;
            steps: Array<unknown>;
        };
        controllers: {
            restoreInProgress: boolean;
            restoreFinished: boolean;
        };
    };
}

export interface IDeviceStateChangedEvent extends IControllerEvent {
    type: 'DEVICE_STATE_CHANGED';
    system: ISystem;
}

export interface ISiteEvent {
    meta: {
        rc: string;
        message: string;
        product_line?: string;
    };
    data: Array<unknown>;
}

export interface IEventDevice {
    site_id: string;
    assoc_time: timestampDate;
    latest_assoc_time: timestampDate;
    oui: string;
    user_id: string;
    _id: string;
    mac: macAddress;
    is_guest: boolean;
    first_seen: timestampDate;
    last_seen: timestampDate;
    is_wired: boolean;
    usergroup_id: string;
    name: string;
    noted: boolean;
    use_fixedip: boolean;
    network_id: string;
    fixed_ip: ipV4Address;
    fingerprint_override: boolean;
    dev_id_override: number;
    hostname: string;
    fingerprint_source: number;
    dev_cat: number;
    dev_family: number;
    dev_vendor: number;
    dev_id: number;
    device_name: string;
    fw_version: string;
    score: number;
    fingerprint_engine_version: string;
    _uptime_by_ugw: number;
    _last_seen_by_ugw: number;
    _is_guest_by_ugw: boolean;
    gw_mac: macAddress;
    network: LANWAN;
    uptime: number;
    tx_bytes: number;
    rx_bytes: number;
    tx_packets: number;
    tx_retries: number;
    wifi_tx_attempts: number;
    rx_packets: number;
    'tx_bytes-r': number;
    'rx_bytes-r': number;
    qos_policy_applied: boolean;
    _uptime_by_usw: number;
    _last_seen_by_usw: timestampDate;
    _is_guest_by_usw: boolean;
    sw_mac: macAddress;
    sw_depth: number;
    sw_port: number;
    wired_rate_mbps: number;
    ip: ipV4Address;
    anomalies: number;
    'wired-tx_bytes': number;
    'wired-rx_bytes': number;
    'wired-tx_packets': number;
    'wired-rx_packets': number;
    'wired-tx_bytes-r': number;
    'wired-rx_bytes-r': number;
    'bytes-r': number;
    note: string;
    satisfaction?: number;
    os_name?: number;
    confidence?: number;
    _uptime_by_uap?: number;
    _last_seen_by_uap?: number;
    _is_guest_by_uap?: boolean;
    ap_mac: string;
    channel?: number;
    radio: string;
    radio_name: string;
    essid: string;
    bssid: string;
    powersave_enabled?: boolean;
    is_11r?: boolean;
    user_group_id_computed: string;
    ccq?: number;
    rssi?: number;
    noise?: number;
    signal?: number;
    tx_rate?: number;
    rx_rate?: number;
    tx_power?: number;
    idletime?: number;
    dhcpend_time?: number;
    anon_client_id: string;
    tx_mcs?: number;
    vlan?: number;
    radio_proto: string;
    blocked?: boolean;
}

export interface ISiteEventsEvent {
    meta: {
        rc: string;
        message: 'events';
    };
    data: Array<Record<string, unknown> & { key: string }>;
}

export interface IStaSync extends ISiteEvent {
    meta: {
        rc: string;
        message: 'sta:sync';
    };
    data: Array<IEventDevice>;
}

export type unifiSiteEvents = ISiteEvent | ISiteEventsEvent | IStaSync;

export type unifiControllerEvents =
    | IControllerEvent
    | IErrorEvent
    | ISystemEvent
    | IUpdateDeviceRestoreProgressEvent
    | IDeviceStateChangedEvent;
