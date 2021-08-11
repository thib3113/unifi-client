import { Controller } from '../../src';

// create main function to deal with async/await
const main = async () => {
    const controller = new Controller({
        username: process.env.TEST_UNIFIOS_USERNAME || '',
        password: process.env.TEST_UNIFIOS_PASSWORD || '',
        url: process.env.TEST_UNIFIOS_URL || 'https://unifi',
        strictSSL: false
    });
    await controller.login();
    await controller.initWebSockets();

    // listen on ctrl.connect
    // check known events in documentation : https://thib3113.github.io/unifi-client/modules/WebSockets_events_EUnifiEvents.html
    // else check in devtools when using the unifi web app
    // only compatible with unifiOS
    if (controller.unifiOs) {
        //listen on all events
        controller.on('*', (eventName, ...args) => {
            console.log(eventName, ...args);
        });
        //listen on controller connection to server
        controller.on('ctrl.connect', (...args) => {
            console.log(...args);
        });
        // controller.on is an equivalent of controller.ws.on
    }

    /**
     * listen on super site ... seems to be an equivalent of controller websocket for non unifiOS . ( but events and name doesn't use the same form )
     */
    controller.superWS.on('*', (eventName, ...args) => {
        console.log(eventName, ...args);
    });

    const [site] = await controller.getSites();
    await site.initWebSockets();
    site.ws.on('*', (eventName, ...args) => {
        console.log(eventName, ...args);
    });
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
