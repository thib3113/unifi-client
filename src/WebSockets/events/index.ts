import { EUnifiControllerEvents, unifiControllerEvents, unifiSiteEvents } from './events';
import { EControllerEvents } from './EControllerEvents';
import { ESiteEvents } from './ESiteEvents';

export type events = EControllerEvents | EUnifiControllerEvents | ESiteEvents;

export type eventDataTypes = unifiControllerEvents | unifiSiteEvents | any;
