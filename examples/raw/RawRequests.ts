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

    //exemple of a raw request to the controller
    // I want to call : https://unifi/api/users/self to get informations about mySelf
    const mySelf = await controller.getInstance().get('/api/users/self');

    // exemple of a raw request to a site
    // I want to get sysinfo for the default site, so the request on my UDM pro is : https://unifi/proxy/network/api/s/default/stat/sysinfo
    // I get the "default" site
    const defaultSite = (await controller.getSites()).find((s) => s.name === 'default');
    // I call /stat/sysinfo ... The instance will automaticaly transform for the correct url, and set the params .
    const sysInfo = await defaultSite?.getInstance().get('/stat/sysinfo');

    // if I wan't to use a new V2 endpoint, like : https://unifi/proxy/network/v2/api/site/default/notifications
    // I just need to reuse my site, call /notifications, and specify that I wan't to use apiVersion 2
    const notifications = await defaultSite?.getInstance().get('/notifications', {
        apiVersion: 2
    });
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
