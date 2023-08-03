import * as path from 'path';
import { Controller, Site } from '../../../src';
import fs from 'fs';
import { isRecordMode } from './isRecordMode';
import { FIXTURES_PATH, recorder, TEST_UNIFI_URL, TEST_UNIFIOS_URL, UNIFI_PASSWORD, UNIFI_USERNAME } from './Recorder';

//avoid importing nock here !

// axios.defaults.adapter = require('axios').default.adapter;

export const generateMac = (): string =>
    'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });

export const setUp = (nock) => {
    return () => {
        // dotEnv.config({
        //     path: path.join(rootPath, '.env')
        // });
        //
        // nock.back.fixtures = FIXTURES_PATH; //this only needs to be set once in your test helper
    };
};

export const getLoggedSite = async (unifiOs = true): Promise<Site> => {
    try {
        let controller = await getLoggedControllerWithoutSite(unifiOs);

        const sites = await recorder.record('login-select-sites', () => controller.getSites(), unifiOs);
        if (sites.length === 0) {
            throw new Error('no sites found');
        }

        return sites[0];
    } catch (e) {
        console.log(e);
        throw new Error(`fail to load sites : ${e.name} - ${e.errorCode} : ${e.message} \n ${e.stack}`);
    }
};

export const getAuthentication: (unifiOs?: boolean) => { strictSSL: boolean; password: string; url: string; username: string } = (
    unifiOs = true
) => {
    if (recorder.isRecordMode()) {
        if (unifiOs && (!process.env.TEST_UNIFIOS_USERNAME || !process.env.TEST_UNIFIOS_PASSWORD || !process.env.TEST_UNIFIOS_URL)) {
            throw new Error('recording this test need this envs : TEST_UNIFIOS_USERNAME, TEST_UNIFIOS_PASSWORD, TEST_UNIFIOS_URL');
        } else if (!process.env.TEST_UNIFI_USERNAME || !process.env.TEST_UNIFI_PASSWORD || !process.env.TEST_UNIFI_URL) {
            throw new Error('recording this test need this envs : TEST_UNIFI_USERNAME, TEST_UNIFI_PASSWORD, TEST_UNIFI_URL');
        }

        return {
            username: unifiOs ? process.env.TEST_UNIFIOS_USERNAME : process.env.TEST_UNIFI_USERNAME,
            password: unifiOs ? process.env.TEST_UNIFIOS_PASSWORD : process.env.TEST_UNIFI_PASSWORD,
            url: unifiOs ? process.env.TEST_UNIFIOS_URL : process.env.TEST_UNIFI_URL,
            strictSSL: false
        } as { strictSSL: boolean; password: string; url: string; username: string };
    }

    return {
        username: UNIFI_USERNAME,
        password: UNIFI_PASSWORD,
        url: unifiOs ? TEST_UNIFIOS_URL : TEST_UNIFI_URL,
        strictSSL: false
    };
};

export const getLoggedControllerWithoutSite = async (unifiOs = true): Promise<Controller> => {
    return recorder.record(
        `login`,
        async () => {
            const controller = new Controller(getAuthentication(unifiOs));

            await controller.login();
            return controller;
        },
        unifiOs,
        {
            byPassCheckExist: true
        }
    );
};

export const deleteFixtures = (prefix?: string) => {
    fs.readdirSync(FIXTURES_PATH)
        .filter((f) => f.startsWith(prefix || ''))
        .map((f) => path.join(FIXTURES_PATH, f))
        .map((f) => fs.rmSync(f));
};
// export { nock };

export { isRecordMode };
