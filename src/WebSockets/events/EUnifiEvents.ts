import { timeZone, uuid } from '../../commons/types';
import { IApp, IController, IReleaseInformations, ISystem, releaseChannels } from '../Interfaces';

/**
 * only known events, open PR to add more
 */
export enum EUnifiEvents {
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

export interface IErrorEvent {
    type: 'ERROR';
    message: string;
}

export interface ISystemEvent {
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

export interface IUpdateDeviceRestoreProgressEvent {
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

export interface IDeviceStateChangedEvent {
    type: 'DEVICE_STATE_CHANGED';
    system: ISystem;
}
