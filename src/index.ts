import { Controller } from './Controller';

export * from './interfaces';
export * from './Errors';
export * from './Devices';
export * from './Hotspot';
export * from './Firewall';
export * from './Sites';
export * from './Stats';
export * from './User';
export * from './WebSockets';

export { Controller };
export default Controller;

declare module 'axios' {
    export interface AxiosRequestConfig {
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
