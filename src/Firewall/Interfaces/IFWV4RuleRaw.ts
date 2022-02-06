import { IFWRuleBaseRaw } from './IFWRuleBaseRaw';
import { icmpTypeV4, networkConfType, protocolV4 } from './types';

export interface IFWV4RuleRaw extends IFWRuleBaseRaw {
    dst_address: string;
    src_address: string;
    protocol: protocolV4;
    icmp_typename: icmpTypeV4;
    src_networkconf_id: string;
    src_networkconf_type: networkConfType;
    dst_networkconf_id: string;
    dst_networkconf_type: networkConfType;
}
