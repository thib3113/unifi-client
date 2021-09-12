import { Controller } from './Controller';
import { IBuildUrlParams } from './interfaces';

export * from './IController';
export * from './IControllerProps';
export * from './interfaces';
export * from './UnifiAuth';

export * from './Clients';
export * from './commons';
export * from './Devices';
export * from './Errors';
export * from './Firewall';
export * from './Hotspot';
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
