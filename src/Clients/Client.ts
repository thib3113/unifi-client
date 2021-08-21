import { _ObjectSubSite, IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { IDevice } from './IDevice';
import { ClientError, EErrorsCodes } from '../Errors';
import { Validate } from '../commons/Validate';
import { createDebugger } from '../util';
import { IClientRaw } from './IClientRaw';
import { IUnifiResponseEnveloppe } from '../interfaces';

export type DeviceData = Partial<IDevice> & {
    _original?: Partial<Omit<DeviceData, '_original'>>;
};

export class Client extends _ObjectSubSite {
    static debug = createDebugger('client');

    constructor(config: IObjectSubSiteConfig, props: Partial<IClientRaw> & { mac: string }) {
        super(config);

        this.mac = props.mac;
        if (!this.mac) {
            throw new ClientError('mac is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.debug = Client.debug.extend(this.mac);
        this.import(props);

        this.needVersion('forget', this._forget, '5.9.0');
    }

    protected import(props: Partial<IClientRaw>): this {
        this.debug('import()');
        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.siteId = props.site_id;
        }
        if (!Validate.isUndefined(props.oui)) {
            this.oui = props.oui;
        }
        if (!Validate.isUndefined(props.hostname)) {
            this.hostname = props.hostname;
        }

        let device: DeviceData = this.device?._original ?? this.device ?? {};

        if (!Validate.isUndefined(props.fingerprint_source)) {
            device._fingerPrintSource = props.fingerprint_source;
        }
        if (!Validate.isUndefined(props.dev_cat)) {
            device.category = props.dev_cat;
        }
        if (!Validate.isUndefined(props.dev_family)) {
            device.family = props.dev_family;
        }
        if (!Validate.isUndefined(props.os_name)) {
            device.os = props.os_name;
        }
        if (!Validate.isUndefined(props.dev_vendor)) {
            device.vendor = props.dev_vendor;
        }
        if (!Validate.isUndefined(props.dev_id)) {
            device.id = props.dev_id;
        }
        if (!Validate.isUndefined(props.fingerprint_engine_version)) {
            device._fingerprintEngineVersion = props.fingerprint_engine_version;
        }
        if (!Validate.isUndefined(props.device_name)) {
            device.name = props.device_name;
        }

        if (props.fingerprint_override ?? this.device?._overridden ?? false) {
            const _original = { ...device };
            device = {
                id: props.dev_id_override,
                _original
            };
        }

        this.device = device;

        if (!Validate.isUndefined(props.confidence)) {
            this.confidence = props.confidence;
        }

        if (!Validate.isUndefined(props.fw_version)) {
            this.firmwareVersion = props.fw_version;
        }
        if (!Validate.isUndefined(props.score)) {
            this.score = props.score;
        }
        if (!Validate.isUndefined(props.blocked)) {
            this.blocked = props.blocked;
        }
        if (!Validate.isUndefined(props.user_group_id) || !Validate.isUndefined(props.usergroup_id)) {
            this.groupId = props.user_group_id || props.usergroup_id;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.note)) {
            this.note = props.note;
        }
        if (!Validate.isUndefined(props.noted)) {
            this.noted = props.noted;
        }
        if (!Validate.isUndefined(props.is_guest)) {
            this.isGuest = props.is_guest;
        }
        if (!Validate.isUndefined(props.is_wired)) {
            this.isWired = props.is_wired;
        }
        if (!Validate.isUndefined(props.fixed_ip)) {
            this.fixedIp = props.fixed_ip;
        }
        if (!Validate.isUndefined(props.network_id)) {
            this.networkId = props.network_id;
        }
        if (!Validate.isUndefined(props.use_fixedip)) {
            this.useFixedIp = props.use_fixedip;
        }
        if (!Validate.isUndefined(props.first_seen)) {
            this.firstSeen = new Date(Validate.isNumber(props.first_seen) ? props.first_seen * 1000 : props.first_seen);
        }
        if (!Validate.isUndefined(props.last_seen)) {
            this.lastSeen = new Date(Validate.isNumber(props.last_seen) ? props.last_seen * 1000 : props.last_seen);
        }
        return this;
    }

    /**
     * Forget one or more client devices
     *
     * NOTE:
     * only supported with controller versions 5.9.X and higher, can be
     * slow (up to 5 minutes) on larger controllers
     */
    public forget: () => Promise<Client>;
    private async _forget(): Promise<Client> {
        this.debug('forget()');
        const json = { cmd: 'forget-sta', macs: [this.mac] };
        return this.mapObject<Client>(
            Client,
            (
                (
                    await this.instance.post('/cmd/stamgr', json, {
                        timeout: 10 * 60 * 1000
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async delete(): Promise<void> {
        this.debug('delete()');
        return this.instance.delete('/rest/user/:id', {
            urlParams: {
                site: this.site.name,
                id: this._id
            }
        });
    }

    public async save(): Promise<unknown> {
        this.debug('save()');
        const device: Partial<IClientRaw> = {};

        device.name = this.name || '';

        device.note = this.note;
        device.noted = !!this.note;

        device.user_group_id = this.groupId;

        return this.instance.post('/upd/user/:id', device, {
            urlParams: {
                site: this.site.name,
                id: this._id
            }
        });
    }

    public async block(): Promise<this> {
        this.debug('block()');
        this.import(
            (
                await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', {
                    cmd: 'block-sta',
                    mac: this.mac.toLowerCase()
                })
            ).data?.data
        );
        return this;
    }

    public async unblock(): Promise<this> {
        this.debug('unblock()');

        this.import(
            (
                await this.instance.post<IUnifiResponseEnveloppe<IClientRaw>>('/cmd/stamgr', {
                    cmd: 'unblock-sta',
                    mac: this.mac.toLowerCase()
                })
            ).data?.data
        );
        return this;
    }

    public device: DeviceData;
    public _id: string;
    public confidence?: number;
    public firstSeen?: Date;
    public hostname?: string;
    public isGuest?: boolean;
    public isWired?: boolean;
    public lastSeen?: Date;
    public mac: string;
    public name?: string;
    public note?: string;
    public noted?: boolean;
    public oui?: string;
    public siteId?: string;
    public groupId?: string;
    public useFixedIp?: boolean;
    public networkId?: string;
    public fixedIp?: string;
    public firmwareVersion?: string;
    public score?: number;
    public blocked?: boolean;
}
