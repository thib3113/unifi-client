import { EUnifiControllerEvents, IDeviceStateChangedEvent, ISystemEvent, IUpdateDeviceRestoreProgressEvent } from './EUnifiEvents';
import { EControllerEvents } from './EControllerEvents';

export type events = EControllerEvents | EUnifiControllerEvents;

export type eventDataTypes = IDeviceStateChangedEvent | IUpdateDeviceRestoreProgressEvent | ISystemEvent | any;
