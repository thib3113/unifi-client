import { BaseDeviceMapper } from '../mappers/BaseDeviceMapper';
import { tDevice } from '../types';
import { OpenAPRError } from '../../Errors/OpenAPR';
import { IBaseAccessDeviceRaw } from './IBaseAccessDeviceRaw';

export class AccessDeviceMapper extends BaseDeviceMapper {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapDevice(rawDevice: IBaseAccessDeviceRaw): Promise<tDevice> {
        throw new OpenAPRError(`it seems that you have an access device, doesn't hesitate to help the project.`);
    }
}
