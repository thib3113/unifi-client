import { ISite } from '../Sites/ISite';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars
    protected import(props: any): this {
        return this;
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
    //
    /**
     * @param constructor - the construtor to map the object
     * @param object - the properties passed to the constructor if defined
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    protected mapObject<U extends _ObjectSubSite>(constructor: new (config: IObjectSubSiteConfig, props: any) => U, object: any): U {
        return !object ? object : new constructor(this.config, object);
    }
}
