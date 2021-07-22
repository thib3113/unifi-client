// noinspection ES6UnusedImports
import axios from 'axios'; // eslint-disable-line
import { ISite } from './Sites/ISite';

declare module 'axios' {
    interface AxiosRequestConfig {
        urlParams?: Record<string, string>;
        site?: string;
        /**
         * default false
         */
        authenticationRequest?: boolean;
        retryAuth?: boolean;
    }
}

declare global {
    type partialSite = Partial<ISite> & { name: string };
}
