import { generateMac, getLoggedSite } from './_scripts/common';
import nock from 'nock';
import moxios from 'moxios';
import { Client, Site } from '../../src';
import { AxiosInstance } from 'axios';

describe('Clients', () => {
    describe('UnifiOs', () => {
        const mac = '00:15:6D:25:4d:d1';
        let site: Site;
        beforeEach(async () => {
            site = await getLoggedSite(nock);
            // @ts-ignore => error because AxiosInstance from axios-error is not up to date
            moxios.install(site.getInstance());
        });
        afterEach(() => {
            // @ts-ignore => error because AxiosInstance from axios-error is not up to date
            moxios.uninstall(site.getInstance());
        });

        it('should list devices', async () => {
            let res: Array<Client>;
            site.clients.list().then((r) => {
                res = r;
            });

            const devices = await new Promise<Array<Client>>((resolve) => {
                moxios.wait(async () => {
                    let request = moxios.requests.mostRecent();

                    await request.respondWith({
                        status: 200,
                        response: {
                            meta: {
                                rc: 'ok'
                            },
                            data: [
                                {
                                    _id: '6059229dc3d8180463a57109',
                                    mac: '00:1e:58:a5:f1:ee',
                                    use_fixedip: true,
                                    fixed_ip: '192.168.1.3',
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'D-Link',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57108',
                                    mac: 'a0:9b:bd:4e:d0:70',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'TotalAvi',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57106',
                                    mac: '00:1b:00:d9:61:a2',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'NeopostT',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57105',
                                    mac: '00:22:84:7e:1b:71',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'DesayA&V',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57104',
                                    mac: '70:4a:0e:03:b0:94',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: '',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57103',
                                    mac: 'd0:15:a6:16:06:ee',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'ArubaAHe',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57102',
                                    mac: '7c:dd:e9:4e:a4:30',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: '',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57101',
                                    mac: '00:26:61:65:49:e7',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'Irumtek',
                                    noted: false
                                }
                            ]
                        }
                    });
                    resolve(res);
                });
            });

            const clientTest1 = devices.find((c) => c.mac === '00:1e:58:a5:f1:ee');
            const clientTest2 = devices.find((c) => c.mac === 'a0:9b:bd:4e:d0:70');

            expect(clientTest1).toBeDefined();
            expect(clientTest1?._id).toBe('6059229dc3d8180463a57109');
            expect(clientTest1?.mac).toBe('00:1e:58:a5:f1:ee');
            expect(clientTest1?.useFixedIp).toBe(true);
            expect(clientTest1?.fixedIp).toBe('192.168.1.3');
            expect(clientTest1?.siteId).toBe('6001f8a73fd98c05e9465f91');
            expect(clientTest1?.isWired).toBe(true);
            expect(clientTest1?.isGuest).toBe(false);
            expect(clientTest1?.oui).toBe('D-Link');
            expect(clientTest1?.noted).toBe(false);

            expect(clientTest2).toBeDefined();
            expect(clientTest2?._id).toBe('6059229dc3d8180463a57108');
            expect(clientTest2?.mac).toBe('a0:9b:bd:4e:d0:70');
            expect(clientTest2?.useFixedIp).toBe(false);
            expect(clientTest2?.siteId).toBe('6001f8a73fd98c05e9465f91');
            expect(clientTest2?.isWired).toBe(true);
            expect(clientTest2?.isGuest).toBe(false);
            expect(clientTest2?.oui).toBe('TotalAvi');
            expect(clientTest2?.noted).toBe(false);
        });

        it('should test alternative list', async () => {
            let res: Array<Client>;
            site.clients.list2().then((r) => {
                res = r;
            });

            const devices = await new Promise<Array<Client>>((resolve) => {
                moxios.wait(async () => {
                    let request = moxios.requests.mostRecent();

                    await request.respondWith({
                        status: 200,
                        response: {
                            meta: {
                                rc: 'ok'
                            },
                            data: [
                                {
                                    _id: '6059229dc3d8180463a57109',
                                    mac: '00:1e:58:a5:f1:ee',
                                    use_fixedip: true,
                                    fixed_ip: '192.168.1.3',
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'D-Link',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57108',
                                    mac: 'a0:9b:bd:4e:d0:70',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'TotalAvi',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57106',
                                    mac: '00:1b:00:d9:61:a2',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'NeopostT',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57105',
                                    mac: '00:22:84:7e:1b:71',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'DesayA&V',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57104',
                                    mac: '70:4a:0e:03:b0:94',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: '',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57103',
                                    mac: 'd0:15:a6:16:06:ee',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'ArubaAHe',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57102',
                                    mac: '7c:dd:e9:4e:a4:30',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: '',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57101',
                                    mac: '00:26:61:65:49:e7',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'Irumtek',
                                    noted: false
                                }
                            ]
                        }
                    });
                    resolve(res);
                });
            });

            const clientTest1 = devices.find((c) => c.mac === '00:1e:58:a5:f1:ee');
            const clientTest2 = devices.find((c) => c.mac === 'a0:9b:bd:4e:d0:70');

            expect(clientTest1).toBeDefined();
            expect(clientTest1?._id).toBe('6059229dc3d8180463a57109');
            expect(clientTest1?.mac).toBe('00:1e:58:a5:f1:ee');
            expect(clientTest1?.useFixedIp).toBe(true);
            expect(clientTest1?.fixedIp).toBe('192.168.1.3');
            expect(clientTest1?.siteId).toBe('6001f8a73fd98c05e9465f91');
            expect(clientTest1?.isWired).toBe(true);
            expect(clientTest1?.isGuest).toBe(false);
            expect(clientTest1?.oui).toBe('D-Link');
            expect(clientTest1?.noted).toBe(false);

            expect(clientTest2).toBeDefined();
            expect(clientTest2?._id).toBe('6059229dc3d8180463a57108');
            expect(clientTest2?.mac).toBe('a0:9b:bd:4e:d0:70');
            expect(clientTest2?.useFixedIp).toBe(false);
            expect(clientTest2?.siteId).toBe('6001f8a73fd98c05e9465f91');
            expect(clientTest2?.isWired).toBe(true);
            expect(clientTest2?.isGuest).toBe(false);
            expect(clientTest2?.oui).toBe('TotalAvi');
            expect(clientTest2?.noted).toBe(false);
        });

        it('should create client', async () => {
            let res: Client;
            site.clients
                .create({
                    mac,
                    fixed_ip: '192.168.1.5'
                })
                .then((r: Client) => (res = r));
            const resCreate = await new Promise<Client>((resolve) => {
                moxios.wait(async () => {
                    let request = moxios.requests.mostRecent();

                    await request.respondWith({
                        status: 200,
                        response: {
                            meta: {
                                rc: 'ok'
                            },
                            data: [
                                {
                                    mac: '00:15:6d:25:4d:d1',
                                    fixed_ip: '192.168.1.5',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'Ubiquiti',
                                    noted: false,
                                    _id: '605935b8c3d8180463a5760e'
                                }
                            ]
                        }
                    });
                    resolve(res);
                });
            });
            expect(resCreate).toBeDefined();

            expect(resCreate._id).toBe('605935b8c3d8180463a5760e');
            expect(resCreate.isGuest).toBe(false);
            expect(resCreate.isWired).toBe(true);
            expect(resCreate.mac).toBe('00:15:6d:25:4d:d1');
            expect(resCreate.noted).toBe(false);
            expect(resCreate.oui).toBe('Ubiquiti');
            expect(resCreate.siteId).toBe('6001f8a73fd98c05e9465f91');
            expect(resCreate.useFixedIp).toBe(false);
            expect(resCreate.fixedIp).toBe('192.168.1.5');
        });

        it('should forget a client', async () => {
            let resForgetList: Array<Client>;
            site.clients.list().then((r) => {
                resForgetList = r;
            });

            const forgetList = await new Promise<Array<Client>>((resolve) => {
                moxios.wait(async () => {
                    let request = moxios.requests.mostRecent();

                    await request.respondWith({
                        status: 200,
                        response: {
                            meta: {
                                rc: 'ok'
                            },
                            data: [
                                {
                                    mac: '00:15:6d:25:4d:d1',
                                    fixed_ip: '192.168.1.5',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'Ubiquiti',
                                    noted: false,
                                    _id: '605935b8c3d8180463a5760e'
                                },
                                {
                                    _id: '6059229dc3d8180463a57109',
                                    mac: '00:1e:58:a5:f1:ee',
                                    use_fixedip: true,
                                    fixed_ip: '192.168.1.3',
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'D-Link',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57108',
                                    mac: 'a0:9b:bd:4e:d0:70',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'TotalAvi',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57106',
                                    mac: '00:1b:00:d9:61:a2',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'NeopostT',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57105',
                                    mac: '00:22:84:7e:1b:71',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'DesayA&V',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57104',
                                    mac: '70:4a:0e:03:b0:94',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: '',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57103',
                                    mac: 'd0:15:a6:16:06:ee',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'ArubaAHe',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57102',
                                    mac: '7c:dd:e9:4e:a4:30',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: '',
                                    noted: false
                                },
                                {
                                    _id: '6059229dc3d8180463a57101',
                                    mac: '00:26:61:65:49:e7',
                                    use_fixedip: false,
                                    site_id: '6001f8a73fd98c05e9465f91',
                                    is_wired: true,
                                    is_guest: false,
                                    oui: 'Irumtek',
                                    noted: false
                                }
                            ]
                        }
                    });
                    resolve(resForgetList);
                });
            });

            let resForget: boolean = false;
            let newLyCreated = forgetList.find((c) => c.mac === mac.toLowerCase()) as Client;

            expect(newLyCreated).toBeDefined();

            newLyCreated.forget().then((r) => {
                resForget = r;
            });

            await new Promise<void>((resolve) => {
                moxios.wait(async () => {
                    let request = moxios.requests.mostRecent();

                    await request.respondWith({
                        status: 200,
                        response: {
                            meta: {
                                rc: 'ok'
                            },
                            data: {
                                _id: '60593c42c3d8180463a57747',
                                mac: '00:15:6d:25:4d:d1',
                                fixed_ip: '192.168.1.5',
                                use_fixedip: false,
                                site_id: '6001f8a73fd98c05e9465f91',
                                is_wired: true,
                                is_guest: false,
                                oui: 'Ubiquiti',
                                noted: false
                            }
                        }
                    });
                    resolve();
                });
            });

            expect(resForget).toBeTruthy();
        });
    });

    describe('non UnifiOs', () => {
        let site: Site;
        const mac = generateMac().toLowerCase();
        beforeEach(async () => {
            site = await getLoggedSite(nock, false);
        });

        it('should crud clients', async () => {
            const resCreate = (await site.clients.create({
                mac
                //need a security gateway to set static ip
            })) as Client;

            expect(resCreate).toBeDefined();

            expect(resCreate.isGuest).toBe(false);
            expect(resCreate.isWired).toBe(true);
            expect(resCreate.mac).toBe(mac);
            expect(resCreate.noted).toBe(false);

            //check list method
            const devices = await site.clients.list();
            const clientTest1 = devices.find((c) => c.mac === mac.toLowerCase());

            expect(clientTest1).toBeDefined();
            expect(clientTest1?.mac).toBe(mac);
            expect(clientTest1?.isWired).toBe(true);
            expect(clientTest1?.isGuest).toBe(false);

            //check alternative list method
            const devices2 = await site.clients.list2();
            const clientTest2 = devices2.find((c) => c.mac === mac.toLowerCase());

            expect(clientTest2).toBeDefined();
            expect(clientTest2?.mac).toBe(mac);
            expect(clientTest2?.isWired).toBe(true);
            expect(clientTest2?.isGuest).toBe(false);

            //forget
            expect(await clientTest1?.forget()).toBeTruthy();

            const devicesAfterForget = await site.clients.list();
            const devicesAfterForgetFound = devicesAfterForget.find((c) => c.mac === mac.toLowerCase());

            expect(devicesAfterForgetFound).not.toBeDefined();
        });
    });
});
