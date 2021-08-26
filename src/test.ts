import dotenv from 'dotenv';
import { Controller } from './Controller';

dotenv.config();

// create main function to deal with async/await
const main = async () => {
    const controller = new Controller({
        username: process.env.TEST_UNIFIOS_USERNAME || 'ubnt',
        password: process.env.TEST_UNIFIOS_PASSWORD || 'ubnt',
        url: process.env.TEST_UNIFIOS_URL || 'https://unifi',
        strictSSL: false
    });
    await controller.login();

    // retrieve controller fingerprints
    // const fingerprints = await controller.getDevicesFingerPrints();

    const [site] = await controller.getSites();

    await site.clientsGroups.create({
        name: 'test',
        downloadBandwidth: 1000,
        uploadBandwidth: 1000
    });

    const group = (await site.clientsGroups.list()).find((g) => g.name === 'test');
    if (group) {
        group.maxDownloadBandwidth = 100 * 1000;
        await group.save();
        console.log(group);

        await group.delete();
    }
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
