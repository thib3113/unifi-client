import { Network, Networks } from '../../src';
import { controller, site } from '../mocks';
import axios from 'axios';

describe('Networks', () => {
    let networks: Networks;
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    beforeEach(() => {
        networks = new Networks({ controller, site });
    });
    describe('list', () => {
        const mapNetworkMock = jest.fn();
        beforeEach(() => {
            // @ts-ignore
            networks.mapNetwork = mapNetworkMock.mockImplementation((n) => n);
        });

        it('should list networks', async () => {
            mockedAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [{ _id: 'aaaaa' }, { _id: 'aaaa1' }]
                    }
                })
            );
            const res = await networks.list();

            expect(mockedAxios.get).toHaveBeenCalledWith('/rest/networkconf');
            // expect(res).toStrictEqual([{ _id: 'aaaaa' }]);
            expect(mapNetworkMock).toHaveBeenCalledTimes(2);
            expect(mapNetworkMock).toHaveBeenCalledWith({ _id: 'aaaaa' });
            expect(mapNetworkMock).toHaveBeenCalledWith({ _id: 'aaaa1' });
        });
        it('should handle no results', async () => {
            mockedAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {}
                })
            );
            const res = await networks.list();
            expect(mockedAxios.get).toHaveBeenCalledWith('/rest/networkconf');
            expect(res).toStrictEqual([]);
            expect(mapNetworkMock).not.toHaveBeenCalled();
        });
    });
});
