import { EStatsPeriod, Site } from '../../src';
import { getLoggedSite } from './_scripts/common';
import nock from 'nock';

const PREFIX = 'stats/';
// beforeAll(() => {
//     if (isRecordMode()) {
//         deleteFixtures(PREFIX);
//     }
// });
describe('Firewall - UnifiOs', () => {
    let site: Site;
    beforeEach(async () => {
        site = await getLoggedSite(nock);
    });
    describe('SiteStats', () => {
        it('return 5minutes stats', async () => {
            await nock.back(`${PREFIX}sites-stats-5min.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getSiteStats(EStatsPeriod.FIVE_MINUTES);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('site');
                nockDone();
            });
        });
        it('return hourly stats', async () => {
            await nock.back(`${PREFIX}sites-stats-hourly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getSiteStats(EStatsPeriod.HOURLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('site');
                nockDone();
            });
        });
        it('return daily stats', async () => {
            await nock.back(`${PREFIX}sites-stats-daily.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getSiteStats(EStatsPeriod.DAILY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('site');
                nockDone();
            });
        });
        it('return monthly stats', async () => {
            await nock.back(`${PREFIX}sites-stats-monthly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getSiteStats(EStatsPeriod.MONTHLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('site');
                nockDone();
            });
        });
    });
    describe('APStats', () => {
        it('return 5minutes stats', async () => {
            await nock.back(`${PREFIX}ap-stats-5min.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getAPsStats(undefined, EStatsPeriod.FIVE_MINUTES);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('ap');
                nockDone();
            });
        });
        it('return hourly stats', async () => {
            await nock.back(`${PREFIX}ap-stats-hourly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getAPsStats(undefined, EStatsPeriod.HOURLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('ap');
                nockDone();
            });
        });
        it('return daily stats', async () => {
            await nock.back(`${PREFIX}ap-stats-daily.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getAPsStats(undefined, EStatsPeriod.DAILY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('ap');
                nockDone();
            });
        });
        it('return monthly stats', async () => {
            await nock.back(`${PREFIX}ap-stats-monthly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getAPsStats(undefined, EStatsPeriod.MONTHLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('ap');
                nockDone();
            });
        });
    });
    describe('UsersStats', () => {
        it('return 5minutes stats', async () => {
            await nock.back(`${PREFIX}users-stats-5min.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getUsersStats(undefined, EStatsPeriod.FIVE_MINUTES);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('user');
                nockDone();
            });
        });
        it('return hourly stats', async () => {
            await nock.back(`${PREFIX}users-stats-hourly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getUsersStats(undefined, EStatsPeriod.HOURLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('user');
                nockDone();
            });
        });
        it('return daily stats', async () => {
            await nock.back(`${PREFIX}users-stats-daily.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getUsersStats(undefined, EStatsPeriod.DAILY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('user');
                nockDone();
            });
        });
        it('return monthly stats', async () => {
            await nock.back(`${PREFIX}users-stats-monthly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getUsersStats(undefined, EStatsPeriod.MONTHLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('user');
                nockDone();
            });
        });
    });
    describe('GatewayStats', () => {
        it('return 5minutes stats', async () => {
            await nock.back(`${PREFIX}gateway-stats-5min.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getGatewayStats(EStatsPeriod.FIVE_MINUTES);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('gw');
                nockDone();
            });
        });
        it('return hourly stats', async () => {
            await nock.back(`${PREFIX}gateway-stats-hourly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getGatewayStats(EStatsPeriod.HOURLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('gw');
                nockDone();
            });
        });
        it('return daily stats', async () => {
            await nock.back(`${PREFIX}gateway-stats-daily.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getGatewayStats(EStatsPeriod.DAILY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('gw');
                nockDone();
            });
        });
        it('return monthly stats', async () => {
            await nock.back(`${PREFIX}gateway-stats-monthly.json`).then(async ({ nockDone }) => {
                const stats = await site.stats.getGatewayStats(EStatsPeriod.MONTHLY);

                const testStat = stats.pop();
                expect(testStat?.o).toBe('gw');
                nockDone();
            });
        });
    });
});
describe('Firewall - non UnifiOs', () => {
    let site: Site;
    beforeEach(async () => {
        site = await getLoggedSite(nock, false);
    });
});
