import {
    dateISOString,
    email,
    ipV4Address,
    ipv4CIDR,
    ipv6Address,
    ipv6CIDR,
    LANWAN,
    lanwan,
    macAddress,
    percentageToOne,
    semverVersion,
    timestampDate,
    uuid
} from '../commons/types';
import { IUserGroup } from '../User/IUserGroup';
import { IUserRole } from '../User/IUserRole';

export type controllerStatuses = 'READY';

export interface IUIConfig {
    baseUrl: string;
    publicPath: string;
    cdnPublicPaths: Array<string>;
    prefetch: [];
    icon: string;
    hotkey: string;
    entrypoint: string;
    swaiVersion: number;
    apiPrefix: string;
}

export interface IApp {
    name: string;
    type: 'app';
    swaiVersion: number;
    uiCdn: string;
    uiVersion: string;
    uiNpmPackageName: string;
    ui: IUIConfig;
}

export interface IClient {
    deviceModel: number;
    hostname: string;
    ip: string;
    isGuest: boolean;
    isWired: boolean;
    latestAssocTime: timestampDate;
    satisfaction: number;
}

export interface IPort {
    ifname: string;
    name: string;
    throughputRx: number;
    throughputTx: number;
    type: lanwan;
    usageRx: number;
    usageTx: number;
}

export type unifiDeviceState = 'NOT_AVAILABLE';

export interface IUnifiCareDevice {
    mac: macAddress;
    state: unifiDeviceState;
}

export interface IController {
    name: string;
    type: 'controller';
    ui: IUIConfig;
    required: boolean;
    updatable: boolean;
    releaseChannel: string;
    isInstalled: boolean;
    isRunning: boolean;
    isConfigured: boolean;
    unadoptedDevices: [];
    state: string;
    version: string;
    status: string;
    statusMessage: string;
    updateAvailable: unknown;
    info: {
        timestamp: timestampDate;
        startedAt: timestampDate;
        udmConnected: boolean;
        isReadyForSetup: boolean;
        udmProvisionCompleted: boolean;
        alertCount: number;
        apCount: number;
        switchCount: number;
        wifiExperienceScore: number;
        wanStatus: string;
        health: {
            label: string;
            score: number;
        };
        network_status: {
            health: string;
            historical_satisfaction: [number, number, number, number, number, number, number, number, number, number, number, number];
        };
        clientCount: number;
        wiredClients: number;
        wirelessClients: number;
        guestClients: number;
        clientList: Array<IClient>;
        lastSpeedTest: {
            downloadSpeed: number;
            ping: number;
            runDate: timestampDate;
            uploadSpeed: number;
        };
        updateAvailable: boolean;
        portTable: Array<IPort>;
        throughput: number;
    };
    controllerStatus: controllerStatuses;
    unifiCareDevices: Array<IUnifiCareDevice>;
    swaiVersion: number;
    port: number;
    uiCdn: string;
    abridged: boolean;
}

export interface IStorage {
    id: number;
    type: 'emmc' | 'hdd' | string;
    mounted: boolean;
    mountPoint: string;
    canErase: boolean;
    size: number;
    used: number;
    avail: number;
}

export interface ICPU {
    model: string;
    speed: number;
    times: {
        user: number;
        nice: number;
        sys: number;
        idle: number;
        irq: number;
    };
}

export interface IInterface {
    address: ipV4Address | ipv6Address;
    netmask: ipV4Address | ipv6Address;
    family: 'IPv4' | 'IPv6';
    mac: macAddress;
    internal: boolean;
    cidr: ipv4CIDR | ipv6CIDR;
    scopeid?: number;
}

export type ledStatus = 'Configured' | string;

export type permissionRole = 'admin' | string;

export interface IPortStatus {
    id: string;
    plugged: boolean;
    type: LANWAN;
}

export type releaseChannels = 'release' | 'beta' | 'release-candidate';

