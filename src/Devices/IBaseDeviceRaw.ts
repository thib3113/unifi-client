import { EProductLine } from './EProductLine';
import { IBaseDeviceMandatoryRaw } from './IBaseDeviceMandatoryRaw';

export interface IBaseDeviceRaw extends IBaseDeviceMandatoryRaw {
    product_line?: EProductLine | string;
    upload_speed_bytes_per_second?: number;
    usage_bytes?: number;
}
