import Controller from './Controller';
import dotenv from 'dotenv';
import path from 'path';

// THIS FILE JUST HELP TO DEVELOPPE SOME TIMES

dotenv.config({
    path: path.join(__dirname, '..', '.env')
});

const startDate = new Date();
const check = async () => {
    console.log(startDate, new Date());
    try {
        const res = await c.sites.list();
        const a = res;
        console.log('getSites');
    } catch (e) {
        console.log(e);
    }
    setTimeout(() => check(), 60000);
};

let c: Controller;
const main = async () => {
    try {
        c = new Controller({
            username: 'ubnt',
            password: 'ubnt',
            url: 'https://fake-unifi.severac.lan/',
            strictSSL: false,
            rememberMe: false
        });

        await c.login();

        const res = await c.sites.list();
        console.log(res);
        check();
    } catch (e) {
        console.error(e);
    }
};

main();
