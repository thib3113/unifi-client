import type { Definition } from 'nock';
import { Validate } from '../../../src/commons/Validate';
import crypto from 'crypto';
import setCookieParser from 'set-cookie-parser';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import * as stream from 'stream';

export const UNIFI_USERNAME = 'ubnt';
export const UNIFI_PASSWORD = 'ubnt';
export const TEST_UNIFIOS_URL = 'https://unifios.lan';
export const TEST_UNIFI_URL = 'https://unifi.lan';

export type store = {
    global: Record<string, unknown>;
    record: Record<string, unknown>;
    definition: Record<string, unknown>;
};

export type DefinitionImproved = Omit<Definition, 'headers'> & { rawHeaders: Array<string> } & {
    __isUnifiOs: boolean;
    __name: string;
};

export type rule = {
    match: Partial<{
        [K in keyof DefinitionImproved]: DefinitionImproved[K] | ((value: DefinitionImproved[K]) => boolean);
    }>;
    fn: (definition: DefinitionImproved, store: store) => DefinitionImproved;
};
export const recorderRules: Array<rule> = [];

const getRandomString = (length: number = 25) =>
    Array.from(crypto.getRandomValues(new Uint32Array(length)), () => Math.floor(Math.random() * 36).toString(36)).join('');

const getRandomIp = () => {
    return Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join('.');
};

const generateRandomMac = () => {
    return Array(6)
        .fill(0)
        .map(() =>
            Math.floor(Math.random() * 256)
                .toString(16)
                .padStart(2, '0')
        )
        .join(':');
};

//set
recorderRules.push({
    match: {},
    fn: (definition) => ({ ...definition, scope: definition.__isUnifiOs ? TEST_UNIFIOS_URL : TEST_UNIFI_URL })
});

// rewrite login
recorderRules.push({
    match: {
        method: 'POST',
        path: (v) => Validate.isString(v) && v.includes('login'),
        status: 200
    },
    fn: (def, store) => {
        if (typeof def.body != 'object') {
            throw new Error('not body objet is not handled');
        }
        if (typeof def.response != 'object' || def.response instanceof Buffer || def.response instanceof stream.Stream) {
            throw new Error('not response objet is not handled');
        }

        if (!store.global.jwtKey) {
            store.global.jwtKey = crypto.randomUUID();
        }

        def.body = {
            ...def.body,
            username: UNIFI_USERNAME,
            password: UNIFI_PASSWORD
        };

        const response = def.response;
        def.response = {
            ...response,
            unique_id: crypto.randomUUID(),
            id: crypto.randomUUID(),
            first_name: 'firstName',
            last_name: 'lastName',
            full_name: 'fullName',
            email: 'demo@ubnt.com',
            username: UNIFI_USERNAME,
            create_time: Date.now(),
            password_revision: Date.now(),
            update_time: Date.now(),
            groups: (response.groups || []).map((g) => ({
                ...g,
                unique_id: crypto.randomUUID(),
                create_time: new Date().toISOString()
            })),
            roles: (response.groups || []).map((r) => ({ ...r, unique_id: crypto.randomUUID() })),
            deviceToken: jwt.sign({ user_id: crypto.randomUUID() }, store.global.jwtKey, { expiresIn: '100y' })
        };

        return def;
    }
});

recorderRules.push({
    match: {
        rawHeaders: (headers) =>
            headers.some((header) => Validate.isString(header) && (header.startsWith('TOKEN=') || header.startsWith('X-CSRF-Token')))
    },
    fn: (definition, store) => {
        if (!store.global.csrfToken) {
            store.global.csrfToken = crypto.randomUUID();
        }

        if (!store.global.jwtKey) {
            store.global.jwtKey = crypto.randomUUID();
        }

        definition.rawHeaders = (definition.rawHeaders || []).map((header, index, array) => {
            if (header.startsWith('X-CSRF-Token')) {
                console.log(array, array[index + 1], store.global.csrfToken);
                array[index + 1] = store.global.csrfToken as string;
                return header;
            }
            const tokenCookieStr = 'TOKEN=';
            if (header.startsWith('TOKEN=')) {
                if (store.global.cookie) {
                    return store.global.cookie as string;
                }

                const cookies = setCookieParser.parse(header, {
                    map: true
                });
                const curCookie = cookies['TOKEN'];
                if (!curCookie.value) {
                    return header;
                }

                const decodedToken = jwt.decode(curCookie.value);
                delete decodedToken.exp;

                const token = jwt.sign(decodedToken, store.global.jwtKey, { expiresIn: '100y' });
                header = cookie.serialize('TOKEN', token, {
                    ...curCookie,
                    // @ts-ignore
                    sameSite: curCookie.sameSite
                });

                store.global.cookie = header;

                return store.global.cookie as string;
            }
            return header;
        });

        return definition;
    }
});

// remove some information in /sysinfo
recorderRules.push({
    match: {
        method: 'GET',
        path: (value) => Validate.isString(value) && value.endsWith('/sysinfo')
    },
    fn: (def, store) => {
        if (typeof def.response != 'object' || def.response instanceof Buffer || def.response instanceof stream.Stream) {
            throw new Error('not response objet is not handled');
        }

        def.response = {
            ...def.response,
            data: (def.response.data || []).map((d) => ({
                ...d,
                ip_addrs: [getRandomIp()],
                sso_app_id: crypto.randomUUID(),
                sso_app_sec: getRandomString(),
                anonymous_controller_id: crypto.randomUUID()
            }))
        };

        return def;
    }
});
