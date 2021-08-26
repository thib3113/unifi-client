import { IClientGroupRaw } from '../../src/Clients/IClientGroupRaw';
import { site } from './site';

export const groupRaw: IClientGroupRaw = {
    name: 'test',
    site_id: site._id,
    _id: '612743c7cb9b2406b6152f3e',
    attr_hidden_id: '612743c7cb9b2406b6152f3e',
    attr_no_delete: false,
    qos_rate_max_down: 10 * 1000, //10Mbps
    qos_rate_max_up: 1000 //1Mbps
};
