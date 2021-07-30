import dotenv from 'dotenv';
import { Controller } from './Controller';

dotenv.config();

// create main function to deal with async/await
const main = async () => {
    const controller = new Controller({
        username: process.env.TEST_UNIFIOS_USERNAME || '',
        password: process.env.TEST_UNIFIOS_PASSWORD || '',
        url: process.env.TEST_UNIFIOS_URL || 'https://unifi',
        strictSSL: false
    });
    await controller.login();

    await controller.logout();
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
