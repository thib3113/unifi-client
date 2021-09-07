import { Site, Sites } from '../../src';
import { controller } from '../mocks';
import axios from 'axios';

jest.mock('../../src/Sites/Site');

describe('Sites', () => {
    describe('functions', () => {
        let sites: Sites;
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        beforeEach(() => {
            sites = new Sites(controller);
        });
        describe('list', () => {
            it('should return results', async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: [{ _id: 'aaaaa' }, { _id: 'aaaaa2' }] } }));
                await sites.list();
                expect(mockedAxios.get).toHaveBeenCalledWith('/api/self/sites', { proxyNamespace: 'network' });
                expect(Site).toHaveBeenCalledTimes(2);
                expect(Site).toHaveBeenCalledWith(controller, { _id: 'aaaaa' });
                expect(Site).toHaveBeenCalledWith(controller, { _id: 'aaaaa2' });
            });
            it(`shouldn't return results`, async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
                await sites.list();
                expect(mockedAxios.get).toHaveBeenCalledWith('/api/self/sites', { proxyNamespace: 'network' });
                expect(Site).not.toHaveBeenCalled();
            });
        });
    });
});
