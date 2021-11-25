import { BaseDeviceMapper } from '../mappers/BaseDeviceMapper';
import { tDevice } from '../types';
import { OpenAPRError } from '../../Errors/OpenAPR';
import { IBaseTalkDeviceRaw } from './IBaseTalkDeviceRaw';

export class TalkDeviceMapper extends BaseDeviceMapper {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapDevice(rawDevice: IBaseTalkDeviceRaw): Promise<tDevice> {
        throw new OpenAPRError(`it seems that you have a talk device, doesn't hesitate to help the project.`);
    }
}
