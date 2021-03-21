import UnifiAuth from './UnifiAuth';
import { AxiosInstance } from 'axios';
import Sites from './Sites/Sites';
import Site from './Sites/Site';
import { IUser } from './User/IUser';

export interface IController {
    version: string;
    auth: UnifiAuth;
    controllerInstance: AxiosInstance;
    sites: Sites;
    unifiOs: boolean;

    getSites(): Promise<Array<Site>>;

    login(): Promise<IUser>;

    logout(): Promise<void>;
}
