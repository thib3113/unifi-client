import { AxiosInstance } from 'axios';
import { IUser } from './User';
import { Site, Sites } from './Sites';
import { UnifiAuth } from './UnifiAuth';

export interface IController {
    version?: string;
    auth: UnifiAuth;
    controllerInstance: AxiosInstance;
    sites: Sites;
    unifiOs: boolean;

    getSites(): Promise<Array<Site>>;

    login(): Promise<IUser>;

    logout(): Promise<void>;

    createInstance(siteName?: string): AxiosInstance;
}
