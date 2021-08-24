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

    const mac = 'XX:XX:XX:XX:XX:XX'
        .replace(/X/g, function () {
            return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
        })
        .toLowerCase();
    await site.clients.create({
        mac
    });

    // list devices
    const clients = await site.clients.list();
    const client = clients.find((c) => c.mac === mac);

    if (client) {
        console.log(await client.forget());
    } else {
        console.log(`client with mac ${mac} not found`);
    }
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
