import { Network } from './Network';
import { INetwork } from './INetwork';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { _ObjectSubSite } from '../commons';
import { createDebugger } from '../util';

const debug = createDebugger('Networks');
export class Networks extends _ObjectSubSite {
    public async list(): Promise<Array<Network>> {
        debug('list');
        return (
            (await this.instance.get<IUnifiResponseEnveloppe<Array<INetwork>>>('/rest/networkconf')).data.data?.map((d) =>
                this.mapNetwork(d)
            ) || []
        );
    }

    private mapNetwork(network: INetwork): Network {
        return this.mapObject<Network>(Network, network);
    }
}
