import { deleteFixtures, getLoggedSite, isRecordMode } from '../common';
import Site from '../../src/Sites/Site';
import nock from 'nock';
import { EErrorsCodes } from '../../src';
import Validate from '../../src/commons/Validate';

const PREFIX = 'hotspots-';
beforeAll(() => {
    if (isRecordMode()) {
        deleteFixtures(PREFIX);
    }
});

describe('HotSpots - UnifiOs', () => {
    let site: Site;
    beforeEach(async () => {
        site = await getLoggedSite(nock);
    });
    describe('Guest', () => {
        it('should authorize guest', async () => {
            //test without force parameter
            try {
                await site.hotspots.authorizeGuest({
                    mac: '00:1B:44:11:3A:B7',
                    bytes: 200,
                    minutes: 20,
                    up: 21,
                    down: 22,
                    ap_mac: '00:1B:44:11:3A:B8'
                });
                expect(false).toBeTruthy();
            } catch (e) {
                expect(e.code).toBe(EErrorsCodes.NEED_TO_FORCE);
            }

            await nock.back(`${PREFIX}authorize-guest.json`).then(async ({ nockDone }) => {
                try {
                    await site.hotspots.authorizeGuest(
                        {
                            mac: '00:1B:44:11:3A:B7',
                            bytes: 200,
                            minutes: 20,
                            up: 21,
                            down: 22,
                            ap_mac: '00:1B:44:11:3A:B8'
                        },
                        true
                    );
                    expect(false).toBeTruthy();
                } catch (e) {
                    expect(e.code).toBe(EErrorsCodes.INTERNAL_SERVER_ERROR);
                }

                nockDone();
            });
        });

        it('should unAuthorize guest', async () => {
            await nock.back(`${PREFIX}unauthorize-guest.json`).then(async ({ nockDone }) => {
                await site.hotspots.unAuthorizeGuest('00:1B:44:11:3A:B7');

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
    describe('Guest', () => {
        it('should authorize guest', async () => {
            const authorization = await site.hotspots.authorizeGuest({
                mac: '00:1B:44:11:3A:B7',
                bytes: 200,
                minutes: 20,
                up: 21,
                down: 22,
                ap_mac: '00:1B:44:11:3A:B8'
            });

            expect(authorization._id).toBeDefined();
            expect(authorization.mac).toBeDefined();
            expect(authorization.start).toBeDefined();
            expect(authorization.site_id).toBeDefined();
            expect(authorization.authorized_by).toBeDefined();
            expect(authorization.end).toBeDefined();

            // expect(() => authorization.qos_usage_quota).toThrowError();

            expect(Validate.isString(authorization._id)).toBeTruthy();
            expect(Validate.isString(authorization.mac)).toBeTruthy();
            expect(Validate.isDate(authorization.start, true)).toBeTruthy();
            expect(Validate.isString(authorization.site_id)).toBeTruthy();
            expect(authorization.authorized_by).toBe('api');
            expect(Validate.isDate(authorization.end, true)).toBeTruthy();
            // expect(Validate.isNumber(authorization.qos_usage_quota)).toBeTruthy();
        });

        it('should unAuthorize guest', async () => {
            await site.hotspots.unAuthorizeGuest('00:1B:44:11:3A:B7');
            expect(true).toBeTruthy();
        });
    });
});
