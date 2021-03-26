import _ObjectSubSite, { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { IDevice } from './IDevice';
import { ClientError, EErrorsCodes } from '../Errors';
import Validate from '../commons/Validate';

export default class Device extends _ObjectSubSite implements IDevice {
    constructor(config: IObjectSubSiteConfig, props: IDevice) {
        super(config);

        this._id = props._id;
        if (!this._id) {
            throw new ClientError('_id is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.import(props);

        this.needVersion('forget', this._forget, '5.9.0');
    }

    protected import(props: IDevice): this {
        if (!Validate.isUndefined(props.confidence)) {
            this.confidence = props.confidence;
        }
        if (!Validate.isUndefined(props.dev_cat)) {
            this.dev_cat = props.dev_cat;
        }
        if (!Validate.isUndefined(props.dev_family)) {
            this.dev_family = props.dev_family;
        }
        if (!Validate.isUndefined(props.dev_id)) {
            this.dev_id = props.dev_id;
        }
        if (!Validate.isUndefined(props.dev_id_override)) {
            this.dev_id_override = props.dev_id_override;
        }
        if (!Validate.isUndefined(props.dev_vendor)) {
            this.dev_vendor = props.dev_vendor;
        }
        if (!Validate.isUndefined(props.fingerprint_override)) {
            this.fingerprint_override = props.fingerprint_override;
        }
        if (!Validate.isUndefined(props.fingerprint_source)) {
            this.fingerprint_source = props.fingerprint_source;
        }
        if (!Validate.isUndefined(props.first_seen)) {
            this.first_seen = props.first_seen;
        }
        if (!Validate.isUndefined(props.hostname)) {
            this.hostname = props.hostname;
        }
        if (!Validate.isUndefined(props.is_guest)) {
            this.is_guest = props.is_guest;
        }
        if (!Validate.isUndefined(props.is_wired)) {
            this.is_wired = props.is_wired;
        }
        if (!Validate.isUndefined(props.last_seen)) {
            this.last_seen = props.last_seen;
        }
        if (!Validate.isUndefined(props.mac)) {
            this.mac = props.mac;
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
        if (!Validate.isUndefined(props.os_name)) {
            this.os_name = props.os_name;
        }
        if (!Validate.isUndefined(props.oui)) {
            this.oui = props.oui;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.site_id = props.site_id;
        }
        if (!Validate.isUndefined(props.user_group_id)) {
            this.user_group_id = props.user_group_id;
        }

        if (!Validate.isUndefined(props.use_fixedip)) {
            this.use_fixedip = props.use_fixedip;
        }
        if (!Validate.isUndefined(props.network_id)) {
            this.network_id = props.network_id;
        }
        if (!Validate.isUndefined(props.fixed_ip)) {
            this.fixed_ip = props.fixed_ip;
        }
        if (!Validate.isUndefined(props.fingerprint_engine_version)) {
            this.fingerprint_engine_version = props.fingerprint_engine_version;
        }
        return this;
    }

    /**
     * Forget one or more client devices - forget_sta()
     *
     * return true on success
     * required parameter <macs> = array of client MAC addresses
     *
     * NOTE:
     * only supported with controller versions 5.9.X and higher, can be
     * slow (up to 5 minutes) on larger controllers
     */
    public forget: () => Promise<Device>;
    private async _forget(): Promise<Device> {
        const json = { cmd: 'forget-sta', macs: [this.mac] };
        return this.mapObject<Device>(
            Device,
            (
                (
                    await this.instance.post('/api/s/:site/cmd/stamgr', json, {
                        urlParams: {
                            site: this.site.name
                        },
                        timeout: 10 * 60 * 1000
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async delete(): Promise<void> {
        return this.instance.delete('/api/s/:site/rest/user/:id', {
            urlParams: {
                site: this.site.name,
                id: this._id
            }
        });
    }

    public _id: string;
    public confidence: number;
    public dev_cat: number;
    public dev_family: number;
    public dev_id: number;
    public dev_id_override: number;
    public dev_vendor: number;
    public fingerprint_override: boolean;
    public fingerprint_source: number;
    public first_seen: number;
    public hostname: string;
    public is_guest: boolean;
    public is_wired: boolean;
    public last_seen: number;
    public mac: string;
    public name: string;
    public note: string;
    public noted: boolean;
    public os_name: number;
    public oui: string;
    public site_id: string;
    public user_group_id: string;
    public use_fixedip: boolean;
    public network_id: string;
    public fixed_ip: string;
    public fingerprint_engine_version: string;
}
