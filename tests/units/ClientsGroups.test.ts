import axios from 'axios';
import { controller, site } from '../mocks';
import { ClientsGroups } from '../../src/Clients/ClientsGroups';
import { groupRaw } from '../mocks/clients';
import { ClientsGroup } from '../../src/Clients/ClientsGroup';

jest.mock('axios');

describe('ClientsGroups', () => {
    let group: ClientsGroups;
    let mockedAxios = axios as jest.Mocked<typeof axios>;
    beforeEach(() => {
        group = new ClientsGroups({ controller, site });
        mockedAxios.get.mockClear();
        mockedAxios.post.mockClear();
    });
    describe('list', () => {
        const mapObjectsMock = jest.fn();
        beforeEach(() => {
            // @ts-ignore
            group.mapObject = mapObjectsMock;
        });
        it('should map some of objects', async () => {
            mockedAxios.get.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [groupRaw]
                    }
                })
            );
            await group.list();
            expect(mapObjectsMock).toHaveBeenCalledWith(ClientsGroup, groupRaw);
            expect(mockedAxios.get).toHaveBeenCalledWith('/list/usergroup');
        });
        it('should handle an empty array', async () => {
            mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
            await group.list();
            expect(mapObjectsMock).not.toHaveBeenCalled();
            expect(mockedAxios.get).toHaveBeenCalledWith('/list/usergroup');
        });
    });
    describe('create', () => {
        const mapObjectsMock = jest.fn();
        beforeEach(() => {
            // @ts-ignore
            group.mapObject = mapObjectsMock;
        });
        it('should map some of objects', async () => {
            mockedAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [groupRaw]
                    }
                })
            );
            await group.create({
                name: 'test',
                downloadBandwidth: 100,
                uploadBandwidth: 1000
            });
            expect(mockedAxios.post).toHaveBeenCalledWith('/rest/usergroup', {
                name: 'test',
                qos_rate_max_down: 100,
                qos_rate_max_up: 1000
            });
            expect(mapObjectsMock).toHaveBeenCalledWith(ClientsGroup, groupRaw);
        });
        it('should use defaults values', async () => {
            mockedAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: []
                    }
                })
            );
            await group.create({
                name: 'test'
            });
            expect(mockedAxios.post).toHaveBeenCalledWith('/rest/usergroup', {
                name: 'test',
                qos_rate_max_down: -1,
                qos_rate_max_up: -1
            });
            expect(mapObjectsMock).not.toHaveBeenCalled();
        });
    });
});
