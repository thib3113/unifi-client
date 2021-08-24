export * from './Firewall';
export type networkConfType = 'NETv4' | 'ADDRv4' | string;
export type ruleSet =
    | 'WAN_IN'
    | 'WAN_OUT'
    | 'WAN_LOCAL'
    | 'LAN_IN'
    | 'LAN_OUT'
    | 'LAN_LOCAL'
    | 'GUEST_IN'
    | 'GUEST_OUT'
    | 'GUEST_LOCAL'
    | 'WANv6_IN'
    | 'WANv6_OUT'
    | 'WANv6_LOCAL'
    | 'LANv6_IN'
    | 'LANv6_OUT'
    | 'LANv6_LOCAL'
    | 'GUESTv6_IN'
    | 'GUESTv6_OUT'
    | 'GUESTv6_LOCAL';

export type FWRuleActions = 'drop' | 'accept' | 'reject';

export type ipString = string;

export interface IFWRule {
    _id: string;
    ruleset: ruleSet;
    rule_index: string;
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
    dst_address: string;
    src_address: string;
    protocol: 'all' | string;
    icmp_typename: string;
    src_networkconf_id: string;
    src_networkconf_type: networkConfType;
    dst_networkconf_id: string;
    dst_networkconf_type: networkConfType;
    site_id: string;
}

export interface IFWGroup {
    _id: string;
    name: string;
    group_type: 'address-group' | 'port-group' | 'ipv6-address-group';
    group_members: Array<string>;
    site_id: string;
}

export enum EProxyNamespaces {
    LED = 'led',
    NETWORK = 'network',
    USERS = 'users',
    ACCESS_ULP_GO = 'access/ulp-go',
    ACCESS = 'access',
    PROTECT = 'protect',
    TALK = 'talk'
}

export type proxyNamespace = EProxyNamespaces | string | boolean;

export interface IBuildUrlParams {
    url?: string;
    /**
     * the APIVersion
     */
    apiVersion?: number;
    /**
     * the current site selected
     */
    site?: string;
    baseURL?: string;
    /**
     * the namespace of the proxy part
     * default network
     */
    proxyNamespace?: proxyNamespace;
    /**
     * add the /api in the URL ? or maybe the wss ?
     */
    apiPart?: string | boolean;
}

export interface IUnifiResponseEnveloppe<T = unknown> {
    meta: {
        rc: 'ok' | string;
    };
    data: T;
}
