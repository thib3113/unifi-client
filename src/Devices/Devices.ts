import _ObjectSubSite from '../commons/_ObjectSubSite';
import Validate from '../commons/Validate';
import { ClientError, EErrorsCodes } from '../Errors';
import { IUnknownDevice } from './IUnknownDevice';
import Device from './Device';

export type partialDevice = Partial<IUnknownDevice> & { mac: string };

export default class Devices extends _ObjectSubSite {
    async create(device: partialDevice): Promise<Device> {
        if (Validate.isUndefined(device.mac)) {
            throw new ClientError('mac is mandatory', EErrorsCodes.BAD_PARAMETERS);
        }

        return this.mapObject<Device>(
            Device,
            (
                (
                    await this.instance.post(
                        '/api/s/:site/rest/user',
                        {
                            mac: device.mac,
                            user_group_id: device.user_group_id,
                            name: device.name,
                            note: device.note,
                            noted: device.noted || !!device.note,
                            is_guest: device.is_guest,
                            is_wired: device.is_wired,
                            fixed_ip: device.fixed_ip,
                            network_id: device.network_id,
                            use_fixedip: Validate.isUndefined(device.use_fixedip) ? device.use_fixedip : !!device.fixed_ip
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
    async get(_id: string): Promise<Device> {
        return this.mapObject<Device>(
            Device,
            (
                (
                    await this.instance.get('/api/s/:site/rest/user/:_id', {
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
    //         '/api/s/:site/group/user',
    //         { objects: clients.map((c) => ({ data: c })) },
    //         {
    //             urlParams: { site: this.site.name }
    //         }
    //     );
    //     console.log(res);
    //     return res;
    // }

    // other way to do a list, seems to return same results...
    // but available if better works for you
    async list2(): Promise<Array<Device>> {
        return (
            (
                await this.instance.get('/api/s/:site/list/user', {
                    urlParams: {
                        site: this.site.name
                    }
                })
            ).data?.data || []
        ).map((r) => this.mapObject<Device>(Device, r));
    }

    public async list(): Promise<Array<Device>> {
        return (
            (
                await this.instance.get('/api/s/:site/stat/alluser', {
                    urlParams: {
                        site: this.site.name
                    }
                })
            ).data?.data || []
        ).map((r) => this.mapObject<Device>(Device, r));
    }
}
