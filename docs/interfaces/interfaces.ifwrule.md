[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [interfaces](../modules/interfaces.md) / IFWRule

# Interface: IFWRule

[interfaces](../modules/interfaces.md).IFWRule

## Table of contents

### Properties

- [\_id](interfaces.ifwrule.md#_id)
- [action](interfaces.ifwrule.md#action)
- [dst\_address](interfaces.ifwrule.md#dst_address)
- [dst\_firewallgroup\_ids](interfaces.ifwrule.md#dst_firewallgroup_ids)
- [dst\_networkconf\_id](interfaces.ifwrule.md#dst_networkconf_id)
- [dst\_networkconf\_type](interfaces.ifwrule.md#dst_networkconf_type)
- [enabled](interfaces.ifwrule.md#enabled)
- [icmp\_typename](interfaces.ifwrule.md#icmp_typename)
- [ipsec](interfaces.ifwrule.md#ipsec)
- [logging](interfaces.ifwrule.md#logging)
- [name](interfaces.ifwrule.md#name)
- [protocol](interfaces.ifwrule.md#protocol)
- [protocol\_match\_excepted](interfaces.ifwrule.md#protocol_match_excepted)
- [rule\_index](interfaces.ifwrule.md#rule_index)
- [ruleset](interfaces.ifwrule.md#ruleset)
- [site\_id](interfaces.ifwrule.md#site_id)
- [src\_address](interfaces.ifwrule.md#src_address)
- [src\_firewallgroup\_ids](interfaces.ifwrule.md#src_firewallgroup_ids)
- [src\_mac\_address](interfaces.ifwrule.md#src_mac_address)
- [src\_networkconf\_id](interfaces.ifwrule.md#src_networkconf_id)
- [src\_networkconf\_type](interfaces.ifwrule.md#src_networkconf_type)
- [state\_established](interfaces.ifwrule.md#state_established)
- [state\_invalid](interfaces.ifwrule.md#state_invalid)
- [state\_new](interfaces.ifwrule.md#state_new)
- [state\_related](interfaces.ifwrule.md#state_related)

## Properties

### \_id

• **\_id**: *string*

Defined in: [interfaces.ts:5](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L5)

___

### action

• **action**: *drop* \| *accept* \| *reject*

Defined in: [interfaces.ts:28](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L28)

___

### dst\_address

• **dst\_address**: *string*

Defined in: [interfaces.ts:39](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L39)

___

### dst\_firewallgroup\_ids

• **dst\_firewallgroup\_ids**: *string*[]

Defined in: [interfaces.ts:38](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L38)

___

### dst\_networkconf\_id

• **dst\_networkconf\_id**: *string*

Defined in: [interfaces.ts:45](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L45)

___

### dst\_networkconf\_type

• **dst\_networkconf\_type**: *string*

Defined in: [interfaces.ts:46](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L46)

___

### enabled

• **enabled**: *boolean*

Defined in: [interfaces.ts:27](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L27)

___

### icmp\_typename

• **icmp\_typename**: *string*

Defined in: [interfaces.ts:42](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L42)

___

### ipsec

• **ipsec**: *string*

Defined in: [interfaces.ts:35](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L35)

___

### logging

• **logging**: *boolean*

Defined in: [interfaces.ts:30](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L30)

___

### name

• **name**: *string*

Defined in: [interfaces.ts:26](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L26)

___

### protocol

• **protocol**: *string*

Defined in: [interfaces.ts:41](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L41)

___

### protocol\_match\_excepted

• **protocol\_match\_excepted**: *boolean*

Defined in: [interfaces.ts:29](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L29)

___

### rule\_index

• **rule\_index**: *string*

Defined in: [interfaces.ts:25](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L25)

___

### ruleset

• **ruleset**: *WAN_IN* \| *WAN_OUT* \| *WAN_LOCAL* \| *LAN_IN* \| *LAN_OUT* \| *LAN_LOCAL* \| *GUEST_IN* \| *GUEST_OUT* \| *GUEST_LOCAL* \| *WANv6_IN* \| *WANv6_OUT* \| *WANv6_LOCAL* \| *LANv6_IN* \| *LANv6_OUT* \| *LANv6_LOCAL* \| *GUESTv6_IN* \| *GUESTv6_OUT* \| *GUESTv6_LOCAL*

Defined in: [interfaces.ts:6](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L6)

___

### site\_id

• **site\_id**: *string*

Defined in: [interfaces.ts:47](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L47)

___

### src\_address

• **src\_address**: *string*

Defined in: [interfaces.ts:40](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L40)

___

### src\_firewallgroup\_ids

• **src\_firewallgroup\_ids**: *string*[]

Defined in: [interfaces.ts:36](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L36)

___

### src\_mac\_address

• **src\_mac\_address**: *string*

Defined in: [interfaces.ts:37](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L37)

___

### src\_networkconf\_id

• **src\_networkconf\_id**: *string*

Defined in: [interfaces.ts:43](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L43)

___

### src\_networkconf\_type

• **src\_networkconf\_type**: *string*

Defined in: [interfaces.ts:44](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L44)

___

### state\_established

• **state\_established**: *boolean*

Defined in: [interfaces.ts:32](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L32)

___

### state\_invalid

• **state\_invalid**: *boolean*

Defined in: [interfaces.ts:33](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L33)

___

### state\_new

• **state\_new**: *boolean*

Defined in: [interfaces.ts:31](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L31)

___

### state\_related

• **state\_related**: *boolean*

Defined in: [interfaces.ts:34](https://github.com/thib3113/unifi-client/blob/90eb43b/src/interfaces.ts#L34)
