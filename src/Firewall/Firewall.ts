import { FWGroup } from './FWGroup';
import { FWRule } from './FWRule';
import { _ObjectSubSite } from '../commons';
import { IFWRule, IFWGroup } from './Interfaces';

export class Firewall extends _ObjectSubSite {
    public async createRule(group: Omit<IFWRule, '_id' | 'site_id'>): Promise<FWRule> {
        //return an array of groups created, but seems to allow only one group to be created ?
        return this.mapObject<FWRule>(
            FWRule,
            (
                (
                    await this.instance.post('/rest/firewallrule/', group, {
                        urlParams: { site: this.site.name }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    // public async editRule(group: Partial<Omit<IFWRule, 'site_id'>> & { _id: string }): Promise<void> {
    //     return (
    //         await this.instance.put('/rest/firewallrule/:id', group, {
    //             urlParams: { site: this.site.name, id: group._id }
    //         })
    //     ).data?.data;
    // }
    //
    // public async deleteFirewallRule(groupId: string): Promise<void> {
    //     await this.instance.delete('/rest/firewallrule/:id', {
    //         urlParams: { site: this.site.name, id: groupId }
    //     });
    // }

    public async getRule(id: string): Promise<FWRule> {
        return this.mapObject<FWRule>(
            FWRule,
            (
                (
                    await this.instance.get('/rest/firewallrule/:id', {
                        urlParams: { site: this.site.name, id }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async getRules(): Promise<Array<FWRule>> {
        const res = await this.instance.get('/rest/firewallrule', { urlParams: { site: this.site.name } });
        return (res.data?.data || []).map((r) => this.mapObject<FWRule>(FWRule, r));
    }

    public async getGroup(id: string): Promise<FWGroup> {
        return this.mapObject<FWGroup>(
            FWGroup,
            (
                (
                    await this.instance.get('/rest/firewallgroup/:id', {
                        urlParams: { site: this.site.name, id }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async getGroups(): Promise<Array<FWGroup>> {
        return ((await this.instance.get('/rest/firewallgroup/', { urlParams: { site: this.site.name } })).data?.data || []).map((g) =>
            this.mapObject<FWGroup>(FWGroup, g)
        );
    }

    public async createGroup(group: Omit<IFWGroup, '_id' | 'site_id'>): Promise<FWGroup> {
        //return an array of groups created, but seems to allow only one group to be created ?
        return this.mapObject<FWGroup>(
            FWGroup,
            (
                (
                    await this.instance.post('/rest/firewallgroup/', group, {
                        urlParams: { site: this.site.name }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    // public async editGroup(group: Partial<Omit<IFWGroup, 'site_id'>> & { _id: string }): Promise<void> {
    //     return (
    //         await this.instance.put('/rest/firewallgroup/:id', group, {
    //             urlParams: { site: this.site.name, id: group._id }
    //         })
    //     ).data?.data;
    // }
    //
    // public async deleteFirewallGroup(groupId: string): Promise<void> {
    //     await this.instance.delete('/rest/firewallgroup/:id', {
    //         urlParams: { site: this.site.name, id: groupId }
    //     });
    // }
}
