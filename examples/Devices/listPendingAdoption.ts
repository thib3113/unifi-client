import dotenv from 'dotenv';
import { Controller } from '../../src';
import { EDeviceStates } from '../../src';

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

    const devices = await site.devices.list();

    const devicesPendingAdoption = devices.filter((d) => d.state === EDeviceStates.PENDING_ADOPTION);

    devicesPendingAdoption.forEach((device) => {
        console.log(`device ${device.mac} is pending adoption`);
    });

    //want to adopt them ?
    // await Promise.all(devicesPendingAdoption.map((device) => site.adoptDevice(device)));
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
