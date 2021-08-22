import dotenv from 'dotenv';
import { Controller } from './Controller';

dotenv.config();

// create main function to deal with async/await
const main = async () => {
    const controller = new Controller({
        username: process.env.TEST_UNIFI_USERNAME || 'ubnt',
        password: process.env.TEST_UNIFI_PASSWORD || 'ubnt',
        url: process.env.TEST_UNIFI_URL || 'https://unifi',
        strictSSL: false
    });
    await controller.login();

    // retrieve controller fingerprints
    // const fingerprints = await controller.getDevicesFingerPrints();

    const [site] = await controller.getSites();

    // list devices
    const clients = await site.clients.list();
    const [client] = clients;
    console.log(client);
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
