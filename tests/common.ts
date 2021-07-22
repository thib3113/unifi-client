import dotEnv from 'dotenv';
import * as path from 'path';
import axios from 'axios';
import { Controller } from '../src';
import fs from 'fs';
import Site from '../src/Sites/Site';

//avoid importing nock here !

export const UNIFI_USERNAME = 'ubnt';
export const UNIFI_PASSWORD = 'ubnt';
export const FIXTURES_PATH = path.join(__dirname, 'nockFixtures');

axios.defaults.adapter = require('axios/lib/adapters/http');

export const isRecordMode = (): boolean => process.env.JEST_RECORD === 'true';

export const generateMac = (): string =>
    'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });

export const setUp = (nock) => {
    return () => {
        dotEnv.config({
            path: path.join(__dirname, '..', '.env')
        });

        nock.back.fixtures = FIXTURES_PATH; //this only needs to be set once in your test helper

        if (isRecordMode()) {
            // console.log('enable net');
            nock.enableNetConnect();
            // process.env.NOCK_OFF = 'true';
            // process.env.NOCK_BACK_MODE = 'record';
            nock.back.setMode('record');
        }
    };
};

export const getLoggedSite = async (nock, unifiOs = true): Promise<Site> => {
    let site: Site;
    try {
        let controller = await getLoggedControllerWithoutSite(nock, unifiOs);
        const getSite = async () => {
            let site;
            // try {
            [site] = await controller.getSites();
            // } catch (e) {
            //     throw new Error('fail to select site');
            // }
            return site;
        };
        if (unifiOs) {
            await nock.back('login-select-sites.json').then(async ({ nockDone }) => {
                site = await getSite();
                nockDone();
            });
        } else {
            site = await getSite();
        }
    } catch (e) {
        console.log(e);
        throw new Error(`fail to load sites : ${e.name} - ${e.errorCode}`);
    }
    return site;
};

export const getAuthentication: (unifiOs?: boolean) => { strictSSL: boolean; password: string; url: string; username: string } = (
    unifiOs = true
) => {
    return {
        username: (unifiOs ? process.env.TEST_UNIFIOS_USERNAME : process.env.TEST_UNIFI_USERNAME) || UNIFI_USERNAME,
        password: (unifiOs ? process.env.TEST_UNIFIOS_PASSWORD : process.env.TEST_UNIFI_PASSWORD) || UNIFI_PASSWORD,
        url: unifiOs ? process.env.TEST_UNIFIOS_URL || 'https://unifi' : process.env.TEST_UNIFI_URL || 'https://127.0.0.1:8443',
        strictSSL: false
    };
};

export const getLoggedControllerWithoutSite = async (nock, unifiOs = true): Promise<Controller> => {
    let controller: Controller;
    setUp(nock)();

    const login = async (unifiOs): Promise<Controller> => {
        controller = new Controller(getAuthentication(unifiOs));

        // try {
        await controller.login();
        // } catch (e) {
        //     throw new Error('fail to login to controller');
        // }
        return controller;
    };

    if (unifiOs) {
        return await nock.back('login.json').then(async ({ nockDone }) => {
            const ctrl = login(unifiOs);
            nockDone();
            return ctrl;
        });
    } else {
        return login(unifiOs);
    }
};

export const deleteFixtures = (prefix?: string) => {
    fs.readdirSync(FIXTURES_PATH)
        .filter((f) => f.startsWith(prefix))
        .map((f) => path.join(FIXTURES_PATH, f))
        .map((f) => fs.rmSync(f));
};
// export { nock };
