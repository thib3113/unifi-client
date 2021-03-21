import createDebug, { Debugger } from 'debug';
import url, { URL, URLSearchParams } from 'url';
import { AxiosRequestConfig } from 'axios';

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
    const urlParsed = new URL(req.baseURL + req.url);
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
