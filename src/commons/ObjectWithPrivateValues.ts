const _privateMap = new WeakMap();
export class ObjectWithPrivateValues {
    constructor() {
        this.setPrivate('__init', true);
    }

    /**
     * @typeParam T - the type retrieve.
     * @param key - the key to retrieve
     */
    protected getPrivate<T>(key: string): T {
        const privateDatas = this.privateMap.get(this);
        return privateDatas[key];
    }

    /**
     * @typeParam T - the type to set.
     * @param key - the key to set
     * @param value - the value
     */
    protected setPrivate<T>(key: string, value: T): void {
        const privateDatas = this.privateMap.get(this) || {};
        privateDatas[key] = value;
        this.privateMap.set(this, privateDatas);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected get privateMap(): WeakMap<any, any> {
        return _privateMap;
    }
}
