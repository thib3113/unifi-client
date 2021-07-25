import { EUnifiEvents, IDeviceStateChangedEvent, ISystemEvent, IUpdateDeviceRestoreProgressEvent } from './EUnifiEvents';
import { EControllerEvents } from './EControllerEvents';

export type events = EControllerEvents | EUnifiEvents;

export type eventDataTypes = IDeviceStateChangedEvent | IUpdateDeviceRestoreProgressEvent | ISystemEvent | any;
