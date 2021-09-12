import { ClientError, EErrorsCodes } from '../Errors';
import { IUnknownClient } from './IUnknownClient';
import { _ObjectSubSite } from '../commons/_ObjectSubSite';
import { Client } from './Client';
import { Validate } from '../commons/Validate';
import { IUnifiResponseEnveloppe } from '../interfaces';
import { IClientRaw } from './IClientRaw';
import { macAddress, unifiId } from '../commons';

export type partialClient = Partial<IUnknownClient> & { mac: string };

export interface IClientListParams {
    blocked?: true;
    type?: 'all' | 'blocked' | string;
    conn?: 'all' | string;
    /**
     * clients within last X hours
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

    /**
     * get a client by _id
     * @param _id - unifiId
     */
    async getById(_id: unifiId): Promise<Client | undefined> {
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

    /**
     * get a Client by mac
     * call /stat/sta/:mac ( seems to return same as /stat/user/:mac )
     * @param mac - the macAddress
     */
    async getByMac(mac: macAddress): Promise<Client | undefined> {
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

    /**
     * Use this function to list clients
     *
     * example to get all blocked user in the last 10 hours
     * ```
     * list({
     *   type: 'blocked',
     *   conn: 'all',
     *   within: 10
     * });
     * ```
     *
     * example to get all user from the last 2 hours
     * ```
     * list({
     *   type: 'all',
     *   conn: 'all',
     *   within: 2
     * });
     * ```
     */
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
