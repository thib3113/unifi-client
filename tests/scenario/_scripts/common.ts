import dotEnv from 'dotenv';
import * as path from 'path';
import axios from 'axios';
import { Controller } from '../../../src';
import fs from 'fs';
import { Site } from '../../../src';
import { isRecordMode } from './isRecordMode';
import type { Back } from 'nock';

//avoid importing nock here !

const rootPath = path.join(__dirname, '..', '..', '..');

export const UNIFI_USERNAME = 'ubnt';
export const UNIFI_PASSWORD = 'ubnt';
export const FIXTURES_PATH = path.join(rootPath, 'tests', 'nockFixtures');

// axios.defaults.adapter = require('axios').default.adapter;

export const generateMac = (): string =>
    'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    });

export const setUp = (nock) => {
    return () => {
        dotEnv.config({
            path: path.join(rootPath, '.env')
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
    try {
        let site: Site;
        let controller = await getLoggedControllerWithoutSite(nock, unifiOs);
        const getSite = async () => {
            let s;
            // try {
            [s] = await controller.getSites();
            // } catch (e) {
            //     throw new Error('fail to select site');
            // }
            return s;
        };
        if (unifiOs) {
            await (nock.back as Back)('login-select-sites.json').then(async ({ nockDone }) => {
                site = await getSite();
                nockDone();
            });
        } else {
            site = await getSite();
        }

        // @ts-ignore
        return site;
    } catch (e) {
        console.log(e);
        throw new Error(`fail to load sites : ${e.name} - ${e.errorCode} : ${e.message} \n ${e.stack}`);
    }
};

export const getAuthentication: (unifiOs?: boolean) => { strictSSL: boolean; password: string; url: string; username: string } = (
    unifiOs = true
) => {
    return {
        username: (unifiOs ? process.env.TEST_UNIFIOS_USERNAME : process.env.TEST_UNIFI_USERNAME) || UNIFI_USERNAME,
        password: (unifiOs ? process.env.TEST_UNIFIOS_PASSWORD : process.env.TEST_UNIFI_PASSWORD) || UNIFI_PASSWORD,
        url: unifiOs ? process.env.TEST_UNIFIOS_URL || 'https://unifi2' : process.env.TEST_UNIFI_URL || 'https://127.0.0.1:8443',
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
        return nock.back('login.json').then(async ({ nockDone }) => {
            const ctrl = await login(unifiOs);
            nockDone();
            return ctrl;
        });
    } else {
        return login(unifiOs);
    }
};

export const deleteFixtures = (prefix?: string) => {
    fs.readdirSync(FIXTURES_PATH)
        .filter((f) => f.startsWith(prefix || ''))
        .map((f) => path.join(FIXTURES_PATH, f))
        .map((f) => fs.rmSync(f));
};
// export { nock };

export { isRecordMode };
