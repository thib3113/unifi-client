import { ClientError, EErrorsCodes } from '../Errors';
import { IUnknownClient } from './IUnknownClient';
import { _ObjectSubSite } from '../commons/_ObjectSubSite';
import { Client } from './Client';
import { Validate } from '../commons/Validate';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { IClientRaw } from './IClientRaw';

export type partialClient = Partial<IUnknownClient> & { mac: string };

interface IClientListParams {
    blocked?: true;
    type?: 'all' | 'blocked' | string;
    conn?: 'all' | string;
    /**
     * clients within last X seconds
     */
    within?: number;
}

export class Clients extends _ObjectSubSite {
    async create(client: partialClient): Promise<Client | undefined> {
        if (Validate.isUndefined(client.mac)) {
            throw new ClientError('mac is mandatory', EErrorsCodes.BAD_PARAMETERS);
        }

        const created = (
            await this.instance.post<IUnifiResponseEnveloppe<Array<IClientRaw>>>('/rest/user', {
                mac: client.mac.toLowerCase(),
                user_group_id: client.user_group_id ?? client.usergroup_id,
                name: client.name,
                note: client.note,
                noted: client.noted || !!client.note,
                is_guest: client.is_guest,
                is_wired: client.is_wired,
                fixed_ip: client.fixed_ip,
                network_id: client.network_id,
                use_fixedip: client.use_fixedip ?? !!client.fixed_ip
            })
        ).data?.data;

        if (created?.length > 0) {
            return this.mapObject<Client>(Client, created[0]);
        }
    }

    async getById(_id: string): Promise<Client | undefined> {
        const result = (
            await this.instance.get<IUnifiResponseEnveloppe<Array<IClientRaw>>>('/rest/user/:_id', {
                urlParams: {
                    _id
                }
            })
        ).data?.data;

        if (result?.length > 0) {
            return this.mapObject<Client>(Client, result[0]);
        }
    }

    async getByMac(mac: string): Promise<Client | undefined> {
        const result = (
            await this.instance.get<IUnifiResponseEnveloppe<Array<IClientRaw>>>('/stat/sta/:mac', {
                urlParams: {
                    mac
                }
            })
        ).data?.data;

        if (result?.length > 0) {
            return this.mapObject<Client>(Client, result[0]);
        }
    }

    // async createMultiples(pClients: Array<partialClient>): Promise<any> {
    //     const clients: Array<IUnknownClient> = pClients.map((c) => {
    //         if (Validate.isUndefined(c.mac)) {
    //             throw new ClientError('mac and user_group_id are mandatory on all clients', EErrorsCodes.BAD_PARAMETERS);
    //         }
    //         return {
    //             mac: c.mac,
    //             user_group_id: c.user_group_id,
    //             name: c.name,
    //             note: c.note,
    //             noted: c.noted || !!c.note,
    //             is_guest: c.is_guest,
    //             is_wired: c.is_wired
    //         };
    //     });
    //
    //     // allow to create multiples user, but return sub answer on each users . How to manage it ?
    //     const res = await this.instance.post(
    //         '/group/user',
    //         { objects: clients.map((c) => ({ data: c })) },
    //         {
    //             urlParams: { site: this.site.name }
    //         }
    //     );
    //     console.log(res);
    //     return res;
    // }

    // other way to do a list, seems to return same results...
    // but available if works better for you
    async list2(params?: IClientListParams): Promise<Array<Client>> {
        return (
            (
                await this.instance.get('/list/user', {
                    params
                })
            ).data?.data || []
        ).map((r) => this.mapObject<Client>(Client, r));
    }

    // list online clients
    // less results but more detailed ( same as the "clients" view )
    async list3(params?: IClientListParams): Promise<Array<Client>> {
        const res =
            (
                await this.instance.get('/stat/sta', {
                    params
                })
            ).data?.data || [];
        return res.map((r) => this.mapObject<Client>(Client, r));
    }

    public async list(params?: IClientListParams): Promise<Array<Client>> {
        return (
            (
                await this.instance.get('/stat/alluser', {
                    params
                })
            ).data?.data || []
        ).map((r) => this.mapObject<Client>(Client, r));
    }
}
