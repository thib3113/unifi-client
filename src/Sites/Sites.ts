import Site from './Site';
import { AxiosInstance } from 'axios';
import { IController } from '../IController';

export default class Sites {
    constructor(readonly controller: IController) {}

    public async getSites(): Promise<Array<Site>> {
        return ((await this.controller.controllerInstance.get('/api/self/sites')).data?.data || []).map(
            (s) => new Site(this.controller, s)
        );
    }
}
