[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / IFWRule

# Interface: IFWRule

[index](../modules/index.md).IFWRule

## Table of contents

### Properties

- [\_id](index.ifwrule.md#_id)
- [action](index.ifwrule.md#action)
- [dst\_address](index.ifwrule.md#dst_address)
- [dst\_firewallgroup\_ids](index.ifwrule.md#dst_firewallgroup_ids)
- [dst\_networkconf\_id](index.ifwrule.md#dst_networkconf_id)
- [dst\_networkconf\_type](index.ifwrule.md#dst_networkconf_type)
- [enabled](index.ifwrule.md#enabled)
- [icmp\_typename](index.ifwrule.md#icmp_typename)
- [ipsec](index.ifwrule.md#ipsec)
- [logging](index.ifwrule.md#logging)
- [name](index.ifwrule.md#name)
- [protocol](index.ifwrule.md#protocol)
- [protocol\_match\_excepted](index.ifwrule.md#protocol_match_excepted)
- [rule\_index](index.ifwrule.md#rule_index)
- [ruleset](index.ifwrule.md#ruleset)
- [site\_id](index.ifwrule.md#site_id)
- [src\_address](index.ifwrule.md#src_address)
- [src\_firewallgroup\_ids](index.ifwrule.md#src_firewallgroup_ids)
- [src\_mac\_address](index.ifwrule.md#src_mac_address)
- [src\_networkconf\_id](index.ifwrule.md#src_networkconf_id)
- [src\_networkconf\_type](index.ifwrule.md#src_networkconf_type)
- [state\_established](index.ifwrule.md#state_established)
- [state\_invalid](index.ifwrule.md#state_invalid)
- [state\_new](index.ifwrule.md#state_new)
- [state\_related](index.ifwrule.md#state_related)

## Properties

### \_id

• **\_id**: *string*

Defined in: [interfaces.ts:28](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L28)

___

### action

• **action**: [*FWRuleActions*](../modules/interfaces.md#fwruleactions)

Defined in: [interfaces.ts:33](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L33)

___

### dst\_address

• **dst\_address**: *string*

Defined in: [interfaces.ts:44](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L44)

___

### dst\_firewallgroup\_ids

• **dst\_firewallgroup\_ids**: *string*[]

Defined in: [interfaces.ts:43](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L43)

___

### dst\_networkconf\_id

• **dst\_networkconf\_id**: *string*

Defined in: [interfaces.ts:50](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L50)

___

### dst\_networkconf\_type

• **dst\_networkconf\_type**: *string*

Defined in: [interfaces.ts:51](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L51)

___

### enabled

• **enabled**: *boolean*

Defined in: [interfaces.ts:32](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L32)

___

### icmp\_typename

• **icmp\_typename**: *string*

Defined in: [interfaces.ts:47](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L47)

___

### ipsec

• **ipsec**: *string*

Defined in: [interfaces.ts:40](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L40)

___

### logging

• **logging**: *boolean*

Defined in: [interfaces.ts:35](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L35)

___

### name

• **name**: *string*

Defined in: [interfaces.ts:31](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L31)

___

### protocol

• **protocol**: *string*

Defined in: [interfaces.ts:46](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L46)

___

### protocol\_match\_excepted

• **protocol\_match\_excepted**: *boolean*

Defined in: [interfaces.ts:34](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L34)

___

### rule\_index

• **rule\_index**: *string*

Defined in: [interfaces.ts:30](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L30)

___

### ruleset

• **ruleset**: [*ruleSet*](../modules/interfaces.md#ruleset)

Defined in: [interfaces.ts:29](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L29)

___

### site\_id

• **site\_id**: *string*

Defined in: [interfaces.ts:52](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L52)

___

### src\_address

• **src\_address**: *string*

Defined in: [interfaces.ts:45](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L45)

___

### src\_firewallgroup\_ids

• **src\_firewallgroup\_ids**: *string*[]

Defined in: [interfaces.ts:41](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L41)

___

### src\_mac\_address

• **src\_mac\_address**: *string*

Defined in: [interfaces.ts:42](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L42)

___

### src\_networkconf\_id

• **src\_networkconf\_id**: *string*

Defined in: [interfaces.ts:48](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L48)

___

### src\_networkconf\_type

• **src\_networkconf\_type**: *string*

Defined in: [interfaces.ts:49](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L49)

___

### state\_established

• **state\_established**: *boolean*

Defined in: [interfaces.ts:37](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L37)

___

### state\_invalid

• **state\_invalid**: *boolean*

Defined in: [interfaces.ts:38](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L38)

___

### state\_new

• **state\_new**: *boolean*

Defined in: [interfaces.ts:36](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L36)

___

### state\_related

• **state\_related**: *boolean*

Defined in: [interfaces.ts:39](https://github.com/thib3113/unifi-client/blob/54bf19f/src/interfaces.ts#L39)
