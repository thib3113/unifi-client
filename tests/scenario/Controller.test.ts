import { getLoggedSite, getLoggedControllerWithoutSite, getAuthentication } from './_scripts/common';
import semver from 'semver';
import Controller, { ClientError, EErrorsCodes, Site, UnifiError } from '../../src';
import jwt from 'jsonwebtoken';
import { Validate } from '../../src/commons/Validate';
import { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { recorder } from './_scripts/Recorder';

const controllerExpectedVersion = '7.5.165';

//TODO generating mock only
// beforeEach(() => {
//     recorder.startGeneratingMockTestMode();
// });
//
// afterEach(() => {
//     recorder.stopGeneratingMockTestMode();
// });

describe('Controller', () => {
    describe('start controller - UnifiOs', () => {
        const recorderIsUnifiOs = true;
        it('should list sites', async () => {
            const controller = await getLoggedControllerWithoutSite();
            await recorder.record(
                'list-sites',
                async () => {
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
                },
                recorderIsUnifiOs
            );
        });

        it('should select site', async () => {
            const site = await getLoggedSite();
            expect(site).toBeDefined();
        });

        describe('login with local account', () => {
            it('should login to controller', async () => {
                const controller = await getLoggedControllerWithoutSite();
                expect(controller).toBeDefined();
                expect(controller.version).toBe(controllerExpectedVersion);
                expect(controller.unifiOs).toBeTruthy();
                expect(controller.auth.autoReLogin).toBeTruthy();
            });

            // it('should fail to login with incorrect password', async () => {
            //     const auth = getAuthentication();
            //
            //     await nock.back('login-local-fail.json').then(async ({ nockDone }) => {
            //         const c = new Controller({
            //             url: auth.url,
            //             password: 'aaaaaa',
            //             username: UNIFI_USERNAME,
            //             strictSSL: auth.strictSSL
            //         });
            //         try {
            //             await c.login();
            //         } catch (e) {
            //             expect(e.name).toBe('UnifiError');
            //             expect(e.code).toBe(401);
            //         }
            //
            //         nockDone();
            //     });
            // });

            it('should autorenew token', async () => {
                const controller = await getLoggedControllerWithoutSite();
                // @ts-ignore
                let globToken = controller.auth.token;

                const decodedToken = jwt.decode(globToken);
                // set expired token
                decodedToken.exp = 1117584000;

                const expiredToken = jwt.sign(decodedToken, crypto.randomUUID());
                // @ts-ignore
                controller.auth.token = expiredToken;

                await recorder.record('renew-local-login', () => controller.getSites(), recorderIsUnifiOs);

                // @ts-ignore
                let newToken = controller.auth.token;

                expect(newToken).not.toBe(expiredToken);
            });

            it('should logout, and disable auto-renew token', async () => {
                const controller = await getLoggedControllerWithoutSite();

                // @ts-ignore
                expect(controller.logged).toBeTruthy();

                await recorder.record(
                    'local-logout',
                    async () => {
                        await controller.logout();

                        expect(controller.auth.autoReLogin).toBeFalsy();
                        // @ts-ignore
                        expect(controller.logged).toBeFalsy();

                        // expect.assertions(5);
                        try {
                            await controller.getSites();
                            expect('need to return NEED_LOGIN').toBeFalsy();
                        } catch (e) {
                            expect(e).toBeInstanceOf(ClientError);
                            expect(e.code).toBe(EErrorsCodes.NEED_LOGIN);
                        }

                        //force logged = true, and token empty to force "re-login"
                        // @ts-ignore
                        controller.logged = true;
                        // @ts-ignore
                        controller.auth.token = '';
                        expect(controller.auth.autoReLogin).toBeFalsy();

                        try {
                            await controller.getSites();
                            expect('need to return UNAUTHORIZED').toBeFalsy();
                        } catch (e) {
                            expect(e).toBeInstanceOf(UnifiError);
                            expect(e.code).toBe(EErrorsCodes.UNAUTHORIZED);
                        }
                    },
                    recorderIsUnifiOs
                );
            });
        });

        describe('login with ubiquiti 2FA account', () => {
            it('should login to controller', async () => {
                await recorder.record(
                    'login-2FA',
                    async () => {
                        const controller = new Controller(getAuthentication(true));

                        await controller.login('123456');

                        expect(controller.version).toBe(controllerExpectedVersion);
                        expect(controller.unifiOs).toBeTruthy();
                        expect(controller).toBeDefined();
                        expect(controller.auth.autoReLogin).toBeFalsy();
                    },
                    recorderIsUnifiOs
                );
            });

            it('should not autorenew token', async () => {
                await recorder.record(
                    'login-2FA-no-autorenew',
                    async () => {
                        const controller = new Controller(getAuthentication(true));

                        await controller.login('123456');
                        // @ts-ignore
                        let globToken = controller.auth.token;

                        const decodedToken = jwt.decode(globToken);
                        // set expired token
                        decodedToken.exp = 1117584000;
                        // @ts-ignore
                        controller.auth.token = jwt.sign(decodedToken, crypto.randomUUID());

                        //need to throw UNAUTHORIZED because no auto renew
                        expect.assertions(1);
                        try {
                            await controller.getSites();
                        } catch (e) {
                            expect(e.code).toBe(EErrorsCodes.UNAUTHORIZED);
                        }
                    },
                    recorderIsUnifiOs
                );
            });
        });
    });

    describe('start controller - non UnifiOs', () => {
        it('should login to controller', async () => {
            const controller = await getLoggedControllerWithoutSite(false);

            expect(controller.version).toBeDefined();
            expect(semver.gt(controller.version || '', '6.0.0') && semver.lt(controller.version || '', '7.5.0')).toBeTruthy();
            expect(controller.unifiOs).toBeFalsy();
            expect(controller).toBeDefined();
        });

        it('should list sites', async () => {
            const controller = await getLoggedControllerWithoutSite(false);
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
            const site = await getLoggedSite(false);
            expect(site).toBeDefined();
        });

        it('should autorenew token', async () => {
            const controller = await getLoggedControllerWithoutSite(false);
            // @ts-ignore
            let globToken = controller.auth.token;

            //on unifi controller, token seems to be a random string
            // const token = jwt.sign(decodedToken, uuidv4());
            const expiredToken = 'H1UkvPRF1sZPWvtvibeH8uHTaiZiqOh0';
            expect(expiredToken).not.toBe(globToken);
            // @ts-ignore
            controller.auth.token = expiredToken;

            await controller.getSites();

            // @ts-ignore
            let newToken = controller.auth.token;

            expect(newToken).not.toBe(expiredToken);
        });

        it('should logout, and disable auto-renew token', async () => {
            const controller = await getLoggedControllerWithoutSite(false);

            // @ts-ignore
            expect(controller.logged).toBeTruthy();

            await controller.logout();

            // @ts-ignore
            expect(controller.logged).toBeFalsy();
            expect(controller.auth.autoReLogin).toBeFalsy();

            expect.assertions(5);
            try {
                await controller.getSites();
            } catch (e) {
                expect(e.code).toBe(EErrorsCodes.NEED_LOGIN);
            }

            //force logged = true, and token empty to force "re-login"
            // @ts-ignore
            controller.logged = true;
            // @ts-ignore
            controller.auth.token = '';

            try {
                await controller.getSites();
            } catch (e) {
                expect(e.code).toBe(EErrorsCodes.UNAUTHORIZED);
            }
        });
    });

    describe('validate raw use', () => {
        let site: Site;
        let controller: Controller;
        const axiosInstanceKey: Array<keyof AxiosInstance> = [
            'defaults',
            'getUri',
            'request',
            'get',
            'delete',
            'head',
            'options',
            'post',
            'put',
            'patch',
            'interceptors'
        ];
        beforeEach(async () => {
            site = await getLoggedSite(false);
            controller = site.getController();
        });

        it('allow raw request to site', async () => {
            const instance = site.getInstance();
            expect(Validate.implementsTKeys<AxiosInstance>(instance, axiosInstanceKey)).toBeTruthy();
            //try a request
            const res = await instance.get('/stat/sysinfo');
            expect(res.status).toBe(200);
        });

        it('allow raw requests to controller', async () => {
            const instance = controller.getInstance();
            expect(Validate.implementsTKeys<AxiosInstance>(instance, axiosInstanceKey)).toBeTruthy();
            //try a request
            const res = await instance.get('/api/self');
            expect(res.status).toBe(200);
        });
    });
});
