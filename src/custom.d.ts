// noinspection ES6UnusedImports
import axios from 'axios'; // eslint-disable-line
import { ISite } from './Sites/ISite';

declare module 'axios' {
    interface AxiosRequestConfig {
        urlParams?: Record<string, string>;
        site?: string;
        apiVersion?: number;
        /**
         * default /proxy/network
         */
        unifiUrl?: string;
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
