import { Site } from '../../src';
import { getLoggedSite } from './_scripts/common';
import nock from 'nock';
import { ClientsGroup } from '../../src/Clients/ClientsGroup';
import { groupRaw } from '../mocks/clients';
import { ClientsGroups } from '../../src/Clients/ClientsGroups';

const PREFIX = 'clients-groups-';
// beforeAll(() => {
//     if (isRecordMode()) {
//         deleteFixtures(PREFIX);
//     }
// });

describe('ClientsGroups', () => {
    describe('unifiOs', () => {
        let site: Site;
        let groups: ClientsGroups;
        beforeEach(async () => {
            site = await getLoggedSite(nock);
            groups = new ClientsGroups({ controller: site.getController(), site });
        });
        it('should crud a client groups', async () => {
            let group: ClientsGroup;
            //try to create
            await nock.back(`${PREFIX}create.json`).then(async ({ nockDone }) => {
                const tmpGrp = await groups.create({ ...groupRaw });
                if (tmpGrp) {
                    group = tmpGrp;
                } else {
                    expect(tmpGrp).toBeDefined();
                }
                nockDone();
            });

            await nock.back(`${PREFIX}list.json`).then(async ({ nockDone }) => {
                const tmpGrp = (await groups.list()).find((g) => g._id === group._id);
                expect(tmpGrp).toStrictEqual(group);
                nockDone();
            });

            await nock.back(`${PREFIX}update.json`).then(async ({ nockDone }) => {
                group.maxUploadBandwidth = 1000;
                await group.save();
                expect(group.toJSON()).toStrictEqual({
                    _id: expect.any(String),
                    maxDownloadBandwidth: -1,
                    maxUploadBandwidth: 1000,
                    name: 'test',
                    siteId: site._id
                });
                nockDone();
            });

            await nock.back(`${PREFIX}delete.json`).then(async ({ nockDone }) => {
                expect(await group.delete()).toBeTruthy();
                nockDone();
            });
        });
    });

    describe('non UnifiOs', () => {
        let site: Site;
        let groups: ClientsGroups;
        beforeEach(async () => {
            site = await getLoggedSite(nock, false);
            groups = new ClientsGroups({ controller: site.getController(), site });
        });

        it('should crud a client groups', async () => {
            let group: ClientsGroup;
            //try to create
            const tmpGrp = await groups.create({ ...groupRaw });

            expect(tmpGrp).toBeDefined();
            group = tmpGrp as ClientsGroup;

            const tmpGrp2 = (await groups.list()).find((g) => g._id === group._id);
            expect(tmpGrp2).toStrictEqual(group);

            group.maxUploadBandwidth = 1000;
            await group.save();
            expect(group.toJSON()).toStrictEqual({
                _id: expect.any(String),
                maxDownloadBandwidth: -1,
                maxUploadBandwidth: 1000,
                name: 'test',
                siteId: site._id
            });

            expect(await group.delete()).toBeTruthy();
        });
    });
});
