import { semverVersion } from '../commons/types';

/**
 * This value need to be mapped to fingerprints : {@link IDeviceFingerprint}
 */
export interface IDevice {
    _overridden?: boolean;
    _fingerPrintSource?: number;
    _fingerprintEngineVersion: semverVersion;
    category?: number;
    family?: number;
    os?: number;
    vendor?: number;
    id?: number;
    name?: string;
}
