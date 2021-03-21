import { AxiosInstance } from 'axios';
import { ISite } from '../Sites/ISite';
import { IController } from '../IController';
import _ObjectSubController, { IObjectSubController } from './_ObjectSubController';

export interface IObjectSubSiteConfig extends IObjectSubController {
    site: ISite;
}

export default class _ObjectSubSite extends _ObjectSubController {
    constructor(config: IObjectSubSiteConfig) {
        super(config);
        this.site = config.site;
    }

    // this functions are here to delete this value from rest(...) or JSON
    protected get config(): IObjectSubSiteConfig {
        return this.getPrivate<IObjectSubSiteConfig>('config');
    }

    protected set config(value: IObjectSubSiteConfig) {
        this.setPrivate<IObjectSubSiteConfig>('config', value);
    }
    protected get instance(): AxiosInstance {
        return this.getPrivate<AxiosInstance>('instance');
    }

    protected set instance(value: AxiosInstance) {
        this.setPrivate<AxiosInstance>('instance', value);
    }
    protected get controller(): IController {
        return this.getPrivate<IController>('controller');
    }

    protected set controller(value: IController) {
        this.setPrivate<IController>('controller', value);
    }
    protected get site(): ISite {
        return this.getPrivate<ISite>('site');
    }

    protected set site(value: ISite) {
        this.setPrivate<ISite>('site', value);
    }

    // toJSON(): Record<string, any> {
    //     const obj = { ...this };
    //     //remove circular known parts
    //     delete obj._site;
    //     delete obj._instance;
    //     delete obj._controller;
    //     delete obj._config;
    //
    //     return obj;
    // }

    protected mapObject<U extends _ObjectSubSite>(constructor: new (config: IObjectSubSiteConfig, props: any) => U, object: any): U {
        return !object ? object : new constructor(this.config, object);
    }
}
