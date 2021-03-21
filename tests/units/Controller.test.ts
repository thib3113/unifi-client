import { getLoggedSite, getLoggedControllerWithoutSite, getAuthentication, setUp, UNIFI_USERNAME } from '../common';
import nock from 'nock';
import semver from 'semver';
import Controller from '../../src';

describe('start controller - UnifiOs', () => {
    it('should login to controller', async () => {
        const controller = await getLoggedControllerWithoutSite(nock);
        expect(controller.version).toBe('6.1.67');
        expect(controller.unifiOs).toBeTruthy();
        expect(controller).toBeDefined();
    });

    it('should list sites', async () => {
        const controller = await getLoggedControllerWithoutSite(nock);
        await nock.back('list-sites.json').then(async ({ nockDone }) => {
            const [site] = await controller.getSites();

            expect(site.name).toBeDefined();
            expect(site._id).toBeDefined();
            expect(site.anonymous_id).toBeDefined();
            expect(site.attr_hidden_id).toBeDefined();
            expect(site.attr_no_delete).toBeDefined();
            expect(site.desc).toBeDefined();
            expect(site.role).toBeDefined();
            expect(site.role_hotspot).toBeDefined();

            expect(site._id).toBe('6001f8a73fd98c05e9465f91');
            expect(site.anonymous_id).toBe('a3222f4c-3f6f-49f1-a747-ec1afe0fc773');
            expect(site.name).toBe('default');
            expect(site.desc).toBe('Default');
            expect(site.attr_hidden_id).toBe('default');
            expect(site.attr_no_delete).toBe(true);
            expect(site.role).toBe('admin');
            expect(site.role_hotspot).toBe(false);
            nockDone();
        });
    });

    it('should select site', async () => {
        const controller = await getLoggedSite(nock);
        expect(controller).toBeDefined();
    });

    it('shoud fail to login with incorrect password', async () => {
        setUp(nock);
        const auth = getAuthentication();

        await nock.back('login-fail.json').then(async ({ nockDone }) => {
            const c = new Controller({
                url: auth.url,
                password: 'aaaaaa',
                username: UNIFI_USERNAME,
                strictSSL: auth.strictSSL
            });
            try {
                await c.login();
            } catch (e) {
                expect(e.name).toBe('UnifiError');
                expect(e.code).toBe(401);
            }

            nockDone();
        });
    });
});

describe('start controller - non UnifiOs', () => {
    it('should login to controller', async () => {
        const controller = await getLoggedControllerWithoutSite(nock, false);

        expect(semver.gt(controller.version, '6.0.0') && semver.lt(controller.version, '7.0.0')).toBeTruthy();
        expect(controller.unifiOs).toBeFalsy();
        expect(controller).toBeDefined();
    });

    it('should list sites', async () => {
        const controller = await getLoggedControllerWithoutSite(nock, false);
        const [site] = await controller.getSites();

        expect(site.name).toBeDefined();
        expect(site._id).toBeDefined();
        expect(site.anonymous_id).toBeDefined();
        expect(site.attr_hidden_id).toBeDefined();
        expect(site.attr_no_delete).toBeDefined();
        expect(site.desc).toBeDefined();
        expect(site.role).toBeDefined();

        expect(() => site.role_hotspot).toThrowError();
    });

    it('should select site', async () => {
        const controller = await getLoggedSite(nock, false);
        expect(controller).toBeDefined();
    });
});
