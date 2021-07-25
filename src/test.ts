import dotenv from 'dotenv';
import { Controller } from './Controller';

dotenv.config();

// create main function to deal with async/await
const main = async () => {
    const controller = new Controller({
        username: process.env.TEST_UNIFIOS_USERNAME,
        password: process.env.TEST_UNIFIOS_PASSWORD,
        url: process.env.TEST_UNIFIOS_URL || 'https://unifi',
        strictSSL: false
    });
    await controller.login();
    await controller.initWebSockets();

    //listen on all events
    controller.on('*', (eventName, ...args) => {
        console.log(eventName, ...args);
    });

    // listen on ctrl.connect
    // check known events in documentation : https://thib3113.github.io/unifi-client/modules/WebSockets_events_EUnifiEvents.html
    // else check in devtools when using the unifi web app
    controller.on('ctrl.connect', (...args) => {
        console.log(...args);
    });
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
