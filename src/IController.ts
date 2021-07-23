import { AxiosInstance } from 'axios';
import { IUser } from './User/IUser';
import { Site } from './Sites/Site';
import { Sites } from './Sites/Sites';
import { UnifiAuth } from './UnifiAuth';

export interface IController {
    version: string;
    auth: UnifiAuth;
    controllerInstance: AxiosInstance;
    sites: Sites;
    unifiOs: boolean;

    getSites(): Promise<Array<Site>>;

    login(): Promise<IUser>;

    logout(): Promise<void>;

    createInstance(siteName?: string): AxiosInstance;
}
