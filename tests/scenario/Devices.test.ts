import { Devices, Site } from '../../src';
import { getLoggedSite } from './_scripts/common';
import nock from 'nock';

const PREFIX = 'devices/';
// beforeAll(() => {
//     if (isRecordMode()) {
//         deleteFixtures(PREFIX);
//     }
// });

describe('Devices', () => {
    describe('unifiOs', () => {
        let site: Site;
        let devices: Devices;
        beforeEach(async () => {
            site = await getLoggedSite(nock);
            devices = new Devices({ controller: site.getController(), site });
        });
        // it('should list devices', async () => {
        //     await nock.back(`${PREFIX}list.json`).then(async ({ nockDone }) => {
        //         const devicesFounds = await devices.list();
        //         console.log(devicesFounds);
        //         nockDone();
        //     });
        // });
        it('should add tests', () => {
            expect(true).toBeTruthy();
        });
    });

    // no data from non unifiOs
    // describe('non UnifiOs', () => {
    //     let site: Site;
    //     let devices: Devices;
    //     beforeEach(async () => {
    //         site = await getLoggedSite(nock, false);
    //         devices = new Devices({ controller: site.getController(), site });
    //     });
    //
    // });
});
