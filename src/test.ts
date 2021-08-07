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

    const [site] = await controller.getSites();
    // const stats = await site.stats.getGatewayStats(EStatsPeriod.FIVE_MINUTES, undefined, undefined, [
    //     'mem',
    //     'cpu',
    //     'loadavg_5',
    //     'lan-rx_errors',
    //     'lan-tx_errors',
    //     'lan-rx_bytes',
    //     'lan-tx_bytes',
    //     'lan-rx_packets',
    //     'lan-tx_packets',
    //     'lan-rx_dropped',
    //     'lan-tx_dropped',
    //     'time'
    // ]);
    const stats = await site.stats.getUsersStats();
    console.log(stats);
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
