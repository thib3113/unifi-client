import { IFWRuleBaseRaw } from './IFWRuleBaseRaw';
import { icmpTypeV6, protocolV6 } from './types';

export interface IFWV6RuleRaw extends IFWRuleBaseRaw {
    //uniq
    protocol_v6: protocolV6;
    icmpv6_typename: icmpTypeV6;
}
