import { IFWGroup, IFWRule } from '../../src';
import { deleteFixtures, getLoggedSite, isRecordMode } from '../common';
import nock from 'nock';
import Site from '../../src/Sites/Site';

const PREFIX = 'firewall-';
// beforeAll(() => {
//     if (isRecordMode()) {
//         deleteFixtures(PREFIX);
//     }
// });

describe('Firewall - UnifiOs', () => {
    let site: Site;
    beforeEach(async () => {
        site = await getLoggedSite(nock);
    });
    describe('Rules', () => {
        it('should return the firewall rules', async () => {
            await nock.back(`${PREFIX}get-rules.json`).then(async ({ nockDone }) => {
                const [rule] = await site.firewall.getRules();

                expect(rule._id).toBe('60493eb9c3d8180433ef200d');
                expect(rule.ruleset).toBe('WAN_IN');
                expect(rule.rule_index).toBe(2000);
                expect(rule.name).toBe('Blocked Group');
                expect(rule.enabled).toBe(true);
                expect(rule.action).toBe('drop');
                expect(rule.protocol_match_excepted).toBe(false);
                expect(rule.logging).toBe(true);
                expect(rule.state_new).toBe(false);
                expect(rule.state_established).toBe(false);
                expect(rule.state_invalid).toBe(false);
                expect(rule.state_related).toBe(false);
                expect(rule.ipsec).toBe('');
                expect(rule.src_firewallgroup_ids).toStrictEqual(['604bcb9ec3d81805b5f30d82']);
                expect(rule.src_mac_address).toBe('');
                expect(rule.dst_firewallgroup_ids).toStrictEqual([]);
                expect(rule.dst_address).toBe('');
                expect(rule.src_address).toBe('');
                expect(rule.protocol).toBe('all');
                expect(rule.icmp_typename).toBe('');
                expect(rule.src_networkconf_id).toBe('');
                expect(rule.src_networkconf_type).toBe('NETv4');
                expect(rule.dst_networkconf_id).toBe('');
                expect(rule.dst_networkconf_type).toBe('NETv4');
                expect(rule.site_id).toBe('6001f8a73fd98c05e9465f91');

                nockDone();
            });
        });

        it('should crud firewall rule', async () => {
            let rule: IFWRule;
            let rule2: IFWRule;
            const ruleParams: Omit<IFWRule, '_id' | 'site_id'> & Partial<{ _id: string; site_id: string }> = {
                action: 'accept',
                enabled: true,
                dst_address: '',
                dst_firewallgroup_ids: [],
                dst_networkconf_type: 'NETv4',
                icmp_typename: '',
                ipsec: '',
                logging: false,
                name: 'test',
                protocol: 'all',
                protocol_match_excepted: false,
                ruleset: 'WAN_IN',
                src_firewallgroup_ids: [],
                src_address: '51.254.200.228',
                src_mac_address: '',
                src_networkconf_type: 'NETv4',
                state_established: false,
                state_invalid: false,
                state_new: false,
                state_related: false,
                dst_networkconf_id: '',
                src_networkconf_id: '',
                rule_index: '4090'
            };
            await nock.back(`${PREFIX}rule-create.json`).then(async ({ nockDone }) => {
                rule = await site.firewall.createRule(ruleParams);

                expect(rule.name).toBe(ruleParams.name);

                nockDone();
            });

            await nock.back(`${PREFIX}rule-get.json`).then(async ({ nockDone }) => {
                const getRule = await site.firewall.getRule(rule._id);

                expect(getRule.name).toBe(rule.name);
                expect(getRule.site_id).toBe(rule.site_id);
                expect(getRule._id).toBe(rule._id);
                nockDone();
            });

            await nock.back(`${PREFIX}rule-edit.json`).then(async ({ nockDone }) => {
                await site.firewall.editRule({
                    ...rule,
                    name: 'testRule2'
                });

                rule2 = await site.firewall.getRule(rule._id);

                expect(rule2.name).toBe('testRule2');
                expect(rule2.site_id).toBe(rule.site_id);
                expect(rule2._id).toBe(rule._id);
                nockDone();
            });

            await nock.back(`${PREFIX}rule-delete.json`).then(async ({ nockDone }) => {
                await site.firewall.deleteFirewallRule(rule._id);

                const getGroup = await site.firewall.getGroup(rule._id);
                expect(getGroup).not.toBeDefined();
                nockDone();
            });
        });
    });
    describe('Groups', () => {
        it('should crud the group', async () => {
            let group: IFWGroup;
            let group2: IFWGroup;
            await nock.back(`${PREFIX}groups-create-ipv6.json`).then(async ({ nockDone }) => {
                group = await site.firewall.createGroup({
                    name: 'testGroup',
                    group_members: ['2001:41d0:302:2100::9ee'], // wikipedia ipv6
                    group_type: 'ipv6-address-group'
                });

                expect(group.name).toBe('testGroup');
                expect(group.group_members).toStrictEqual(['2001:41d0:302:2100::9ee']);
                expect(group.group_type).toBe('ipv6-address-group');

                nockDone();
            });

            await nock.back(`${PREFIX}groups-get-ipv6.json`).then(async ({ nockDone }) => {
                const getGroup = await site.firewall.getGroup(group._id);

                expect(getGroup.name).toBe(group.name);
                expect(getGroup.group_members).toStrictEqual(group.group_members);
                expect(getGroup.group_type).toBe(group.group_type);
                expect(getGroup.site_id).toBe(group.site_id);
                expect(getGroup._id).toBe(group._id);

                //test getGroups same time
                const getGroups = await site.firewall.getGroups();
                const groupFiltered = getGroups.find((g) => g._id === group._id);
                expect(groupFiltered).toBeDefined();
                expect(groupFiltered.name).toBe(group.name);
                expect(groupFiltered.group_members).toStrictEqual(group.group_members);
                expect(groupFiltered.group_type).toBe(group.group_type);
                expect(groupFiltered.site_id).toBe(group.site_id);
                expect(groupFiltered._id).toBe(group._id);
                nockDone();
            });

            await nock.back(`${PREFIX}groups-edit-ipv6.json`).then(async ({ nockDone }) => {
                await site.firewall.editGroup({
                    ...group,
                    name: 'testGroup2'
                });

                group2 = await site.firewall.getGroup(group._id);

                expect(group2.name).toBe('testGroup2');
                expect(group2.group_members).toStrictEqual(['2001:41d0:302:2100::9ee']);
                expect(group2.group_type).toBe('ipv6-address-group');
                expect(group2.site_id).toBe(group.site_id);
                expect(group2._id).toBe(group._id);
                nockDone();
            });

            await nock.back(`${PREFIX}groups-delete-ipv6.json`).then(async ({ nockDone }) => {
                await site.firewall.deleteFirewallGroup(group._id);

                const getGroup = await site.firewall.getGroup(group._id);
                expect(getGroup).not.toBeDefined();
                nockDone();
            });
        });
    });
});
describe('Firewall - non UnifiOs', () => {
    let site: Site;
    beforeEach(async () => {
        site = await getLoggedSite(nock, false);
    });
    describe('Rules', () => {
        it('should crud firewall rule', async () => {
            let rule: IFWRule;
            let rule2: IFWRule;
            const ruleParams: Omit<IFWRule, '_id' | 'site_id'> & Partial<{ _id: string; site_id: string }> = {
                action: 'accept',
                enabled: true,
                dst_address: '',
                dst_firewallgroup_ids: [],
                dst_networkconf_type: 'NETv4',
                icmp_typename: '',
                ipsec: '',
                logging: false,
                name: 'test',
                protocol: 'all',
                protocol_match_excepted: false,
                ruleset: 'WAN_IN',
                src_firewallgroup_ids: [],
                src_address: '51.254.200.228',
                src_mac_address: '',
                src_networkconf_type: 'NETv4',
                state_established: false,
                state_invalid: false,
                state_new: false,
                state_related: false,
                dst_networkconf_id: '',
                src_networkconf_id: '',
                rule_index: '4090'
            };
            rule = await site.firewall.createRule(ruleParams);

            expect(rule.name).toBe(ruleParams.name);

            //getrule
            const getRule = await site.firewall.getRule(rule._id);

            expect(getRule.name).toBe(rule.name);
            expect(getRule.site_id).toBe(rule.site_id);
            expect(getRule._id).toBe(rule._id);

            //edit rule
            await site.firewall.editRule({
                ...rule,
                name: 'testRule2'
            });

            rule2 = await site.firewall.getRule(rule._id);

            expect(rule2.name).toBe('testRule2');
            expect(rule2.site_id).toBe(rule.site_id);
            expect(rule2._id).toBe(rule._id);

            //delete the rule
            await site.firewall.deleteFirewallRule(rule._id);

            const getGroup = await site.firewall.getGroup(rule._id);
            expect(getGroup).not.toBeDefined();
        });
    });
    describe('Groups', () => {
        it('should crud the group', async () => {
            let group: IFWGroup;
            let group2: IFWGroup;
            group = await site.firewall.createGroup({
                name: 'testGroup',
                group_members: ['2001:41d0:302:2100::9ee'], // wikipedia ipv6
                group_type: 'ipv6-address-group'
            });

            expect(group.name).toBe('testGroup');
            expect(group.group_members).toStrictEqual(['2001:41d0:302:2100::9ee']);
            expect(group.group_type).toBe('ipv6-address-group');

            const getGroup = await site.firewall.getGroup(group._id);

            expect(getGroup.name).toBe(group.name);
            expect(getGroup.group_members).toStrictEqual(group.group_members);
            expect(getGroup.group_type).toBe(group.group_type);
            expect(getGroup.site_id).toBe(group.site_id);
            expect(getGroup._id).toBe(group._id);

            //test getGroups same time
            const getGroups = await site.firewall.getGroups();
            const groupFiltered = getGroups.find((g) => g._id === group._id);
            expect(groupFiltered).toBeDefined();
            expect(groupFiltered.name).toBe(group.name);
            expect(groupFiltered.group_members).toStrictEqual(group.group_members);
            expect(groupFiltered.group_type).toBe(group.group_type);
            expect(groupFiltered.site_id).toBe(group.site_id);
            expect(groupFiltered._id).toBe(group._id);

            await site.firewall.editGroup({
                ...group,
                name: 'testGroup2'
            });

            group2 = await site.firewall.getGroup(group._id);

            expect(group2.name).toBe('testGroup2');
            expect(group2.group_members).toStrictEqual(['2001:41d0:302:2100::9ee']);
            expect(group2.group_type).toBe('ipv6-address-group');
            expect(group2.site_id).toBe(group.site_id);
            expect(group2._id).toBe(group._id);

            await site.firewall.deleteFirewallGroup(group._id);

            const getDeletedGroup = await site.firewall.getGroup(group._id);
            expect(getDeletedGroup).not.toBeDefined();
        });

        it('should get groups', () => {});
    });
});
