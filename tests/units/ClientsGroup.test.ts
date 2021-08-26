import { controller, site } from '../mocks';
import { ClientsGroup } from '../../src/Clients/ClientsGroup';
import { ClientError, EErrorsCodes } from '../../src';
import axios from 'axios';
import { groupRaw } from '../mocks/clients';

jest.mock('axios');

describe('ClientsGroup', () => {
    describe('construct', () => {
        it('init with global values', () => {
            const group = new ClientsGroup({ controller, site }, groupRaw);
            expect(group.name).toBe(groupRaw.name);
            expect(group.siteId).toBe(groupRaw.site_id);
            expect(group._id).toBe(groupRaw._id);
            expect(group.hiddenId).toBe(groupRaw.attr_hidden_id);
            expect(group.noDelete).toBe(groupRaw.attr_no_delete);
            expect(group.maxDownloadBandwidth).toBe(groupRaw.qos_rate_max_down);
            expect(group.maxUploadBandwidth).toBe(groupRaw.qos_rate_max_up);
        });
        it('should init with defaults values', () => {
            const group = new ClientsGroup({ controller, site }, { _id: groupRaw._id });
            expect(group._id).toBe(groupRaw._id);
            expect(group.name).toBeUndefined();
            expect(group.siteId).toBeUndefined();
            expect(group.hiddenId).toBeUndefined();
            expect(group.noDelete).toBeUndefined();
            expect(group.maxDownloadBandwidth).toBeUndefined();
            expect(group.maxUploadBandwidth).toBeUndefined();
        });
        it('should need an _id', () => {
            expect.assertions(3);
            try {
                // @ts-ignore
                new ClientsGroup({ controller, site }, {});
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.code).toBe(EErrorsCodes.UNKNOWN_ERROR);
                expect(e.message).toBe('_id is needed');
            }
        });
    });
    describe('functions', () => {
        let group: ClientsGroup;
        let mockedAxios = axios as jest.Mocked<typeof axios>;
        beforeEach(() => {
            group = new ClientsGroup({ controller, site }, groupRaw);
            mockedAxios.put.mockClear();
            mockedAxios.delete.mockClear();
        });
        describe('delete', () => {
            it('should works', async () => {
                mockedAxios.delete.mockImplementationOnce(() => Promise.resolve({ data: { meta: { rc: 'ok' }, data: [] } }));
                expect(await group.delete()).toBeTruthy();
                expect(mockedAxios.delete).toHaveBeenCalledWith('/rest/usergroup/:_id', { urlParams: { _id: groupRaw._id } });
            });
            it("shouldn't works", async () => {
                mockedAxios.delete.mockImplementationOnce(() => Promise.resolve({ data: { meta: { rc: 'fail' }, data: [] } }));
                expect(await group.delete()).toBeFalsy();
                expect(mockedAxios.delete).toHaveBeenCalledWith('/rest/usergroup/:_id', { urlParams: { _id: groupRaw._id } });
            });
        });
        describe('save', () => {
            it(`shouldn't import new datas`, async () => {
                mockedAxios.put.mockImplementationOnce(() => Promise.resolve({ data: { meta: { rc: 'ok' }, data: [] } }));
                const importMock = jest.fn();
                group.import = importMock;
                group.maxDownloadBandwidth = 10 * 1000; //10 Mbps
                await group.save();
                expect(mockedAxios.put).toHaveBeenCalledWith(
                    '/rest/usergroup/:_id',
                    {
                        _id: groupRaw._id,
                        name: groupRaw.name,
                        qos_rate_max_up: groupRaw.qos_rate_max_up,
                        qos_rate_max_down: 10 * 1000, //10 Mbps
                        site_id: groupRaw.site_id
                    },
                    { urlParams: { _id: groupRaw._id } }
                );
                expect(importMock).not.toBeCalled();
            });
            it("shouldn't works", async () => {
                mockedAxios.put.mockImplementationOnce(() =>
                    Promise.resolve({
                        data: {
                            meta: { rc: 'ok' },
                            data: [
                                {
                                    qos_rate_max_up: 100,
                                    qos_rate_max_down: 10 * 1000 * 1000 //10 Gbps
                                }
                            ]
                        }
                    })
                );
                group.maxUploadBandwidth = 1000; //1 Mbps
                await group.save();
                expect(mockedAxios.put).toHaveBeenCalledWith(
                    '/rest/usergroup/:_id',
                    {
                        _id: groupRaw._id,
                        name: groupRaw.name,
                        qos_rate_max_up: 1000, //1 Mbps
                        qos_rate_max_down: groupRaw.qos_rate_max_down,
                        site_id: groupRaw.site_id
                    },
                    { urlParams: { _id: groupRaw._id } }
                );
                expect(group.maxUploadBandwidth).toBe(100);
                expect(group.maxDownloadBandwidth).toBe(10 * 1000 * 1000);
            });
        });
    });
});
