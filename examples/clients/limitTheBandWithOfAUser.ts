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

    // list clients and profiles
    const [clients, groups] = await Promise.all([site.clients.list(), site.clientsGroups.list()]);

    //search client by mac address
    const client = clients.find((d) => d.mac === '04:18:d6:85:ed:f2');

    //check if the client is found
    if (!client) {
        throw new Error('fail to get client');
    }

    //search the bandwidth group ( be aware, name is a non uniq value )
    let group = groups.find((g) => g.name === 'test');
    //if the group is not found, we can create it
    if (!group) {
        // create the profil with :
        // - name "test"
        // - maxDownload 10Mbps ( 10000 Kbps )
        // - maxUpload 1Mbps ( 1000 Kbps )
        const tmpGroup = await site.clientsGroups.create({
            name: 'test',
            downloadBandwidth: 10000,
            uploadBandwidth: 1000
        });

        //create can return no group
        if (tmpGroup) {
            group = tmpGroup;
        }
    }
    //finally, if no group, we crash, there is a problem
    if (!group) {
        throw new Error('fail to get/create the bandwidth group');
    }

    //set the groupId on the client
    client.groupId = group._id;

    //save the client
    await client.save();
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
