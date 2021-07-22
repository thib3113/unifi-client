import _ObjectSubSite from '../commons/_ObjectSubSite';
import { createDebugger } from '../util';
import Validate from '../commons/Validate';
import { ClientError, EErrorsCodes } from '../Errors';
import { IGuestAuthorization } from './IGuestAuthorization';
import { IAuthorizeGuest } from './IAuthorizeGuest';
import GuestAuthorization from './GuestAuthorization';

const debug = createDebugger('Hotspots');
export default class Hotspots extends _ObjectSubSite {
    // constructor(config: IObjectSubSiteConfig) {
    //     super(config);
    //
    // }

    public async authorizeGuest({ mac, minutes, ap_mac, bytes, down, up }: IAuthorizeGuest, force = false): Promise<IGuestAuthorization> {
        debug('AuthorizeGuest()');

        if (this.controller.unifiOs && !force) {
            //tested on UDM pro 6.1.67
            throw new ClientError(
                'this function will return an error 500 on unifiOs device, but can work . You can pass force=true to force it',
                EErrorsCodes.NEED_TO_FORCE
            );
        }

        const json: IAuthorizeGuest & { cmd: string } = { cmd: 'authorize-guest', mac: mac.toLowerCase() };
        if (!Validate.isUndefined(minutes)) {
            json.minutes = minutes;
        }

        /**
         * If we have received values for up/down/megabytes/ap_mac we append them to the payload array to be submitted
         */
        if (!Validate.isUndefined(up)) {
            json.up = up;
        }

        if (!Validate.isUndefined(down)) {
            json.down = down;
        }

        if (!Validate.isUndefined(bytes)) {
            json.bytes = bytes;
        }

        if (!Validate.isUndefined(ap_mac)) {
            json.ap_mac = ap_mac.toLowerCase();
        }

        const res = (await this.instance.post('/cmd/stamgr', json, { urlParams: { site: this.site.name } })).data?.data.pop();
        return this.mapObject<GuestAuthorization>(GuestAuthorization, res);
    }

    public async unAuthorizeGuest(mac: string): Promise<void> {
        await this.instance.post(
            '/cmd/stamgr',
            { cmd: 'unauthorize-guest', mac: mac.toLowerCase() },
            { urlParams: { site: this.site.name } }
        );
    }
}
