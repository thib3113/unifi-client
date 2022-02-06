import { ClientError, EErrorsCodes, FWRule, IFWV4RuleRaw, IFWV6RuleRaw } from '../../../src';
import { controller, site } from '../../mocks';
import axios from 'axios';

const rule4Raw: IFWV4RuleRaw = {
    _id: '60493eb9c3d8180433ef200d',
    ruleset: 'WAN_IN',
    rule_index: 2000,
    name: 'Blocked Group',
    enabled: true,
    action: 'drop',
    protocol_match_excepted: false,
    logging: true,
    state_new: false,
    state_established: false,
    state_invalid: false,
    state_related: false,
    ipsec: 'a',
    src_firewallgroup_ids: ['604bcb9ec3d81805b5f30d82'],
    src_mac_address: 'b',
    dst_firewallgroup_ids: [],
    dst_address: 'c',
    src_address: 'd',
    protocol: 'all',
    icmp_typename: 'echo-reply',
    src_networkconf_id: 'd',
    src_networkconf_type: 'NETv4',
    dst_networkconf_id: 'e',
    dst_networkconf_type: 'NETv4',
    site_id: '6001f8a73fd98c05e9465f91',
    setting_preference: 'auto',
    dst_port: 'r'
};
const rule6Raw: IFWV6RuleRaw = {
    _id: '612a425dcc8e140487f0127b',
    ruleset: 'WANv6_IN',
    rule_index: 2500,
    name: 'ICMPV6',
    enabled: true,
    action: 'accept',
    protocol_match_excepted: false,
    logging: false,
    state_new: false,
    state_established: false,
    state_invalid: false,
    state_related: false,
    ipsec: 'a',
    src_firewallgroup_ids: ['b'],
    src_mac_address: 'c',
    dst_firewallgroup_ids: ['d'],
    protocol_v6: 'icmpv6',
    icmpv6_typename: 'address-unreachable',
    site_id: '6001f8a73fd98c05e9465f91',
    setting_preference: 'auto'
};

describe('FWRule', () => {
    describe('construct', () => {
        it('init IPv6 rule', () => {
            const rule = new FWRule({ controller, site }, rule6Raw);
            expect(rule._id).toBe(rule6Raw._id);
            expect(rule.ruleset).toBe(rule6Raw.ruleset);
            expect(rule.rule_index).toBe(rule6Raw.rule_index);
            expect(rule.name).toBe(rule6Raw.name);
            expect(rule.enabled).toBe(rule6Raw.enabled);
            expect(rule.action).toBe(rule6Raw.action);
            expect(rule.protocol_match_excepted).toBe(rule6Raw.protocol_match_excepted);
            expect(rule.logging).toBe(rule6Raw.logging);
            expect(rule.state_new).toBe(rule6Raw.state_new);
            expect(rule.state_established).toBe(rule6Raw.state_established);
            expect(rule.state_invalid).toBe(rule6Raw.state_invalid);
            expect(rule.state_related).toBe(rule6Raw.state_related);
            expect(rule.ipsec).toBe(rule6Raw.ipsec);
            expect(rule.src_firewallgroup_ids).toBe(rule6Raw.src_firewallgroup_ids);
            expect(rule.src_mac_address).toBe(rule6Raw.src_mac_address);
            expect(rule.dst_firewallgroup_ids).toBe(rule6Raw.dst_firewallgroup_ids);
            expect(rule.protocol_v6).toBe(rule6Raw.protocol_v6);
            expect(rule.icmpv6_typename).toBe(rule6Raw.icmpv6_typename);
            expect(rule.site_id).toBe(rule6Raw.site_id);
            expect(rule.setting_preference).toBe(rule6Raw.setting_preference);
        });
        it('init IPv4 rule', () => {
            const rule = new FWRule({ controller, site }, rule4Raw);
            expect(rule._id).toBe(rule4Raw._id);
            expect(rule.ruleset).toBe(rule4Raw.ruleset);
            expect(rule.rule_index).toBe(rule4Raw.rule_index);
            expect(rule.name).toBe(rule4Raw.name);
            expect(rule.enabled).toBe(rule4Raw.enabled);
            expect(rule.action).toBe(rule4Raw.action);
            expect(rule.protocol_match_excepted).toBe(rule4Raw.protocol_match_excepted);
            expect(rule.logging).toBe(rule4Raw.logging);
            expect(rule.state_new).toBe(rule4Raw.state_new);
            expect(rule.state_established).toBe(rule4Raw.state_established);
            expect(rule.state_invalid).toBe(rule4Raw.state_invalid);
            expect(rule.state_related).toBe(rule4Raw.state_related);
            expect(rule.ipsec).toBe(rule4Raw.ipsec);
            expect(rule.src_firewallgroup_ids).toBe(rule4Raw.src_firewallgroup_ids);
            expect(rule.src_mac_address).toBe(rule4Raw.src_mac_address);
            expect(rule.dst_firewallgroup_ids).toBe(rule4Raw.dst_firewallgroup_ids);
            expect(rule.dst_address).toBe(rule4Raw.dst_address);
            expect(rule.src_address).toBe(rule4Raw.src_address);
            expect(rule.protocol).toBe(rule4Raw.protocol);
            expect(rule.icmp_typename).toBe(rule4Raw.icmp_typename);
            expect(rule.src_networkconf_id).toBe(rule4Raw.src_networkconf_id);
            expect(rule.src_networkconf_type).toBe(rule4Raw.src_networkconf_type);
            expect(rule.dst_networkconf_id).toBe(rule4Raw.dst_networkconf_id);
            expect(rule.dst_networkconf_type).toBe(rule4Raw.dst_networkconf_type);
            expect(rule.site_id).toBe(rule4Raw.site_id);
            expect(rule.setting_preference).toBe(rule4Raw.setting_preference);
            expect(rule.dst_port).toBe(rule4Raw.dst_port);
        });
        it('should need an _id', () => {
            expect.assertions(3);
            try {
                // @ts-ignore
                new FWRule({ controller, site }, {});
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect((e as ClientError).message).toBe('_id is needed');
                expect((e as ClientError).errorCode).toBe(EErrorsCodes.UNKNOWN_ERROR);
            }
        });
    });

    describe('functions', () => {
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        let rule: FWRule;
        beforeEach(() => {
            (mockedAxios as unknown as jest.Mock).mockClear();
            rule = new FWRule({ controller, site }, rule4Raw);
        });
        describe('save', () => {
            beforeEach(() => {
                mockedAxios.put.mockReset();
            });
            it('should works', async () => {
                mockedAxios.put.mockImplementationOnce(() => Promise.resolve({ data: {} }));

                await rule.save();

                expect(mockedAxios.put).toHaveBeenCalledWith(
                    `/rest/firewallrule/:id`,
                    { ...rule4Raw },
                    {
                        urlParams: expect.objectContaining({
                            id: rule._id
                        })
                    }
                );
            });
        });
        describe('delete', () => {
            beforeEach(() => {
                mockedAxios.delete.mockReset();
            });
            it('should works', async () => {
                mockedAxios.delete.mockImplementationOnce(() => Promise.resolve({ data: {} }));

                await rule.delete();

                expect(mockedAxios.delete).toHaveBeenCalledWith(`/rest/firewallrule/:id`, {
                    urlParams: expect.objectContaining({
                        id: rule._id
                    })
                });
            });
        });
    });
});
