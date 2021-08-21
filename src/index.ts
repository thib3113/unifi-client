import { Controller } from './Controller';
import { IBuildUrlParams } from './interfaces';

export * from './interfaces';
export * from './Errors';
export * from './Clients';
export * from './Hotspot';
export * from './Firewall';
export * from './Sites';
export * from './Stats';
export * from './User';
export * from './WebSockets';

export { Controller };
export default Controller;

declare module 'axios' {
    export interface AxiosRequestConfig extends IBuildUrlParams {
        urlParams?: Record<string, string>;
        /**
         * default false
         */
        authenticationRequest?: boolean;
        retryAuth?: boolean;
    }
}
