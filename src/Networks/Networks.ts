import { Network } from './Network';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { _ObjectSubSite } from '../commons';
import { createDebugger } from '../util';

const debug = createDebugger('Networks');
export class Networks extends _ObjectSubSite {
    public async list(): Promise<Array<Network>> {
        debug('list');
        return (
            (await this.instance.get<IUnifiResponseEnveloppe<Array<Network>>>('/rest/networkconf')).data.data?.map((d) =>
                this.mapObject<Network>(Network, d)
            ) || []
        );
    }
}
