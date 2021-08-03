import { _ObjectSubSite, IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { dateInput, macAddress, timestampDate } from '../commons/types';
import { Validate } from '../commons/Validate';
import { ISiteStats } from './ISiteStats';
import { EStatsPeriod } from './EStatsPeriod';

export interface IGetSessionQuery {
    start?: dateInput;
    end?: dateInput;
    mac?: macAddress;
    type?: 'all' | 'guest' | 'user';
    _limit?: number;
    _sort?: string;
}

export class Stats extends _ObjectSubSite {
    constructor(options: IObjectSubSiteConfig) {
        super(options);
    }

    /**
     * Return a range of hours, default to the last 12 hours, or 12h before end
     * @param pStart - the start date
     * @param pEnd - the end date
     * @param hours - number of hours
     */
    private getHoursRange(pStart?: dateInput, pEnd?: dateInput, hours: number = 12): { start: Date; end: Date } {
        const end = new Date(pEnd ?? Date.now());

        let start: Date;
        if (!Validate.isDate(pStart, true)) {
            start = new Date(end);
            start.setHours(end.getHours() - hours);
        } else {
            start = new Date(pStart);
        }

        return {
            start,
            end
        };
    }

    /**
     * Return default number of hours returned when getting stats :
     *  - 5 minutes stats = 12 hours ~90 results
     *  - hourly stats = 7 * 24 hours ~170 results
     *  - daily / monthly = 52 * 7 * 24 ~365/12 results
     *
     *  number results always depends of the results stored on the controller
     *
     * @param period - the stats period
     */
    private getDefaultHourRange(period: EStatsPeriod): number {
        switch (period) {
            case EStatsPeriod.FIVE_MINUTES:
                // 12 hours
                return 12;
            case EStatsPeriod.HOURLY:
                // a week
                return 7 * 24;
            case EStatsPeriod.DAILY:
            case EStatsPeriod.MONTHLY:
                // 1 year
                return 52 * 7 * 24;
            default:
                return 24;
        }
    }

    /**
     * Fetch site stats
     *
     * returns an array stats objects for the current site
     *
     * FIVE_MINUTES need version gte 5.5.*
     */
    public async getSiteStats(
        period: EStatsPeriod = EStatsPeriod.DAILY,
        pStart?: dateInput,
        pEnd?: dateInput,
        attribs: Array<
            | 'bytes'
            | 'wan-tx_bytes'
            | 'wan-rx_bytes'
            | 'wan2-tx_bytes'
            | 'wan2-rx_bytes'
            | 'wlan_bytes'
            | 'num_sta'
            | 'lan-num_sta'
            | 'wlan-num_sta'
            | 'time'
        > = [
            'bytes',
            'wan-tx_bytes',
            'wan-rx_bytes',
            'wan2-tx_bytes',
            'wan2-rx_bytes',
            'wlan_bytes',
            'num_sta',
            'lan-num_sta',
            'wlan-num_sta',
            'time'
        ]
    ): Promise<Array<ISiteStats>> {
        if (period === EStatsPeriod.FIVE_MINUTES) {
            this.checkNeedVersion('5.5.0');
        }

        const { start, end } = this.getHoursRange(pStart, pEnd, this.getDefaultHourRange(period));

        return (
            await this.instance.post(`/stat/report/${period}.site`, {
                attrs: attribs,
                start: start.getTime(),
                end: end.getTime()
            })
        ).data.data;
    }

    /**
     * Fetch APs stats
     *
     * returns an array stats objects for the current Aps (or AP with mac)
     *
     * FIVE_MINUTES need version gte 5.5.*
     */
    public async getAPsStats(
        APMac?: string,
        period: EStatsPeriod = EStatsPeriod.DAILY,
        pStart?: dateInput,
        pEnd?: dateInput,
        attribs: Array<'bytes' | 'num_sta' | 'time'> = ['bytes', 'num_sta', 'time']
    ): Promise<Array<ISiteStats>> {
        if (period === EStatsPeriod.FIVE_MINUTES) {
            this.checkNeedVersion('5.5.0');
        }

        const { start, end } = this.getHoursRange(pStart, pEnd, this.getDefaultHourRange(period));

        const payload: { start: number; end: number; attrs: string[]; mac?: string } = {
            attrs: attribs,
            start: start.getTime(),
            end: end.getTime()
        };

        if (APMac) {
            payload.mac = APMac.toLowerCase();
        }

        return (await this.instance.post(`/stat/report/${period}.ap`, payload)).data.data;
    }

    /**
     * Fetch Users stats
     *
     * returns an array stats objects for the current Aps (or AP with mac)
     *
     * - only supported with UniFi controller versions 5.8.X and higher
     * - make sure that the retention policy for 5 minutes stats is set to the correct value in
     *   the controller settings
     * - make sure that "Clients Historical Data" has been enabled in the UniFi controller settings in the Maintenance section
     */
    public async getUsersStats(
        userMac?: string,
        period: EStatsPeriod = EStatsPeriod.DAILY,
        pStart?: dateInput,
        pEnd?: dateInput,
        attribs: Array<
            'rx_bytes' | 'tx_bytes' | 'signal' | 'rx_rate' | 'tx_rate' | 'rx_retries' | 'tx_retries' | 'rx_packets' | 'tx_packets' | 'time'
        > = ['rx_bytes', 'tx_bytes', 'time']
    ): Promise<
        Array<{
            rx_bytes?: number;
            tx_bytes?: number;
            rx_retries?: number;
            tx_retries?: number;
            rx_packets?: number;
            signal?: unknown;
            tx_packets?: number;
            time?: timestampDate;
            user: macAddress;
            o: 'user';
            oid: macAddress;
        }>
    > {
        this.checkNeedVersion('5.8.0');

        const { start, end } = this.getHoursRange(pStart, pEnd, this.getDefaultHourRange(period));

        const payload: { start: number; end: number; attrs: string[]; mac?: string } = {
            attrs: attribs,
            start: start.getTime(),
            end: end.getTime()
        };

        if (userMac) {
            payload.mac = userMac.toLowerCase();
        }

        return (await this.instance.post(`/stat/report/${period}.user`, payload)).data.data;
    }

    /**
     * Fetch gateway stats
     *
     * NOTES:
     * - requires a USG
     *
     */
    public async getGatewayStats(
        period: EStatsPeriod = EStatsPeriod.DAILY,
        pStart?: dateInput,
        pEnd?: dateInput,
        attribs: Array<
            | 'mem'
            | 'cpu'
            | 'loadavg_5'
            | 'lan-rx_errors'
            | 'lan-tx_errors'
            | 'lan-rx_bytes'
            | 'lan-tx_bytes'
            | 'lan-rx_packets'
            | 'lan-tx_packets'
            | 'lan-rx_dropped'
            | 'lan-tx_dropped'
            | 'time'
        > = ['time', 'mem', 'cpu', 'loadavg_5']
    ): Promise<
        Array<{
            rx_bytes?: number;
            tx_bytes?: number;
            rx_retries?: number;
            tx_retries?: number;
            rx_packets?: number;
            signal?: unknown;
            tx_packets?: number;
            time?: timestampDate;
            gw: macAddress;
            o: 'gw';
            oid: macAddress;
        }>
    > {
        if (period === EStatsPeriod.FIVE_MINUTES) {
            this.checkNeedVersion('5.5.0');
        }

        const { start, end } = this.getHoursRange(pStart, pEnd, this.getDefaultHourRange(period));

        return (
            await this.instance.post(`/stat/report/${period}.gw`, {
                attrs: attribs,
                start: start.getTime(),
                end: end.getTime()
            })
        ).data.data;
    }
    /**
     * Fetch IPS/IDS events
     *
     * NOTES:
     * - defaults to the past 24 hours
     * - requires a USG
     * - supported in UniFi controller versions 5.9.X and higher
     *
     *
     */
    public async getIPSEvents(pStart?: dateInput, pEnd?: dateInput, limit: number = 10000): Promise<Array<unknown>> {
        // return is unknown doesn't hesitate to open a PR
        this.checkNeedVersion('5.9.0');

        const { start, end } = this.getHoursRange(pStart, pEnd, 24);

        return (
            await this.instance.post(`/stat/ips/event`, {
                start: start.getTime(),
                end: end.getTime(),
                _limit: limit
            })
        ).data.data;
    }

    /**
     * Fetch login sessions
     *
     * NOTES:
     * - defaults to the past 7*24 hours
     *
     * ```typescript
     * // get all session between date
     * getSession({
     *  start: '2021-08-03T00:00:00.000Z',
     *  end: '2021-01-03T00:00:00.000Z',
     *  type: 'all'
     * });
     * ```
     *
     * ```typescript
     * // get 5 last sessions for mac address
     * getSession({
     *  mac: '00:0a:95:9d:68:16',
     *  _limit: 5,
     *  _sort: '-assoc_time'
     * });
     * ```
     *
     */
    public async getSession({ start: pStart, end: pEnd, mac, type = 'all', _limit, _sort }: IGetSessionQuery): Promise<Array<unknown>> {
        //a week
        const { start, end } = this.getHoursRange(pStart, pEnd, 7 * 24);

        const payload: IGetSessionQuery = {
            start: start.getTime(),
            end: end.getTime(),
            type
        };

        if (mac) {
            payload._limit = _limit ?? 5;
            payload._sort = _sort ?? '-assoc_time';
            payload.mac = mac.toLowerCase();
        }

        return (await this.instance.post(`/stat/session`, payload)).data.data;
    }

    /**
     * Fetch authorizations
     *
     * NOTES:
     * - defaults to the past 7*24 hours
     */
    public async getAuths(pStart?: dateInput, pEnd?: dateInput): Promise<Array<unknown>> {
        const { start, end } = this.getHoursRange(pStart, pEnd, 7 * 24);

        return (
            await this.instance.post(`/stat/ips/event`, {
                start: start.getTime(),
                end: end.getTime()
            })
        ).data.data;
    }

    /**
     * Fetch client devices that connected to the site within given timeframe
     *
     * NOTES:
     * - <within> is only used to select clients that were online within that period,
     *   the returned stats per client are all-time totals, irrespective of the value of <within>
     *
     * @param type - unknown need documentation (open PR)
     * @param conn - unknown need documentation (open PR)
     * @param within - optional, hours to go back (default is 8760 hours or 1 year)
     *
     */
    public async getAllUsers(
        type = 'all',
        conn = 'all',
        within: number = 8760
    ): Promise<
        Array<{
            _id: string;
            mac: string;
            site_id: string;
            oui: string;
            is_guest: boolean;
            first_seen: number;
            last_seen: number;
            is_wired: boolean;
            use_fixedip: boolean;
            network_id: string;
            fixed_ip: string;
            noted: boolean;
            usergroup_id: string;
            name: string;
            fingerprint_override: boolean;
            dev_id_override: number;
            fingerprint_source: number;
            dev_cat: number;
            dev_family: number;
            os_name: number;
            dev_vendor: number;
            dev_id: number;
            confidence: number;
            fingerprint_engine_version: string;
            hostname: string;
            note: string;
            device_name: string;
            fw_version: string;
            score?: number;
            blocked?: boolean;
        }>
    > {
        return (
            await this.instance.post(`/stat/alluser`, {
                type,
                conn,
                within
            })
        ).data.data;
    }
}
