import { ClientError, EStatsPeriod, Stats } from '../../src';
import { controller, resetControllerVersion, site } from '../mocks';
import axios from 'axios';
import { date as globalDate, macAddress } from '../globals';

describe('Stats.tests.ts', () => {
    let instance = site.getInstance() as jest.Mocked<typeof axios>;
    const stats = new Stats({
        site,
        controller,
        instance
    });

    instance.post.mockImplementation(() =>
        Promise.resolve({
            data: {
                data: []
            }
        })
    );

    beforeEach(() => {
        (instance as unknown as jest.Mock).mockClear();

        resetControllerVersion();
    });

    describe('getSiteStats', () => {
        it('should test defaults parameters', async () => {
            await stats.getSiteStats();
            // call daily.site (daily) / with defaults attrs, with end and start depending of the date
            expect(instance.post).toBeCalledWith('/stat/report/daily.site', {
                attrs: [
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
                ],
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test with different period', async () => {
            await stats.getSiteStats(EStatsPeriod.FIVE_MINUTES);
            await stats.getSiteStats(EStatsPeriod.HOURLY);
            await stats.getSiteStats(EStatsPeriod.DAILY);
            await stats.getSiteStats(EStatsPeriod.MONTHLY);

            expect(instance.post).toHaveBeenNthCalledWith(1, '/stat/report/5minutes.site', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(2, '/stat/report/hourly.site', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(3, '/stat/report/daily.site', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(4, '/stat/report/monthly.site', expect.any(Object));
        });
        it('should test with specific start date', async () => {
            const date = globalDate;
            await stats.getSiteStats(undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    start: date
                })
            );
        });
        it('should test with specific end date', async () => {
            const date = globalDate;
            await stats.getSiteStats(undefined, undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    end: date
                })
            );
        });
        it('should test with custom attribs', async () => {
            await stats.getSiteStats(undefined, undefined, undefined, ['lan-num_sta', 'wan-rx_bytes', 'wan2-tx_bytes']);

            expect(instance.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    attrs: ['lan-num_sta', 'wan-rx_bytes', 'wan2-tx_bytes']
                })
            );
        });
        it('should crash if controller version it too low', async () => {
            controller.version = '5.4.0';
            expect.assertions(3);
            try {
                await stats.getSiteStats(EStatsPeriod.FIVE_MINUTES);
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('need minimal controller version 5.5.0');
                expect(instance.post).not.toBeCalled();
            }
        });
    });
    describe('getAPsStats', () => {
        it('should test defaults parameters', async () => {
            await stats.getAPsStats();
            expect(instance.post).toBeCalledWith('/stat/report/daily.ap', {
                attrs: ['bytes', 'num_sta', 'time'],
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test with specific AP mac', async () => {
            await stats.getAPsStats(macAddress);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    mac: macAddress
                })
            );
        });
        it('should test with specific AP mac uppercase', async () => {
            await stats.getAPsStats(macAddress.toUpperCase());

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    mac: macAddress
                })
            );
        });
        it('should test with different period', async () => {
            await stats.getAPsStats(undefined, EStatsPeriod.FIVE_MINUTES);
            await stats.getAPsStats(undefined, EStatsPeriod.HOURLY);
            await stats.getAPsStats(undefined, EStatsPeriod.DAILY);
            await stats.getAPsStats(undefined, EStatsPeriod.MONTHLY);

            expect(instance.post).toHaveBeenNthCalledWith(1, '/stat/report/5minutes.ap', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(2, '/stat/report/hourly.ap', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(3, '/stat/report/daily.ap', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(4, '/stat/report/monthly.ap', expect.any(Object));
        });
        it('should test with specific start date', async () => {
            const date = globalDate;
            await stats.getAPsStats(undefined, undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    start: date
                })
            );
        });
        it('should test with specific end date', async () => {
            const date = globalDate;
            await stats.getAPsStats(undefined, undefined, undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    end: date
                })
            );
        });
        it('should test with custom attribs', async () => {
            await stats.getAPsStats(undefined, undefined, undefined, undefined, ['num_sta', 'time']);

            expect(instance.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    attrs: ['num_sta', 'time']
                })
            );
        });
        it('should crash if controller version it too low', async () => {
            controller.version = '5.4.0';
            expect.assertions(3);
            try {
                await stats.getAPsStats(undefined, EStatsPeriod.FIVE_MINUTES);
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('need minimal controller version 5.5.0');
                expect(instance.post).not.toBeCalled();
            }
        });
    });
    describe('getUsersStats', () => {
        it('should test defaults parameters', async () => {
            await stats.getUsersStats();
            expect(instance.post).toBeCalledWith('/stat/report/daily.user', {
                attrs: ['rx_bytes', 'tx_bytes', 'time'],
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test with specific user mac', async () => {
            await stats.getUsersStats(macAddress);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    mac: [macAddress]
                })
            );
        });
        it('should test with specific user mac uppercase', async () => {
            await stats.getUsersStats(macAddress.toUpperCase());

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    mac: [macAddress]
                })
            );
        });
        it('should test with different period', async () => {
            await stats.getUsersStats(undefined, EStatsPeriod.FIVE_MINUTES);
            await stats.getUsersStats(undefined, EStatsPeriod.HOURLY);
            await stats.getUsersStats(undefined, EStatsPeriod.DAILY);
            await stats.getUsersStats(undefined, EStatsPeriod.MONTHLY);

            expect(instance.post).toHaveBeenNthCalledWith(1, '/stat/report/5minutes.user', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(2, '/stat/report/hourly.user', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(3, '/stat/report/daily.user', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(4, '/stat/report/monthly.user', expect.any(Object));
        });
        it('should test with specific start date', async () => {
            const date = globalDate;
            await stats.getUsersStats(undefined, undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    start: date
                })
            );
        });
        it('should test with specific end date', async () => {
            const date = globalDate;
            await stats.getUsersStats(undefined, undefined, undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    end: date
                })
            );
        });
        it('should test with custom attribs', async () => {
            await stats.getUsersStats(undefined, undefined, undefined, undefined, ['time', 'tx_retries', 'signal']);

            expect(instance.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    attrs: ['time', 'tx_retries', 'signal']
                })
            );
        });
        it('should crash if controller version it too low', async () => {
            controller.version = '5.7.0';
            expect.assertions(3);
            try {
                await stats.getUsersStats(undefined, EStatsPeriod.FIVE_MINUTES);
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('need minimal controller version 5.8.0');
                expect(instance.post).not.toBeCalled();
            }
        });
    });
    describe('getGatewayStats', () => {
        it('should test defaults parameters', async () => {
            await stats.getGatewayStats();
            expect(instance.post).toBeCalledWith('/stat/report/daily.gw', {
                attrs: ['time', 'mem', 'cpu', 'loadavg_5'],
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test with different period', async () => {
            await stats.getGatewayStats(EStatsPeriod.FIVE_MINUTES);
            await stats.getGatewayStats(EStatsPeriod.HOURLY);
            await stats.getGatewayStats(EStatsPeriod.DAILY);
            await stats.getGatewayStats(EStatsPeriod.MONTHLY);

            expect(instance.post).toHaveBeenNthCalledWith(1, '/stat/report/5minutes.gw', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(2, '/stat/report/hourly.gw', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(3, '/stat/report/daily.gw', expect.any(Object));
            expect(instance.post).toHaveBeenNthCalledWith(4, '/stat/report/monthly.gw', expect.any(Object));
        });
        it('should test with specific start date', async () => {
            const date = globalDate;
            await stats.getGatewayStats(undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    start: date
                })
            );
        });
        it('should test with specific end date', async () => {
            const date = globalDate;
            await stats.getGatewayStats(undefined, undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    end: date
                })
            );
        });
        it('should test with custom attribs', async () => {
            await stats.getGatewayStats(undefined, undefined, undefined, [
                'mem',
                'cpu',
                'loadavg_5',
                'lan-rx_errors',
                'lan-tx_errors',
                'lan-rx_bytes',
                'lan-tx_bytes',
                'lan-rx_packets',
                'lan-tx_packets',
                'lan-rx_dropped',
                'lan-tx_dropped',
                'time'
            ]);

            expect(instance.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    attrs: [
                        'mem',
                        'cpu',
                        'loadavg_5',
                        'lan-rx_errors',
                        'lan-tx_errors',
                        'lan-rx_bytes',
                        'lan-tx_bytes',
                        'lan-rx_packets',
                        'lan-tx_packets',
                        'lan-rx_dropped',
                        'lan-tx_dropped',
                        'time'
                    ]
                })
            );
        });
        it('should crash if controller version it too low', async () => {
            controller.version = '5.4.0';
            expect.assertions(3);
            try {
                await stats.getGatewayStats(EStatsPeriod.FIVE_MINUTES);
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('need minimal controller version 5.5.0');
                expect(instance.post).not.toBeCalled();
            }
        });
    });
    describe('getIPSEvents', () => {
        it('should test defaults parameters', async () => {
            await stats.getIPSEvents();
            expect(instance.post).toBeCalledWith('/stat/ips/event', {
                _limit: 10000,
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test with specific start date', async () => {
            const date = globalDate;
            await stats.getIPSEvents(date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    start: date
                })
            );
        });
        it('should test with specific end date', async () => {
            const date = globalDate;
            await stats.getIPSEvents(undefined, date);

            expect(instance.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    end: date
                })
            );
        });
        it('should test with a limit', async () => {
            await stats.getIPSEvents(undefined, undefined, 10);

            expect(instance.post).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    _limit: 10
                })
            );
        });
        it('should crash if controller version it too low', async () => {
            controller.version = '5.8.0';
            expect.assertions(3);
            try {
                await stats.getIPSEvents();
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('need minimal controller version 5.9.0');
                expect(instance.post).not.toBeCalled();
            }
        });
    });
    describe('getSession', () => {
        it('should test defaults parameters', async () => {
            await stats.getSession();
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test start parameter', async () => {
            await stats.getSession({
                start: globalDate
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: expect.any(Number),
                start: globalDate
            });
        });
        it('should test end parameter', async () => {
            await stats.getSession({
                end: globalDate
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: globalDate,
                start: expect.any(Number)
            });
        });
        it('should test type parameter', async () => {
            await stats.getSession({
                type: 'guest'
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'guest',
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test mac parameter', async () => {
            await stats.getSession({
                mac: macAddress
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: expect.any(Number),
                start: expect.any(Number),
                mac: macAddress,
                _limit: 5,
                _sort: '-assoc_time'
            });
        });
        it('should test mac parameter with uppercase', async () => {
            await stats.getSession({
                mac: macAddress.toUpperCase()
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: expect.any(Number),
                start: expect.any(Number),
                mac: macAddress,
                _limit: 5,
                _sort: '-assoc_time'
            });
        });
        it('should test mac and limit parameters', async () => {
            await stats.getSession({
                mac: macAddress,
                _limit: 10
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: expect.any(Number),
                start: expect.any(Number),
                mac: macAddress,
                _limit: 10,
                _sort: '-assoc_time'
            });
        });
        it('should test mac and sort parameters', async () => {
            await stats.getSession({
                mac: macAddress,
                _sort: 'test'
            });
            expect(instance.post).toBeCalledWith('/stat/session', {
                type: 'all',
                end: expect.any(Number),
                start: expect.any(Number),
                mac: macAddress,
                _limit: 5,
                _sort: 'test'
            });
        });
    });
    describe('getAuths', () => {
        it('should test defaults parameters', async () => {
            await stats.getAuths();
            expect(instance.post).toBeCalledWith('/stat/session', {
                end: expect.any(Number),
                start: expect.any(Number)
            });
        });
        it('should test start parameter', async () => {
            await stats.getAuths(globalDate);
            expect(instance.post).toBeCalledWith('/stat/session', {
                end: expect.any(Number),
                start: globalDate
            });
        });
        it('should test end parameter', async () => {
            await stats.getAuths(undefined, globalDate);
            expect(instance.post).toBeCalledWith('/stat/session', {
                end: globalDate,
                start: expect.any(Number)
            });
        });
    });
    describe('getAllUsers', () => {
        it('should test defaults parameters', async () => {
            await stats.getAllUsers();
            expect(instance.post).toBeCalledWith('/stat/alluser', {
                type: 'all',
                conn: 'all',
                within: 8760
            });
        });
        it('should test type parameter', async () => {
            await stats.getAllUsers('test');
            expect(instance.post).toBeCalledWith('/stat/alluser', {
                type: 'test',
                conn: 'all',
                within: 8760
            });
        });
        it('should test conn parameter', async () => {
            await stats.getAllUsers(undefined, 'test');
            expect(instance.post).toBeCalledWith('/stat/alluser', {
                type: 'all',
                conn: 'test',
                within: 8760
            });
        });
        it('should test within parameter', async () => {
            await stats.getAllUsers(undefined, undefined, 9000000);
            expect(instance.post).toBeCalledWith('/stat/alluser', {
                type: 'all',
                conn: 'all',
                within: 9000000
            });
        });
    });
    describe('getHoursRange', () => {
        it('test with defaults parameters', async () => {
            // @ts-ignore
            const range = stats.getHoursRange();
            expect(range.start).toBeInstanceOf(Date);
            expect(range.end).toBeInstanceOf(Date);
            expect(isNaN(range.start.getTime())).toBeFalsy();
            expect(isNaN(range.end.getTime())).toBeFalsy();
            expect(range.end.getTime() > range.start.getTime()).toBeTruthy();

            expect(range.end.getTime() - 12 * 60 * 60 * 1000).toBe(range.start.getTime());
        });

        it('test with start parameter', async () => {
            // @ts-ignore
            const range = stats.getHoursRange(globalDate);
            expect(range.start).toBeInstanceOf(Date);
            expect(range.end).toBeInstanceOf(Date);
            expect(range.start).toStrictEqual(new Date(globalDate));
            expect(isNaN(range.start.getTime())).toBeFalsy();
            expect(isNaN(range.end.getTime())).toBeFalsy();
            expect(range.end.getTime() > range.start.getTime()).toBeTruthy();
        });

        it('test with end parameter', async () => {
            // @ts-ignore
            const range = stats.getHoursRange(undefined, globalDate);
            expect(range.start).toBeInstanceOf(Date);
            expect(range.end).toBeInstanceOf(Date);
            expect(range.end).toStrictEqual(new Date(globalDate));
            expect(isNaN(range.start.getTime())).toBeFalsy();
            expect(isNaN(range.end.getTime())).toBeFalsy();
            expect(range.end.getTime() > range.start.getTime()).toBeTruthy();
        });
        it('test with hours parameter', async () => {
            const hours = 8;
            // @ts-ignore
            const range = stats.getHoursRange(undefined, undefined, hours);
            expect(range.start).toBeInstanceOf(Date);
            expect(range.end).toBeInstanceOf(Date);
            expect(isNaN(range.start.getTime())).toBeFalsy();
            expect(isNaN(range.end.getTime())).toBeFalsy();
            expect(range.end.getTime() > range.start.getTime()).toBeTruthy();

            expect(range.end.getTime() - hours * 60 * 60 * 1000).toBe(range.start.getTime());
        });
        it('test with end before start', async () => {
            expect.assertions(2);
            try {
                // @ts-ignore
                stats.getHoursRange(globalDate, 10);
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe("end date can't be before start date");
            }
        });
    });
    describe('getDefaultHourRange', () => {
        it('test with no/invalid parameter', async () => {
            // @ts-ignore
            const hours = stats.getDefaultHourRange();
            expect(hours).toBe(24);
        });

        it('test with FIVE_MINUTES parameter', async () => {
            // @ts-ignore
            const hours = stats.getDefaultHourRange(EStatsPeriod.FIVE_MINUTES);
            expect(hours).toBe(12);
        });

        it('test with HOURLY parameter', async () => {
            // @ts-ignore
            const hours = stats.getDefaultHourRange(EStatsPeriod.HOURLY);
            expect(hours).toBe(7 * 24);
        });

        it('test with DAILY parameter', async () => {
            // @ts-ignore
            const hours = stats.getDefaultHourRange(EStatsPeriod.DAILY);
            expect(hours).toBe(52 * 7 * 24);
        });

        it('test with MONTHLY parameter', async () => {
            // @ts-ignore
            const hours = stats.getDefaultHourRange(EStatsPeriod.MONTHLY);
            expect(hours).toBe(52 * 7 * 24);
        });
    });
});
