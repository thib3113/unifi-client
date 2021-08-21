import { ClientError, EErrorsCodes } from '../Errors';
import { IUnknownClient } from './IUnknownClient';
import { _ObjectSubSite } from '../commons/_ObjectSubSite';
import { Client } from './Client';
import { Validate } from '../commons/Validate';

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
    async create(client: partialClient): Promise<Client> {
        if (Validate.isUndefined(client.mac)) {
            throw new ClientError('mac is mandatory', EErrorsCodes.BAD_PARAMETERS);
        }

        return this.mapObject<Client>(
            Client,
            (
                (
                    await this.instance.post(
                        '/rest/user',
                        {
                            mac: client.mac,
                            user_group_id: client.user_group_id ?? client.usergroup_id,
                            name: client.name,
                            note: client.note,
                            noted: client.noted || !!client.note,
                            is_guest: client.is_guest,
                            is_wired: client.is_wired,
                            fixed_ip: client.fixed_ip,
                            network_id: client.network_id,
                            use_fixedip: client.use_fixedip ?? !!client.fixed_ip
                        },
                        {
                            urlParams: { site: this.site.name }
                        }
                    )
                ).data?.data || []
            ).pop()
        );
    }

    // get return a different kind of device
    async get(_id: string): Promise<Client> {
        return this.mapObject<Client>(
            Client,
            (
                (
                    await this.instance.get('/rest/user/:_id', {
                        urlParams: {
                            site: this.site.name,
                            _id
                        }
                    })
                ).data?.data || []
            ).pop()
        );
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
                    params,
                    urlParams: {
                        site: this.site.name
                    }
                })
            ).data?.data || []
        ).map((r) => this.mapObject<Client>(Client, r));
    }

    public async list(params?: IClientListParams): Promise<Array<Client>> {
        return (
            (
                await this.instance.get('/stat/alluser', {
                    params,
                    urlParams: {
                        site: this.site.name
                    }
                })
            ).data?.data || []
        ).map((r) => this.mapObject<Client>(Client, r));
    }
}
