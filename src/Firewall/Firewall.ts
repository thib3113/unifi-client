import { AxiosInstance } from 'axios';
import { IFWRule, IFWGroup } from '../interfaces';
import _ObjectSubSite from '../commons/_ObjectSubSite';
import { GroupPlugin } from 'typedoc/dist/lib/converter/plugins';
import FWGroup from './FWGroup';

export default class Firewall extends _ObjectSubSite {
    public async createRule(group: Omit<IFWRule, '_id' | 'site_id'>): Promise<IFWRule> {
        //return an array of groups created, but seems to allow only one group to be created ?
        return (
            (
                await this.instance.post('/api/s/:site/rest/firewallrule/', group, {
                    urlParams: { site: this.site.name }
                })
            ).data?.data || []
        ).pop();
    }

    public async editRule(group: Partial<Omit<IFWRule, 'site_id'>> & { _id: string }): Promise<void> {
        return (
            await this.instance.put('/api/s/:site/rest/firewallrule/:id', group, {
                urlParams: { site: this.site.name, id: group._id }
            })
        ).data?.data;
    }

    public async deleteFirewallRule(groupId: string): Promise<void> {
        await this.instance.delete('/api/s/:site/rest/firewallrule/:id', {
            urlParams: { site: this.site.name, id: groupId }
        });
    }

    public async getRule(id: string): Promise<IFWRule> {
        return (
            (
                await this.instance.get('/api/s/:site/rest/firewallrule/:id', {
                    urlParams: { site: this.site.name, id }
                })
            ).data?.data || []
        ).pop();
    }

    public async getRules(): Promise<Array<IFWRule>> {
        return (await this.instance.get('/api/s/:site/rest/firewallrule', { urlParams: { site: this.site.name } })).data?.data;
    }

    public async getGroup(id: string): Promise<IFWGroup> {
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

    public async getGroups(): Promise<Array<IFWGroup>> {
        return (
            (await this.instance.get('/api/s/:site/rest/firewallgroup/', { urlParams: { site: this.site.name } })).data?.data || []
        ).map((g) => this.mapObject<FWGroup>(FWGroup, g));
    }

    public async createGroup(group: Omit<IFWGroup, '_id' | 'site_id'>): Promise<IFWGroup> {
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

    public async editGroup(group: Partial<Omit<IFWGroup, 'site_id'>> & { _id: string }): Promise<void> {
        return (
            await this.instance.put('/api/s/:site/rest/firewallgroup/:id', group, {
                urlParams: { site: this.site.name, id: group._id }
            })
        ).data?.data;
    }

    public async deleteFirewallGroup(groupId: string): Promise<void> {
        await this.instance.delete('/api/s/:site/rest/firewallgroup/:id', {
            urlParams: { site: this.site.name, id: groupId }
        });
    }
}
