import { AxiosInstance } from 'axios';
import { IUser } from './User';
import { Site, Sites } from './Sites';
import { UnifiAuth } from './UnifiAuth';
import { Networks } from './Networks';

export interface IController {
    version?: string;
    auth: UnifiAuth;
    controllerInstance: AxiosInstance;
    sites: Sites;
    networks: Networks;
    unifiOs: boolean;

    getSites(): Promise<Array<Site>>;

    login(): Promise<IUser>;

    logout(): Promise<void>;

    createInstance(siteName?: string): AxiosInstance;
}
