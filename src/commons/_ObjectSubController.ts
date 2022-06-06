import { AxiosInstance } from 'axios';
import { Site } from '../Sites';
import { ClientError } from '../Errors';
import { ObjectWithPrivateValues } from './ObjectWithPrivateValues';
import { Validate } from './Validate';
import { Controller } from '../Controller';
import { Debugger } from 'debug';
import { checkNeeds, checkNeedVersion, createDebugger } from '../util';

export interface IObjectSubController {
    instance: AxiosInstance;
    controller: Controller;
}

export class _ObjectSubController extends ObjectWithPrivateValues {
    // this functions are here to delete this value from rest(...) or JSON
    protected get config(): IObjectSubController {
        return this.getPrivate<IObjectSubController>('config');
    }

    protected set config(value: IObjectSubController) {
        this.setPrivate<IObjectSubController>('config', value);
    }
    protected get controllerInstance(): AxiosInstance {
        return this.getPrivate<AxiosInstance>('controllerInstance');
    }

    protected set controllerInstance(value: AxiosInstance) {
        this.setPrivate<AxiosInstance>('controllerInstance', value);
    }
    protected get controller(): Controller {
        return this.getPrivate<Controller>('controller');
    }

    protected set controller(value: Controller) {
        this.setPrivate<Controller>('controller', value);
    }
    protected get site(): Site {
        return this.getPrivate<Site>('site');
    }

    protected set site(value: Site) {
        this.setPrivate<Site>('site', value);
    }

    constructor(config: IObjectSubController) {
        super();

        if (!config || !config.controller || !config.instance) {
            throw new ClientError('ObjectSubController not correctly initialized');
        }

        this.controller = config.controller;
        this.controllerInstance = config.instance;
        this.config = config;
        this.debug = createDebugger('_ObjectSubController');
    }

    public toJSON(): Partial<this> {
        const ret = {};
        Object.entries(this).forEach(([k, v]) => {
            ret[k] = v;
        });
        return ret;
    }

    protected get instance(): AxiosInstance {
        return this.getPrivate<AxiosInstance>('instance');
    }

    protected set instance(value: AxiosInstance) {
        this.setPrivate<AxiosInstance>('instance', value);
    }

    public getInstance(): AxiosInstance {
        return this.instance;
    }

    public getController(): Controller {
        return this.controller;
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

    protected checkNeeds(minVersion?: string, unifiOs?: boolean): boolean {
        return checkNeeds(this.controller, minVersion, unifiOs);
    }

    /**
     *
     * @param minVersion - the minimal semver version for this object
     * @param unifiOs - need to be unifiOs ? or Unifi Controller ? if no need, pass undefined
     * @param parameterName - a name for the parameter
     */
    protected checkNeedVersion(minVersion?: string, unifiOs?: boolean, parameterName = ''): void {
        checkNeedVersion(this.controller, minVersion, unifiOs, parameterName);
    }

    /**
     *
     * @param key - the key object that need to be only supported on some versions
     * @param value - the value store in this object
     * @param minVersion - the minimal semver version for this object
     * @param unifiOs - need to be unifiOs ? or Unifi Controller ? if no need, pass undefined
     * @param allowUndefined - to undefined check ?
     */
    protected needVersion<T>(key: keyof this, value?: T, minVersion?: string, unifiOs?: boolean, allowUndefined = false): boolean {
        try {
            this.checkNeedVersion(minVersion, unifiOs, `${this.constructor.name}.${key.toString()}`);
            if (Validate.isUndefined(value)) {
                if (allowUndefined) {
                    // @ts-ignore
                    this[key] = value;
                }
            } else {
                // @ts-ignore
                this[key] = value;
            }
            return true;
        } catch (e) {
            Object.defineProperty(this, key, {
                // Create a new getter for the property
                get: () => {
                    throw e;
                },
                // Create a new setter for the property
                set: () => {
                    throw e;
                }
            });
        }
        return false;
    }

    protected get debug(): Debugger {
        return this.getPrivate<Debugger>('debug');
    }

    protected set debug(value: Debugger) {
        this.setPrivate<Debugger>('debug', value);
    }
}
