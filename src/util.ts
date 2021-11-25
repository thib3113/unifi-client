import createDebug, { Debugger } from 'debug';
import url, { URL, URLSearchParams } from 'url';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { dateInput } from './commons';
import { Validate } from './commons/Validate';
import type { Controller } from './Controller';
import semver from 'semver';
import { ClientError, EErrorsCodes } from './Errors';

const debug = createDebug(`unifi-client`);
/**
 * create a debugger extending the default debugger
 * @param name - name for the debugger
 */
export const createDebugger = (name: string): Debugger => {
    if (!name) {
        throw new Error('name is mandatory');
    }
    return debug.extend(name);
};

/**
 * used to log an url
 * @param req - the AxiosRequestConfig object from axios
 * @param hidePassword - to hide "auth" part of the url
 */
export const getUrlRepresentation = (req: AxiosRequestConfig, hidePassword = true): string => {
    const urlParsed = new URL((req.baseURL || 'http://localhost') + (req.url || ''));
    const params = new URLSearchParams(urlParsed.search);

    if (req.auth) {
        if (!urlParsed.username) {
            urlParsed.username = req.auth.username;
        }
        if (!urlParsed.password) {
            urlParsed.password = req.auth.password;
        }
    }

    if (req.params) {
        Object.entries(req.params as Record<string, string>).forEach(([k, v]) => {
            params.append(k, v);
        });
    }

    urlParsed.search = params.toString();
    // @ts-ignore
    return url.format(urlParsed, {
        auth: !hidePassword
    });
};

export const removeTrailingSlash = (stringUrl: string): string => stringUrl.replace(/\/$/, '');

export const axiosUrlParams = (instance: AxiosInstance): AxiosInstance => {
    instance.interceptors.request.use((config) => {
        if (!config || !config.url) {
            return config;
        }

        const currentUrl = new URL(`${removeTrailingSlash(config.baseURL || '')}${config.url}`);
        // parse pathName to implement variables
        Object.entries(config.urlParams || {}).forEach(([k, v]) => {
            currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
        });

        const retUrl = currentUrl.pathname;
        currentUrl.pathname = '';
        return {
            ...config,
            baseURL: removeTrailingSlash(currentUrl.toString()),
            url: retUrl
        };
    });

    return instance;
};

export const convertTimestampSecondsToDate = (time: dateInput): Date => {
    return new Date(Validate.isNumber(time) ? time * 1000 : time);
};

export const checkNeeds = (controller: Controller, minVersion?: string, unifiOs?: boolean): boolean => {
    return (
        (!unifiOs || (Validate.isBoolean(unifiOs) && controller.unifiOs === unifiOs)) &&
        (!minVersion || semver.gte(controller.version, minVersion))
    );
};

/**
 *
 * @param controller - the controller
 * @param minVersion - the minimal semver version for this object
 * @param unifiOs - need to be unifiOs ? or Unifi Controller ? if no need, pass undefined
 * @param parameterName - a name for the parameter
 */
export const checkNeedVersion = (controller: Controller, minVersion?: string, unifiOs?: boolean, parameterName = ''): void => {
    if (checkNeeds(controller, minVersion, unifiOs)) {
        return;
    }

    let str = parameterName ? `${parameterName} ` : '';
    let code: EErrorsCodes;
    if (Validate.isBoolean(unifiOs)) {
        str += `need ${unifiOs ? '' : 'non-'}UnifiOs controller`;
        code = EErrorsCodes.UNIFI_CONTROLLER_TYPE_MISMATCH;
    } else {
        str += `need minimal controller version ${minVersion}`;
        code = EErrorsCodes.NEED_MORE_RECENT_CONTROLLER;
    }

    throw new ClientError(str, code);
};
