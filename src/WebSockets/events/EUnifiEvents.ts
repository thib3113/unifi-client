import { timeZone, uuid } from '../../commons/types';
import { IApp, IController, IReleaseInformations, ISystem, releaseChannels } from '../Interfaces';

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
        controllers: Array<IController>;
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

export type unifiControllerEvents =
    | IControllerEvent
    | IErrorEvent
    | ISystemEvent
    | IUpdateDeviceRestoreProgressEvent
    | IDeviceStateChangedEvent;

export interface ISiteEvent {
    meta: {
        rc: string;
        message: string;
        product_line?: string;
    };
    data: Array<unknown>;
}

export interface ISiteEventsEvent {
    meta: {
        rc: string;
        message: 'events';
    };
    data: Array<Record<string, unknown> & { key: string }>;
}
