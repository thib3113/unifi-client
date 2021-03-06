import type { Site } from '../Sites';
import { IObjectSubController, _ObjectSubController } from './_ObjectSubController';
import { AxiosInstance } from 'axios';
import { ClientError } from '../Errors';
import { createDebugger } from '../util';

export interface IObjectSubSiteConfig extends Omit<IObjectSubController, 'instance'> {
    site: Site;
}

export type IObjectSubSiteConfigComplete = IObjectSubSiteConfig & IObjectSubController;

export class _ObjectSubSite extends _ObjectSubController {
    protected get instance(): AxiosInstance {
        return this.site.getInstance();
    }

    constructor(config: IObjectSubSiteConfig) {
        super({
            ...config,
            instance: config?.controller?.controllerInstance
        });
        if (!config.site) {
            throw new ClientError('ObjectSubSite not correctly initialized');
        }
        this.site = config.site;
        this.debug = createDebugger('_ObjectSubSite');
    }

    // this functions are here to delete this value from rest(...) or JSON
    protected get config(): IObjectSubSiteConfigComplete {
        return this.getPrivate<IObjectSubSiteConfigComplete>('config');
    }

    protected set config(value: IObjectSubSiteConfigComplete) {
        this.setPrivate<IObjectSubSiteConfigComplete>('config', value);
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
