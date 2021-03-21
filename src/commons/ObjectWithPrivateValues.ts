const _privateMap = new WeakMap();
export default class ObjectWithPrivateValues {
    constructor() {
        this.setPrivate('__init', true);
    }
    protected getPrivate<T>(key: string): T {
        const privateDatas = this.privateMap.get(this);
        return privateDatas[key];
    }

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
