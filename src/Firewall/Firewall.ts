import { IFWRule, IFWGroup } from '../interfaces';
import _ObjectSubSite from '../commons/_ObjectSubSite';
import FWGroup from './FWGroup';
import FWRule from './FWRule';

export default class Firewall extends _ObjectSubSite {
    public async createRule(group: Omit<IFWRule, '_id' | 'site_id'>): Promise<FWRule> {
        //return an array of groups created, but seems to allow only one group to be created ?
        return this.mapObject<FWRule>(
            FWRule,
            (
                (
                    await this.instance.post('/api/s/:site/rest/firewallrule/', group, {
                        urlParams: { site: this.site.name }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    // public async editRule(group: Partial<Omit<IFWRule, 'site_id'>> & { _id: string }): Promise<void> {
    //     return (
    //         await this.instance.put('/api/s/:site/rest/firewallrule/:id', group, {
    //             urlParams: { site: this.site.name, id: group._id }
    //         })
    //     ).data?.data;
    // }
    //
    // public async deleteFirewallRule(groupId: string): Promise<void> {
    //     await this.instance.delete('/api/s/:site/rest/firewallrule/:id', {
    //         urlParams: { site: this.site.name, id: groupId }
    //     });
    // }

    public async getRule(id: string): Promise<FWRule> {
        return this.mapObject<FWRule>(
            FWRule,
            (
                (
                    await this.instance.get('/api/s/:site/rest/firewallrule/:id', {
                        urlParams: { site: this.site.name, id }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async getRules(): Promise<Array<FWRule>> {
        return (
            (await this.instance.get('/api/s/:site/rest/firewallrule', { urlParams: { site: this.site.name } })).data?.data || []
        ).map((r) => this.mapObject<FWRule>(FWRule, r));
    }

    public async getGroup(id: string): Promise<FWGroup> {
        return this.mapObject<FWGroup>(
            FWGroup,
            (
                (
                    await this.instance.get('/api/s/:site/rest/firewallgroup/:id', {
                        urlParams: { site: this.site.name, id }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    public async getGroups(): Promise<Array<FWGroup>> {
        return (
            (await this.instance.get('/api/s/:site/rest/firewallgroup/', { urlParams: { site: this.site.name } })).data?.data || []
        ).map((g) => this.mapObject<FWGroup>(FWGroup, g));
    }

    public async createGroup(group: Omit<IFWGroup, '_id' | 'site_id'>): Promise<FWGroup> {
        //return an array of groups created, but seems to allow only one group to be created ?
        return this.mapObject<FWGroup>(
            FWGroup,
            (
                (
                    await this.instance.post('/api/s/:site/rest/firewallgroup/', group, {
                        urlParams: { site: this.site.name }
                    })
                ).data?.data || []
            ).pop()
        );
    }

    // public async editGroup(group: Partial<Omit<IFWGroup, 'site_id'>> & { _id: string }): Promise<void> {
    //     return (
    //         await this.instance.put('/api/s/:site/rest/firewallgroup/:id', group, {
    //             urlParams: { site: this.site.name, id: group._id }
    //         })
    //     ).data?.data;
    // }
    //
    // public async deleteFirewallGroup(groupId: string): Promise<void> {
    //     await this.instance.delete('/api/s/:site/rest/firewallgroup/:id', {
    //         urlParams: { site: this.site.name, id: groupId }
    //     });
    // }
}
