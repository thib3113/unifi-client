import { FWRuleActions, ruleSet } from './types';

export interface IFWRuleBaseRaw {
    _id: string;
    ruleset: ruleSet;
    rule_index: string | number;
    name: string;
    enabled: boolean;
    action: FWRuleActions;
    protocol_match_excepted: boolean;
    logging: boolean;
    state_new: boolean;
    state_established: boolean;
    state_invalid: boolean;
    state_related: boolean;
    ipsec: string;
    src_firewallgroup_ids: Array<string>;
    src_mac_address: string;
    dst_firewallgroup_ids: Array<string>;
    site_id: string;
    // from network > 7.0.0
    setting_preference?: string;
    dst_port?: string;
}
