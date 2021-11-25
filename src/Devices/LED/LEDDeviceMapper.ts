import { BaseDeviceMapper } from '../mappers/BaseDeviceMapper';
import { tDevice } from '../types';
import { OpenAPRError } from '../../Errors/OpenAPR';
import { IBaseLEDDeviceRaw } from './IBaseLEDDeviceRaw';

export class LEDDeviceMapper extends BaseDeviceMapper {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapDevice(rawDevice: IBaseLEDDeviceRaw): Promise<tDevice> {
        throw new OpenAPRError(`it seems that you have a LED device, doesn't hesitate to help the project.`);
    }
}
