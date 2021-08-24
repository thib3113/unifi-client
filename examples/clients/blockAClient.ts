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

    // list clients
    const clients = await site.clients.list();

    //search client by mac address
    const client = clients.find((d) => d.mac === '04:18:d6:85:ed:f2');

    //check if the client is found
    if (client) {
        // block it
        await client.block();

        // unblock if needed
        // await client.unblock()
    }

    // OR USE MANUAL WAY TO INIT Client Object ( for unknown client for exemple )
    const client2 = new Client({ controller, site }, { mac: '04:18:d6:85:ed:f2' });
    await client2.block();
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
