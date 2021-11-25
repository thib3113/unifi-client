import { BaseDeviceMapper } from '../mappers/BaseDeviceMapper';
import { tDevice } from '../types';
import { OpenAPRError } from '../../Errors/OpenAPR';
import { IBaseConnectDeviceRaw } from './IBaseConnectDeviceRaw';

export class ConnectDeviceMapper extends BaseDeviceMapper {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mapDevice(rawDevice: IBaseConnectDeviceRaw): Promise<tDevice> {
        throw new OpenAPRError(`it seems that you have a connect device, doesn't hesitate to help the project.`);
    }
}
