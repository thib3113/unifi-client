import { tDevice } from '../types';
import { _ObjectSubSite } from '../../commons';
import { OpenAPRError } from '../../Errors/OpenAPR';
import { IBaseDeviceMandatoryRaw } from '../IBaseDeviceMandatoryRaw';

export class BaseDeviceMapper extends _ObjectSubSite {
    mapDevice(rawDevice: IBaseDeviceMandatoryRaw): Promise<tDevice> {
        throw new OpenAPRError(`you discovered a totally unknown device ${rawDevice.mac}`);
    }
}
