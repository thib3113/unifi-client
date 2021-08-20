import { Site } from './Site';
import { Controller } from '../Controller';
import { EProxyNamespaces } from '../interfaces';

export class Sites {
    constructor(readonly controller: Controller) {}

    public async list(): Promise<Array<Site>> {
        return (
            (await this.controller.controllerInstance.get('/api/self/sites', { proxyNamespace: EProxyNamespaces.NETWORK })).data?.data || []
        ).map((s) => new Site(this.controller, s));
    }
}