export interface ISystem {
    info: {
        ip: string;
        mac: string;
        latestUpdateCheck: timestampDate;
        updateSchedule: unknown;
        firmwareDownload: {
            progress: number;
            state: string;
        };
        uptime: number;
        hostname: string;
        deviceId: string;
        ports: Record<'http' | 'https' | 'ipc' | string, number>;
        ucareState: unifiDeviceState;
        now: timestampDate;
        ucore_version: semverVersion;
        hardware: {
            sysid: number;
            name: string;
            shortname: string;
            subtype: string;
            reboot: string;
            upgrade: string;
            'cpu.id': string;
            uuid: uuid;
            bom: string;
            hwrev: number;
            serialno: string;
            qrid: string;
            firmwareVersion: semverVersion;
        };
        features: {
            speedTest: true;
            adoptDevices: true;
            setupConfigUFN: true;
            waitForUFN: true;
            hasFirewall: true;
            hasPortStatus: true;
            hasLedStatus: true;
            cloudBackup: true;
            systoolSupportDump: true;
            UFNSetsHostname: true;
            systoolAnonId: true;
        };
        storage: Array<IStorage>;
        cpu: {
            model: string;
            speed: number;
            cores: number;
            currentload: number;
            loadavg: [number, number, number];
            temperature: number;
            cpus: Array<ICPU>;
        };
        memory: {
            free: number;
            total: number;
            available: number;
        };
        network: {
            interfaces: Record<string, Array<IInterface>>;
        };
        ssh: boolean;
        ledStatus: ledStatus;
        owner: {
            unique_id: uuid;
            first_name: string;
            last_name: string;
            full_name: string;
            email: email;
            email_status: string;
            phone: string;
            avatar_relative_path: string;
            avatar_rpath2: string;
            status: string;
            employee_number: string;
            create_time: timestampDate;
            extras: unknown;
            username: string;
            local_account_exist: boolean;
            password_revision: number;
            sso_account: email;
            sso_uuid: uuid;
            sso_username: string;
            sso_picture: string;
            uid_sso_id: string;
            uid_sso_account: string;
            groups: Array<IUserGroup>;
            roles: Array<IUserRole>;
            permissions: Record<permission, [permissionRole]>;
            scopes: Array<scopes>;
            cloud_access_granted: boolean;
            update_time: timestampDate;
            avatar: string;
            nfc_token: string;
            nfc_display_id: string;
            nfc_card_type: string;
            nfc_card_status: string;
            id: string;
            isOwner: boolean;
            isSuperAdmin: boolean;
        };
        portStatus: Array<IPortStatus>;
    };
    hasInternet: boolean;
    deviceState: string;
    deviceStateLastChanged: timestampDate;
    publicIp: ipV4Address;
    cloudConnected: boolean;
}

export interface IReleaseInformations {
    timestamp: timestampDate;
    channel: releaseChannels;
    created: dateISOString;
    file_size: number;
    id: uuid;
    md5: string;
    sha256: string;
    platform: string;
    product: string;
    updated: dateISOString;
    tags: Record<string, string>;
    version: semverVersion;
    version_major: number;
    version_minor: number;
    version_patch: number;
    probability: percentageToOne;
    probability_computed: number;
    release_date: dateISOString;
    _links: {
        self: {
            href: string;
        };
        upload: Array<{ name: string; href: string }>;
        data: {
            href: string;
        };
    };
}

