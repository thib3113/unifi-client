import { deleteFixtures, getLoggedSite, isRecordMode } from '../common';
import nock from 'nock';
import { Site } from '../../src/Sites/Site';

const PREFIX = 'sites-';
beforeAll(async () => {
    if (isRecordMode()) {
        deleteFixtures(PREFIX);
    }
});
describe('Sites.test.ts', () => {
    describe('Sites - UnifiOs', () => {
        let site: Site;
        beforeEach(async () => {
            site = await getLoggedSite(nock);
        });
        it('return networkStatus', async () => {
            const site = await getLoggedSite(nock);

            await nock.back(`${PREFIX}network-status.json`).then(async ({ nockDone }) => {
                const status = await site.getNetworkStatus();

                expect(typeof status.average_satisfaction).toBe('number');
                expect(status.average_satisfaction).toBeLessThanOrEqual(100);
                expect(status.average_satisfaction).toBeGreaterThanOrEqual(0);

                expect(typeof status.health).toBe('string');

                expect(Array.isArray(status.historical_satisfaction)).toBeTruthy();
                expect(status.historical_satisfaction.length).toBe(12);

                expect(Array.isArray(status.reasons)).toBeTruthy();

                nockDone();
            });
        });
    });
});
