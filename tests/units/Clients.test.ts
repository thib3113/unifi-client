import { Client, ClientError, Clients, EErrorsCodes } from '../../src';
import { controller, site } from '../mocks';
import axios from 'axios';
import { generateMac } from '../scenario/_scripts/common';
import { macAddress } from '../globals';

describe('Clients', () => {
    let clients: Clients;
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mapObjectMock = jest.fn();
    const client = {
        mac: generateMac(),
        user_group_id: '',
        name: 'name',
        note: 'note',
        is_guest: true,
        is_wired: true,
        fixed_ip: 'fixed_ip',
        network_id: 'network_id'
    };
    beforeEach(() => {
        (mockedAxios as unknown as jest.Mock).mockClear();
        clients = new Clients({
            controller,
            site
        });
        // @ts-ignore
        clients.mapObject = mapObjectMock;
    });
    describe('create', () => {
        beforeEach(() => {
            mockedAxios.post.mockImplementation(() =>
                Promise.resolve({
                    data: {
                        data: []
                    }
                })
            );
        });
        it('should call create', async () => {
            await clients.create({
                mac: client.mac,
                user_group_id: client.user_group_id,
                name: client.name,
                note: client.note,
                is_guest: client.is_guest,
                is_wired: client.is_wired,
                fixed_ip: client.fixed_ip,
                network_id: client.network_id
            });

            expect(mockedAxios.post).toHaveBeenCalledWith('/rest/user', {
                fixed_ip: client.fixed_ip,
                is_guest: client.is_guest,
                is_wired: client.is_wired,
                mac: client.mac.toLowerCase(),
                name: client.name,
                network_id: client.network_id,
                note: client.note,
                noted: true,
                use_fixedip: true,
                user_group_id: client.user_group_id
            });
        });
        it('should call create with different values', async () => {
            await clients.create({
                mac: client.mac,
                usergroup_id: client.user_group_id,
                use_fixedip: true,
                fixed_ip: '127.0.0.2',
                name: client.name,
                note: client.note,
                is_guest: client.is_guest,
                is_wired: client.is_wired,
                network_id: client.network_id
            });

            expect(mockedAxios.post).toHaveBeenCalledWith('/rest/user', {
                mac: client.mac.toLowerCase(),
                use_fixedip: true,
                fixed_ip: '127.0.0.2',
                is_guest: client.is_guest,
                is_wired: client.is_wired,
                name: client.name,
                network_id: client.network_id,
                note: client.note,
                noted: true,
                user_group_id: client.user_group_id
            });
        });
        it('should try to init a client', async () => {
            mockedAxios.post.mockImplementationOnce(() =>
                Promise.resolve({
                    data: {
                        data: [client]
                    }
                })
            );
            await clients.create(client);

            // @ts-ignore
            expect(mapObjectMock).toHaveBeenCalledWith(expect.anything(), client);
        });
        it('should handle the errors', async () => {
            mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));
            await clients.create(client);

            // @ts-ignore
            expect(mapObjectMock).not.toHaveBeenCalled();
        });
        it('should refuse without mac', async () => {
            expect.assertions(3);
            try {
                // @ts-ignore
                await clients.create({ mac: undefined });
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('mac is mandatory');
                expect(e.code).toBe(EErrorsCodes.BAD_PARAMETERS);
            }
        });
    });
    describe('getById', () => {
        it('should get by id', async () => {
            mapObjectMock.mockImplementationOnce(() => {});
            mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: [client] } }));
            await clients.getById('monId');

            expect(mockedAxios.get).toHaveBeenCalledWith('/rest/user/:_id', { urlParams: { _id: 'monId' } });
            expect(mapObjectMock).toHaveBeenCalledWith(Client, client);
        });

        it('should handle no results', async () => {
            mapObjectMock.mockImplementationOnce(() => {});
            mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
            await clients.getById('monId');

            expect(mockedAxios.get).toHaveBeenCalledWith('/rest/user/:_id', { urlParams: { _id: 'monId' } });
            expect(mapObjectMock).not.toHaveBeenCalled();
        });
    });
    describe('getByMac', () => {
        it('should get by mac', async () => {
            mapObjectMock.mockImplementationOnce(() => {});
            mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { data: [client] } }));
            await clients.getByMac(macAddress);

            expect(mockedAxios.get).toHaveBeenCalledWith(`/stat/sta/${macAddress}`);
            expect(mapObjectMock).toHaveBeenCalledWith(Client, client);
        });

        it('should handle no results', async () => {
            mapObjectMock.mockImplementationOnce(() => {});
            mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
            await clients.getByMac(macAddress);

            expect(mockedAxios.get).toHaveBeenCalledWith(`/stat/sta/${macAddress}`);
            expect(mapObjectMock).not.toHaveBeenCalled();
        });
    });
    describe('listes', () => {
        beforeEach(() => {
            mockedAxios.get.mockImplementation(() =>
                Promise.resolve({
                    data: {
                        data: [client]
                    }
                })
            );
        });
        afterEach(() => {
            mockedAxios.get.mockReset();
        });

        describe('list', () => {
            it('should retrieve the list', async () => {
                await clients.list({ conn: 'bar' });
                expect(mockedAxios.get).toHaveBeenCalledWith('/stat/alluser', { params: { conn: 'bar' } });
                expect(mapObjectMock).toHaveBeenCalledWith(Client, client);
            });
            it('should return empty list', async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
                await clients.list({ conn: 'bar' });
                expect(mockedAxios.get).toHaveBeenCalledWith('/stat/alluser', { params: { conn: 'bar' } });
            });
        });

        describe('list2', () => {
            it('should retrieve the list', async () => {
                await clients.list2({ conn: 'bar' });
                expect(mockedAxios.get).toHaveBeenCalledWith('/list/user', { params: { conn: 'bar' } });
                expect(mapObjectMock).toHaveBeenCalledWith(Client, client);
            });
            it('should return empty list', async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
                await clients.list2({ conn: 'bar' });
                expect(mockedAxios.get).toHaveBeenCalledWith('/list/user', { params: { conn: 'bar' } });
            });
        });

        describe('list3', () => {
            it('should retrieve the list', async () => {
                await clients.list3({ conn: 'bar' });
                expect(mockedAxios.get).toHaveBeenCalledWith('/stat/sta', { params: { conn: 'bar' } });
                expect(mapObjectMock).toHaveBeenCalledWith(Client, client);
            });
            it('should return empty list', async () => {
                mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
                await clients.list3({ conn: 'bar' });
                expect(mockedAxios.get).toHaveBeenCalledWith('/stat/sta', { params: { conn: 'bar' } });
            });
        });
    });
});
