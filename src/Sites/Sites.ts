import { Site } from './Site';
import { Controller } from '../Controller';
import { EProxyNamespaces, IUnifiResponseEnveloppe } from '../interfaces';
import { ISite } from './ISite';

export class Sites {
    constructor(readonly controller: Controller) {}

    public async list(): Promise<Array<Site>> {
        const rawSites =
            (
                await this.controller.controllerInstance.get<IUnifiResponseEnveloppe<Array<ISite>>>('/api/self/sites', {
                    proxyNamespace: EProxyNamespaces.NETWORK
                })
            ).data?.data || [];

        //if user doesn't have access to default site, it can't fill the version, so fill it here
        if (!this.controller.version && rawSites.length > 0) {
            this.controller.version = await this.controller.auth.getVersion(rawSites[0].name);
        }

        return rawSites.map((s) => new Site(this.controller, s));
    }
}
