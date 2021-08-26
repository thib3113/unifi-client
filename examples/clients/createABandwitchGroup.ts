import dotenv from 'dotenv';
import { Controller, Client } from '../../src';

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

    const [site] = await controller.getSites();

    // create the profil with :
    // - name "test"
    // - maxDownload 10Mbps ( 10000 Kbps )
    // - maxUpload 1Mbps ( 1000 Kbps )
    await site.clientsGroups.create({
        name: 'test',
        downloadBandwidth: 10000,
        uploadBandwidth: 1000
    });
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
