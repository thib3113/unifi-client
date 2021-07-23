import { deleteFixtures, getLoggedSite, isRecordMode } from '../common';
import nock from 'nock';
import { Site } from '../../src/Sites/Site';
import { Validate } from '../../src/commons/Validate';

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
        // it('should authorize guest', async () => {
        //     //test without force parameter
        //     try {
        //         await site.hotspots.authorizeGuest({
        //             mac: '00:1B:44:11:3A:B7',
        //             bytes: 200,
        //             minutes: 20,
        //             up: 21,
        //             down: 22,
        //             ap_mac: '00:1B:44:11:3A:B8'
        //         });
        //         expect(false).toBeTruthy();
        //     } catch (e) {
        //         console.log(e);
        //         expect(e.code).toBe(EErrorsCodes.NEED_TO_FORCE);
        //     }
        //
        //     // await nock.back(`${PREFIX}authorize-guest.json`).then(async ({ nockDone }) => {
        //     nock(site.getController().controllerInstance.defaults.baseURL)
        //         .post(`/proxy/network/api/s/${site.name}/cmd/stamgr`, {
        //             cmd: 'authorize-guest',
        //             mac: '00:1b:44:11:3a:b7',
        //             minutes: 20,
        //             up: 21,
        //             down: 22,
        //             bytes: 200,
        //             ap_mac: '00:1b:44:11:3a:b8'
        //         })
        //         .reply(
        //             500,
        //             '<!doctype html><html lang="en"><head><title>HTTP Status 500 – Internal Server Error</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 500 – Internal Server Error</h1></body></html>'
        //         );
        //     try {
        //         await site.hotspots.authorizeGuest(
        //             {
        //                 mac: '00:1B:44:11:3A:B7',
        //                 bytes: 200,
        //                 minutes: 20,
        //                 up: 21,
        //                 down: 22,
        //                 ap_mac: '00:1B:44:11:3A:B8'
        //             },
        //             true
        //         );
        //         expect(false).toBeTruthy();
        //     } catch (e) {
        //         console.log(e);
        //         expect(e.code).toBe(EErrorsCodes.INTERNAL_SERVER_ERROR);
        //     }
        // });

        it('should unAuthorize guest', async () => {
            nock(site.getController().controllerInstance.defaults.baseURL)
                .post(`/proxy/network/api/s/${site.name}/cmd/stamgr`, {
                    cmd: 'unauthorize-guest',
                    mac: '00:1b:44:11:3a:b7'
                })
                .reply(500, {
                    meta: {
                        rc: 'ok'
                    },
                    data: []
                });
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
