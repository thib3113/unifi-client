export * from './Firewall';
type networkConfType = 'NETv4' | 'ADDRv4' | string;

export interface IFWRule {
    _id: string;
    ruleset:
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
    rule_index: string;
    name: string;
    enabled: boolean;
    action: 'drop' | 'accept' | 'reject';
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
// interface interfaces {
//     _id: '6053c2f6c3d8180463a410be';
//     action: 'accept';
//     enabled: true;
//     dst_address: '';
//     dst_firewallgroup_ids: [];
//     dst_networkconf_type: 'NETv4';
//     icmp_typename: '';
//     ipsec: '';
//     logging: false;
//     name: 'test';
//     protocol: 'all';
//     protocol_match_excepted: false;
//     ruleset: 'WAN_IN';
//     src_firewallgroup_ids: [];
//     src_address: '51.254.200.228';
//     src_mac_address: '';
//     src_networkconf_type: 'NETv4';
//     state_established: false;
//     state_invalid: false;
//     state_new: false;
//     state_related: false;
//     dst_networkconf_id: '';
//     src_networkconf_id: '';
//     rule_index: '2001';
//     site_id: '6001f8a73fd98c05e9465f91';
// }

// <ul
//     class="options__dHxfJEu2 options-default__dHxfJEu2 options-default-dark__dHxfJEu2 optionsOpen-default__ISNDd9xL"
//     data-testid="options"
//     tabindex="-1"
//     style=""
// >
//     <li
//         id="dropdownOptions_"
//         class="option__dHxfJEu2 option-default__dHxfJEu2 option-default-dark__dHxfJEu2 optionOpen__ISNDd9xL undefined selected__dHxfJEu2 "
//         aria-selected="true"
//         role="option"
//     >
//         Before Predefined Rules
//     </li>
//     <li
//         id="dropdownOptions_"
//         class="option__dHxfJEu2 option-default__dHxfJEu2 option-default-dark__dHxfJEu2 optionOpen__ISNDd9xL undefined"
//         aria-selected="false"
//         role="option"
//     >
//         After
//     </li>
// </ul>;

export interface IFWGroup {
    _id: string;
    name: string;
    group_type: 'address-group' | 'port-group' | 'ipv6-address-group';
    group_members: Array<string>;
    site_id: string;
}
