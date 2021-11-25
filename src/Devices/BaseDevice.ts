import { EProductLine } from './EProductLine';
import { _ObjectSubSite } from '../commons';

export class BaseDevice extends _ObjectSubSite {
    public _productLine: EProductLine;
    public mac: string;
}
