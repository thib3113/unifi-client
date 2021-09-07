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

    const devices = await site.devices.list();
    console.log(devices);
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
