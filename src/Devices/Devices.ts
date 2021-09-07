import { _ObjectSubSite } from '../commons/_ObjectSubSite';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { ILANDeviceRaw } from './ILANDeviceRaw';
import { IWLANDeviceRaw } from './IWLANDeviceRaw';
import { UAPDevice } from './UAPDevice';
import { tDevice } from '../commons/types';
import { createDebugger } from '../util';
import { IBaseDeviceRaw } from './IBaseDeviceRaw';
import { UBBDevice } from './UBBDevice';
import { UDMDevice } from './UDMDevice';
import { UGWDevice } from './UGWDevice';
import { USWDevice } from './USWDevice';
import { UXGDevice } from './UXGDevice';
import { BaseDevice } from './BaseDevice';
import { EDeviceType } from './EDeviceType';

const devicesFactory = [UAPDevice, UBBDevice, UDMDevice, UGWDevice, USWDevice, UXGDevice];

const debug = createDebugger('Devices');
export class Devices extends _ObjectSubSite {
    public async list(): Promise<Array<tDevice>> {
        debug('list');
        return (
            (
                await this.instance.get<IUnifiResponseEnveloppe<Array<ILANDeviceRaw | IWLANDeviceRaw | IBaseDeviceRaw>>>('/stat/device')
            ).data.data?.map((d) => this.mapDevice(d)) || []
        );
    }

    private mapDevice(device: IBaseDeviceRaw): tDevice {
        debug('%s seems to be an %s', device.mac, device.type ?? EDeviceType.UNKNOWN);
        const constructor = devicesFactory.find((f) => f.type === device.type) ?? BaseDevice;
        return this.mapObject<tDevice>(constructor, device);
    }
}
