import { _ObjectSubSite } from '../commons/_ObjectSubSite';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { ILANDeviceRaw } from './ILANDeviceRaw';
import { IWLANDeviceRaw } from './IWLANDeviceRaw';
import { Validate } from '../commons/Validate';
import { WLANDevice } from './WLANDevice';
import { LANDevice } from './LANDevice';
import { tDevice } from '../commons/types';
import { createDebugger } from '../util';
import { IBaseDeviceRaw } from './IBaseDeviceRaw';

const debug = createDebugger('Devices');
export class Devices extends _ObjectSubSite {
    public async list(): Promise<Array<tDevice>> {
        debug('list');
        return (
            await this.instance.get<IUnifiResponseEnveloppe<Array<ILANDeviceRaw | IWLANDeviceRaw | IBaseDeviceRaw>>>('/stat/device')
        ).data.data?.map((d) => {
            if (Validate.implementsTKeys<IWLANDeviceRaw>(d, ['radio_table'])) {
                debug('%s seems to be a WLANDevice', d.mac);
                return this.mapObject<WLANDevice>(WLANDevice, d);
            } else {
                debug('%s seems to be a LANDevice', d.mac);
                return this.mapObject<LANDevice>(LANDevice, d);
            }
        });
    }
}
