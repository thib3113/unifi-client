import { _ObjectSubSite } from '../commons/_ObjectSubSite';
import { ClientsGroup } from './ClientsGroup';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { IClientGroupRaw } from './IClientGroupRaw';

export type partialClientsGroup = {
    name: string;
    downloadBandwidth?: number;
    uploadBandwidth?: number;
};

interface ICreateClientsGroupRaw {
    name: string;
    qos_rate_max_down: number;
    qos_rate_max_up: number;
}

export class ClientsGroups extends _ObjectSubSite {
    /**
     * Create user group
     */
    async create(clientGroup: partialClientsGroup): Promise<ClientsGroup | undefined> {
        this.debug('create()');
        const payload: ICreateClientsGroupRaw = {
            name: clientGroup.name,
            qos_rate_max_down: clientGroup.downloadBandwidth ?? -1,
            qos_rate_max_up: clientGroup.uploadBandwidth ?? -1
        };
        const group = (await this.instance.post<IUnifiResponseEnveloppe<Array<IClientGroupRaw>>>('/rest/usergroup', payload)).data.data;
        if (group.length > 0) {
            return this.mapObject<ClientsGroup>(ClientsGroup, group[0]);
        }
    }

    async list(): Promise<Array<ClientsGroup>> {
        this.debug('create()');
        const res = (await this.instance.get('/list/usergroup')).data?.data || [];
        return res.map((r) => this.mapObject<ClientsGroup>(ClientsGroup, r));
    }
}
