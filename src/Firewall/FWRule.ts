import _ObjectSubSite, { IObjectSubSiteConfig } from '../commons/_ObjectSubSite';
import { FWRuleActions, IFWRule, networkConfType, ruleSet } from '../interfaces';
import { ClientError, EErrorsCodes } from '../Errors';
import Validate from '../commons/Validate';

export default class FWRule extends _ObjectSubSite implements IFWRule {
    _id: string;
    action: FWRuleActions;
    dst_address: string;
    dst_firewallgroup_ids: Array<string>;
    dst_networkconf_id: string;
    dst_networkconf_type: networkConfType;
    enabled: boolean;
    icmp_typename: string;
    ipsec: string;
    logging: boolean;
    name: string;
    protocol: 'all' | string;
    protocol_match_excepted: boolean;
    rule_index: string;
    ruleset: ruleSet;
    site_id: string;
    src_address: string;
    src_firewallgroup_ids: Array<string>;
    src_mac_address: string;
    src_networkconf_id: string;
    src_networkconf_type: networkConfType;
    state_established: boolean;
    state_invalid: boolean;
    state_new: boolean;
    state_related: boolean;

    protected import(props: IFWRule): this {
        if (!Validate.isUndefined(props._id)) {
            this._id = props._id;
        }
        if (!Validate.isUndefined(props.action)) {
            this.action = props.action;
        }
        if (!Validate.isUndefined(props.dst_address)) {
            this.dst_address = props.dst_address;
        }
        if (!Validate.isUndefined(props.dst_firewallgroup_ids)) {
            this.dst_firewallgroup_ids = props.dst_firewallgroup_ids;
        }
        if (!Validate.isUndefined(props.dst_networkconf_id)) {
            this.dst_networkconf_id = props.dst_networkconf_id;
        }
        if (!Validate.isUndefined(props.dst_networkconf_type)) {
            this.dst_networkconf_type = props.dst_networkconf_type;
        }
        if (!Validate.isUndefined(props.enabled)) {
            this.enabled = props.enabled;
        }
        if (!Validate.isUndefined(props.icmp_typename)) {
            this.icmp_typename = props.icmp_typename;
        }
        if (!Validate.isUndefined(props.ipsec)) {
            this.ipsec = props.ipsec;
        }
        if (!Validate.isUndefined(props.logging)) {
            this.logging = props.logging;
        }
        if (!Validate.isUndefined(props.name)) {
            this.name = props.name;
        }
        if (!Validate.isUndefined(props.protocol)) {
            this.protocol = props.protocol;
        }
        if (!Validate.isUndefined(props.protocol_match_excepted)) {
            this.protocol_match_excepted = props.protocol_match_excepted;
        }
        if (!Validate.isUndefined(props.rule_index)) {
            this.rule_index = props.rule_index;
        }
        if (!Validate.isUndefined(props.ruleset)) {
            this.ruleset = props.ruleset;
        }
        if (!Validate.isUndefined(props.site_id)) {
            this.site_id = props.site_id;
        }
        if (!Validate.isUndefined(props.src_address)) {
            this.src_address = props.src_address;
        }
        if (!Validate.isUndefined(props.src_firewallgroup_ids)) {
            this.src_firewallgroup_ids = props.src_firewallgroup_ids;
        }
        if (!Validate.isUndefined(props.src_mac_address)) {
            this.src_mac_address = props.src_mac_address;
        }
        if (!Validate.isUndefined(props.src_networkconf_id)) {
            this.src_networkconf_id = props.src_networkconf_id;
        }
        if (!Validate.isUndefined(props.src_networkconf_type)) {
            this.src_networkconf_type = props.src_networkconf_type;
        }
        if (!Validate.isUndefined(props.state_established)) {
            this.state_established = props.state_established;
        }
        if (!Validate.isUndefined(props.state_invalid)) {
            this.state_invalid = props.state_invalid;
        }
        if (!Validate.isUndefined(props.state_new)) {
            this.state_new = props.state_new;
        }
        if (!Validate.isUndefined(props.state_related)) {
            this.state_related = props.state_related;
        }

        return this;
    }

    constructor(config: IObjectSubSiteConfig, props: IFWRule) {
        super(config);

        this._id = props._id;
        if (!this._id) {
            throw new ClientError('_id is needed', EErrorsCodes.UNKNOWN_ERROR);
        }
        this.import(props);
    }

    public async save(): Promise<void> {
        const rule: IFWRule = { ...this };
        return (
            await this.instance.put('/rest/firewallrule/:id', rule, {
                urlParams: { site: this.site.name, id: this._id }
            })
        ).data?.data;
    }

    public async delete(): Promise<void> {
        await this.instance.delete('/rest/firewallrule/:id', {
            urlParams: { site: this.site.name, id: this._id }
        });
    }
}
