import { Controller, EErrorsCodes } from '../../src';

// /!\ WARNING /!\
// 2FA and non local login is only tested on unifiOS (eg. UDM pro)
// /!\ WARNING /!\

// create main function to deal with async/await
const main = async () => {
    const controller = new Controller({
        username: process.env.TEST_UNIFIOS_USERNAME || '',
        password: process.env.TEST_UNIFIOS_PASSWORD || '',
        url: process.env.TEST_UNIFIOS_URL || 'https://unifi',
        strictSSL: false
    });

    try {
        await controller.login();
    } catch (e) {
        //e = UnifiError with code 499, and message "2fa token required to authenticate to SSO"
        if (e.code === EErrorsCodes.NEED_2FA) {
            await controller.login('<insertThe2FAToken>');
        }
    }

    //login with 2FAToken will disable auto re-login (because need the token when re-login)
};

//just run the async main, and log error if needed
main().catch((e) => console.error(e));
