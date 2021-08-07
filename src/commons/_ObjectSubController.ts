import { AxiosInstance } from 'axios';
import { Site } from '../Sites';
import { ClientError, EErrorsCodes } from '../Errors';
import semver from 'semver';
import { ObjectWithPrivateValues } from './ObjectWithPrivateValues';
import { Validate } from './Validate';
import { Controller } from '../Controller';

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
        this.controller = config.controller;
        this.controllerInstance = config.instance;
        this.config = config;
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
        return (
            (Validate.isBoolean(unifiOs) && this.controller.unifiOs === unifiOs) ||
            (minVersion && semver.gte(this.controller.version, minVersion))
        );
    }

    /**
     *
     * @param minVersion - the minimal semver version for this object
     * @param unifiOs - need to be unifiOs ? or Unifi Controller ? if no need, pass undefined
     */
    protected checkNeedVersion(minVersion?: string, unifiOs?: boolean): boolean {
        if (this.checkNeeds(minVersion, unifiOs)) {
            return true;
        }

        let str: string;
        let code: EErrorsCodes;
        if (Validate.isBoolean(unifiOs)) {
            str = `need ${unifiOs ? '' : 'non-'}UnifiOs controller`;
            code = EErrorsCodes.UNIFI_CONTROLLER_TYPE_MISMATCH;
        } else {
            str = `need minimal controller version ${minVersion}`;
            code = EErrorsCodes.NEED_MORE_RECENT_CONTROLLER;
        }

        throw new ClientError(str, code);
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
            if (this.checkNeedVersion(minVersion, unifiOs)) {
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
            }
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
}