export type scopes =
    | 'write:protect.viewer'
    | 'write:protect.user:$'
    | 'write:protect.user'
    | 'write:protect.sensor'
    | 'write:protect.recordingSchedule'
    | 'write:protect.nvr'
    | 'write:protect.light'
    | 'write:protect.group'
    | 'write:protect.camera'
    | 'write:protect.bridge'
    | 'view:user_timezone'
    | 'view:user'
    | 'view:systemlog'
    | 'view:system_info'
    | 'view:sso'
    | 'view:settings'
    | 'view:role:viewer'
    | 'view:role:admin'
    | 'view:role'
    | 'view:permission:viewer'
    | 'view:permission:super_admin'
    | 'view:permission:owner'
    | 'view:permission:admin'
    | 'view:permission'
    | 'view:notification'
    | 'view:location_policy'
    | 'view:location_device'
    | 'view:location_activity'
    | 'view:location'
    | 'view:holiday_timezone'
    | 'view:holiday'
    | 'view:group'
    | 'view:door_group'
    | 'view:controller:uid-agent'
    | 'view:controller:talk'
    | 'view:controller:protect'
    | 'view:controller:network'
    | 'view:controller:led'
    | 'view:controller:connect'
    | 'view:controller:access'
    | 'view:controller'
    | 'view:cloud_access'
    | 'view:backup'
    | 'view:app:users'
    | 'view:app:settings'
    | 'view:app:locations'
    | 'view:access.visitor'
    | 'view:access.systemlog'
    | 'view:access.settings'
    | 'view:access.schedule'
    | 'view:access.policy'
    | 'view:access.pin_code'
    | 'view:access.nfc_card'
    | 'view:access.face'
    | 'view:access.device'
    | 'view:access.dashboard'
    | 'update:access.device'
    | 'systemlog:user'
    | 'systemlog:system'
    | 'systemlog:location'
    | 'systemlog:access'
    | 'readmedia:protect.camera'
    | 'read:protect.viewer'
    | 'read:protect.user:$'
    | 'read:protect.user'
    | 'read:protect.sensor'
    | 'read:protect.recordingSchedule'
    | 'read:protect.nvr'
    | 'read:protect.light'
    | 'read:protect.group'
    | 'read:protect.camera'
    | 'read:protect.bridge'
    | 'open:door'
    | 'notify:user'
    | 'notify:talk'
    | 'notify:protect'
    | 'notify:network'
    | 'notify:location'
    | 'notify:led'
    | 'notify:access'
    | 'manage:controller:talk'
    | 'manage:controller:network'
    | 'manage:controller:led'
    | 'manage:controller:connect'
    | 'manage:controller:access'
    | 'manage:controller'
    | 'edit:user_timezone'
    | 'edit:user_credential'
    | 'edit:user'
    | 'edit:systemlog'
    | 'edit:system_info'
    | 'edit:sso'
    | 'edit:settings'
    | 'edit:role:viewer'
    | 'edit:role:admin'
    | 'edit:role'
    | 'edit:permission:viewer'
    | 'edit:permission:super_admin'
    | 'edit:permission:owner'
    | 'edit:permission:admin'
    | 'edit:permission'
    | 'edit:notification'
    | 'edit:location_policy'
    | 'edit:location_device'
    | 'edit:location_activity'
    | 'edit:location'
    | 'edit:holiday_timezone'
    | 'edit:holiday'
    | 'edit:group'
    | 'edit:feedback'
    | 'edit:door_group'
    | 'edit:controller:uid-agent'
    | 'edit:cloud_access'
    | 'edit:backup'
    | 'edit:access.visitor'
    | 'edit:access.settings'
    | 'edit:access.schedule'
    | 'edit:access.policy'
    | 'edit:access.pin_code'
    | 'edit:access.nfc_card'
    | 'edit:access.face'
    | 'edit:access.device'
    | 'deletemedia:protect.camera'
    | 'delete:protect.viewer'
    | 'delete:protect.user:$'
    | 'delete:protect.user'
    | 'delete:protect.sensor'
    | 'delete:protect.recordingSchedule'
    | 'delete:protect.nvr'
    | 'delete:protect.light'
    | 'delete:protect.group'
    | 'delete:protect.camera'
    | 'delete:protect.bridge'
    | 'delete:access.device'
    | 'create:protect.viewer'
    | 'create:protect.user'
    | 'create:protect.sensor'
    | 'create:protect.recordingSchedule'
    | 'create:protect.liveview'
    | 'create:protect.light'
    | 'create:protect.group'
    | 'create:protect.camera'
    | 'create:protect.bridge'
    | 'cloud_access:system'
    | 'cloud_access:controller'
    | 'assign:role_super_admin'
    | 'assign:role:viewer'
    | 'assign:role:admin'
    | 'assign:role'
    | 'adopt:access.device'
    | 'access.open_door:location'
    | 'access.open_door:floor'
    | 'access.open_door:door_group'
    | 'access.open_door:door'
    | 'access.open_door:building';

export type permission =
    | 'access.management'
    | 'connect.management'
    | 'led.management'
    | 'network.management'
    | 'protect.management'
    | 'system.management.location'
    | 'system.management.user'
    | 'talk.management';
