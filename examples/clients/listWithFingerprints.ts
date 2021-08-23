import dotenv from 'dotenv';
import { Controller, IDeviceFingerprint } from '../../src';

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

    //retrieve controller fingerprints
    const fingerprints = await controller.getDevicesFingerPrints();

    const [site] = await controller.getSites();

    // list clients
    const clients = await site.clients.list();
    clients.forEach((client) => {
        let deviceFingerPrint: IDeviceFingerprint | undefined;

        const { device } = client;

        if (device.id) {
            deviceFingerPrint = fingerprints.devices ? fingerprints.devices[device.id] : undefined;
        }

        let deviceFullPart;
        if (deviceFingerPrint) {
            const osName =
                Number(deviceFingerPrint.osName) > 1
                    ? fingerprints.osNames[deviceFingerPrint.osName || 0]
                    : fingerprints.osClasses[deviceFingerPrint.osClass || 0];

            const deviceType =
                Number(deviceFingerPrint.deviceType) > 1
                    ? fingerprints.deviceTypes[deviceFingerPrint.deviceType || 0]
                    : fingerprints.deviceFamilies[deviceFingerPrint.deviceFamily || 0];

            const vendor = fingerprints.vendors[deviceFingerPrint.vendor || 0];

            const category =
                deviceFingerPrint.category && fingerprints.categories[deviceFingerPrint.category]
                    ? `Unifi Category : ${fingerprints.categories[deviceFingerPrint.category]}`
                    : '';

            deviceFullPart = `is a ${deviceFingerPrint.name} from ${vendor}, running ${osName}, in category ${deviceType} . With Fb ${deviceFingerPrint.fb}, and Tm ${deviceFingerPrint.tm} . ${category}`;
        } else {
            deviceFullPart = client.oui ? `seems to be from Brand "${client.oui}"` : '';
        }

        let datePart;
        if (client.firstSeen) {
            datePart = `first seen the ${client.firstSeen} and last seen the ${client.lastSeen}`;
        } else {
            datePart = 'never seen';
        }

        const hosName = client.hostname ? `use hostname ${client.hostname} ` : '';

        const connection = client.isWired ? 'wired' : 'wireless';

        const asGuest = client.isGuest ? 'as a guest' : '';
        console.log(
            `device is "${client.name ?? 'unnamed'}" (${
                client.mac
            }) ${hosName}and ${deviceFullPart} was connected ${connection} ${asGuest}, ${datePart}`
        );
    });
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
