import Site from './Site';
import type Controller from '../Controller';

export default class Sites {
    constructor(readonly controller: Controller) {}

    public async list(): Promise<Array<Site>> {
        return ((await this.controller.controllerInstance.get('/api/self/sites')).data?.data || []).map(
            (s) => new Site(this.controller, s)
        );
    }
}
