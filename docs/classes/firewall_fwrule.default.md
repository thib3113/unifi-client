[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Firewall/FWRule](../modules/firewall_fwrule.md) / default

# Class: default

[Firewall/FWRule](../modules/firewall_fwrule.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Implements

* [*IFWRule*](../interfaces/interfaces.ifwrule.md)

## Table of contents

### Constructors

- [constructor](firewall_fwrule.default.md#constructor)

### Properties

- [\_id](firewall_fwrule.default.md#_id)
- [action](firewall_fwrule.default.md#action)
- [dst\_address](firewall_fwrule.default.md#dst_address)
- [dst\_firewallgroup\_ids](firewall_fwrule.default.md#dst_firewallgroup_ids)
- [dst\_networkconf\_id](firewall_fwrule.default.md#dst_networkconf_id)
- [dst\_networkconf\_type](firewall_fwrule.default.md#dst_networkconf_type)
- [enabled](firewall_fwrule.default.md#enabled)
- [icmp\_typename](firewall_fwrule.default.md#icmp_typename)
- [ipsec](firewall_fwrule.default.md#ipsec)
- [logging](firewall_fwrule.default.md#logging)
- [name](firewall_fwrule.default.md#name)
- [protocol](firewall_fwrule.default.md#protocol)
- [protocol\_match\_excepted](firewall_fwrule.default.md#protocol_match_excepted)
- [rule\_index](firewall_fwrule.default.md#rule_index)
- [ruleset](firewall_fwrule.default.md#ruleset)
- [site\_id](firewall_fwrule.default.md#site_id)
- [src\_address](firewall_fwrule.default.md#src_address)
- [src\_firewallgroup\_ids](firewall_fwrule.default.md#src_firewallgroup_ids)
- [src\_mac\_address](firewall_fwrule.default.md#src_mac_address)
- [src\_networkconf\_id](firewall_fwrule.default.md#src_networkconf_id)
- [src\_networkconf\_type](firewall_fwrule.default.md#src_networkconf_type)
- [state\_established](firewall_fwrule.default.md#state_established)
- [state\_invalid](firewall_fwrule.default.md#state_invalid)
- [state\_new](firewall_fwrule.default.md#state_new)
- [state\_related](firewall_fwrule.default.md#state_related)

### Accessors

- [config](firewall_fwrule.default.md#config)
- [controller](firewall_fwrule.default.md#controller)
- [instance](firewall_fwrule.default.md#instance)
- [privateMap](firewall_fwrule.default.md#privatemap)
- [site](firewall_fwrule.default.md#site)

### Methods

- [checkNeeds](firewall_fwrule.default.md#checkneeds)
- [delete](firewall_fwrule.default.md#delete)
- [getController](firewall_fwrule.default.md#getcontroller)
- [getPrivate](firewall_fwrule.default.md#getprivate)
- [getinstance](firewall_fwrule.default.md#getinstance)
- [import](firewall_fwrule.default.md#import)
- [mapObject](firewall_fwrule.default.md#mapobject)
- [needVersion](firewall_fwrule.default.md#needversion)
- [save](firewall_fwrule.default.md#save)
- [setPrivate](firewall_fwrule.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: [*IFWRule*](../interfaces/interfaces.ifwrule.md)): [*default*](firewall_fwrule.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |
`props` | [*IFWRule*](../interfaces/interfaces.ifwrule.md) |

**Returns:** [*default*](firewall_fwrule.default.md)

Overrides: [default](commons__objectsubsite.default.md)

Defined in: [Firewall/FWRule.ts:111](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L111)

## Properties

### \_id

• **\_id**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[_id](../interfaces/interfaces.ifwrule.md#_id)

Defined in: [Firewall/FWRule.ts:7](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L7)

___

### action

• **action**: [*FWRuleActions*](../modules/interfaces.md#fwruleactions)

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[action](../interfaces/interfaces.ifwrule.md#action)

Defined in: [Firewall/FWRule.ts:8](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L8)

___

### dst\_address

• **dst\_address**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[dst_address](../interfaces/interfaces.ifwrule.md#dst_address)

Defined in: [Firewall/FWRule.ts:9](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L9)

___

### dst\_firewallgroup\_ids

• **dst\_firewallgroup\_ids**: *string*[]

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[dst_firewallgroup_ids](../interfaces/interfaces.ifwrule.md#dst_firewallgroup_ids)

Defined in: [Firewall/FWRule.ts:10](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L10)

___

### dst\_networkconf\_id

• **dst\_networkconf\_id**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[dst_networkconf_id](../interfaces/interfaces.ifwrule.md#dst_networkconf_id)

Defined in: [Firewall/FWRule.ts:11](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L11)

___

### dst\_networkconf\_type

• **dst\_networkconf\_type**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[dst_networkconf_type](../interfaces/interfaces.ifwrule.md#dst_networkconf_type)

Defined in: [Firewall/FWRule.ts:12](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L12)

___

### enabled

• **enabled**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[enabled](../interfaces/interfaces.ifwrule.md#enabled)

Defined in: [Firewall/FWRule.ts:13](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L13)

___

### icmp\_typename

• **icmp\_typename**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[icmp_typename](../interfaces/interfaces.ifwrule.md#icmp_typename)

Defined in: [Firewall/FWRule.ts:14](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L14)

___

### ipsec

• **ipsec**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[ipsec](../interfaces/interfaces.ifwrule.md#ipsec)

Defined in: [Firewall/FWRule.ts:15](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L15)

___

### logging

• **logging**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[logging](../interfaces/interfaces.ifwrule.md#logging)

Defined in: [Firewall/FWRule.ts:16](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L16)

___

### name

• **name**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[name](../interfaces/interfaces.ifwrule.md#name)

Defined in: [Firewall/FWRule.ts:17](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L17)

___

### protocol

• **protocol**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[protocol](../interfaces/interfaces.ifwrule.md#protocol)

Defined in: [Firewall/FWRule.ts:18](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L18)

___

### protocol\_match\_excepted

• **protocol\_match\_excepted**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[protocol_match_excepted](../interfaces/interfaces.ifwrule.md#protocol_match_excepted)

Defined in: [Firewall/FWRule.ts:19](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L19)

___

### rule\_index

• **rule\_index**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[rule_index](../interfaces/interfaces.ifwrule.md#rule_index)

Defined in: [Firewall/FWRule.ts:20](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L20)

___

### ruleset

• **ruleset**: [*ruleSet*](../modules/interfaces.md#ruleset)

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[ruleset](../interfaces/interfaces.ifwrule.md#ruleset)

Defined in: [Firewall/FWRule.ts:21](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L21)

___

### site\_id

• **site\_id**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[site_id](../interfaces/interfaces.ifwrule.md#site_id)

Defined in: [Firewall/FWRule.ts:22](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L22)

___

### src\_address

• **src\_address**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[src_address](../interfaces/interfaces.ifwrule.md#src_address)

Defined in: [Firewall/FWRule.ts:23](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L23)

___

### src\_firewallgroup\_ids

• **src\_firewallgroup\_ids**: *string*[]

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[src_firewallgroup_ids](../interfaces/interfaces.ifwrule.md#src_firewallgroup_ids)

Defined in: [Firewall/FWRule.ts:24](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L24)

___

### src\_mac\_address

• **src\_mac\_address**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[src_mac_address](../interfaces/interfaces.ifwrule.md#src_mac_address)

Defined in: [Firewall/FWRule.ts:25](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L25)

___

### src\_networkconf\_id

• **src\_networkconf\_id**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[src_networkconf_id](../interfaces/interfaces.ifwrule.md#src_networkconf_id)

Defined in: [Firewall/FWRule.ts:26](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L26)

___

### src\_networkconf\_type

• **src\_networkconf\_type**: *string*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[src_networkconf_type](../interfaces/interfaces.ifwrule.md#src_networkconf_type)

Defined in: [Firewall/FWRule.ts:27](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L27)

___

### state\_established

• **state\_established**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[state_established](../interfaces/interfaces.ifwrule.md#state_established)

Defined in: [Firewall/FWRule.ts:28](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L28)

___

### state\_invalid

• **state\_invalid**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[state_invalid](../interfaces/interfaces.ifwrule.md#state_invalid)

Defined in: [Firewall/FWRule.ts:29](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L29)

___

### state\_new

• **state\_new**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[state_new](../interfaces/interfaces.ifwrule.md#state_new)

Defined in: [Firewall/FWRule.ts:30](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L30)

___

### state\_related

• **state\_related**: *boolean*

Implementation of: [IFWRule](../interfaces/interfaces.ifwrule.md).[state_related](../interfaces/interfaces.ifwrule.md#state_related)

Defined in: [Firewall/FWRule.ts:31](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L31)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

**Returns:** [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

Defined in: [commons/_ObjectSubSite.ts:15](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubSite.ts#L15)

• `Protected`set **config**(`value`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:19](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubSite.ts#L19)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubController.ts:30](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L30)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:34](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L34)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubController.ts:23](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L23)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:27](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L27)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubController.ts:37](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L37)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:41](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L41)

## Methods

### checkNeeds

▸ `Protected`**checkNeeds**(`minVersion?`: *string*, `unifiOs?`: *boolean*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`minVersion?` | *string* |
`unifiOs?` | *boolean* |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:70](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L70)

___

### delete

▸ **delete**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Firewall/FWRule.ts:132](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L132)

___

### getController

▸ **getController**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:55](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L55)

___

### getPrivate

▸ `Protected`**getPrivate**<T\>(`key`: *string*): T

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** T

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getinstance

▸ **getinstance**(): AxiosInstance

**Returns:** AxiosInstance

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:52](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L52)

___

### import

▸ `Protected`**import**(`props`: [*IFWRule*](../interfaces/interfaces.ifwrule.md)): [*default*](firewall_fwrule.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IFWRule*](../interfaces/interfaces.ifwrule.md) |

**Returns:** [*default*](firewall_fwrule.default.md)

Overrides: [default](commons__objectsubsite.default.md)

Defined in: [Firewall/FWRule.ts:33](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L33)

___

### mapObject

▸ `Protected`**mapObject**<U\>(`constructor`: (`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: *any*) => U, `object`: *any*): U

#### Type parameters:

Name | Type |
:------ | :------ |
`U` | [*default*](commons__objectsubsite.default.md)<U\> |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`constructor` | (`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: *any*) => U | the construtor to map the object   |
`object` | *any* | the properties passed to the constructor if defined    |

**Returns:** U

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:43](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubSite.ts#L43)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](firewall_fwrule.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](firewall_fwrule.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:85](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L85)

___

### save

▸ **save**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Firewall/FWRule.ts:123](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Firewall/FWRule.ts#L123)

___

### setPrivate

▸ `Protected`**setPrivate**<T\>(`key`: *string*, `value`: T): *void*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |
`value` | T |

**Returns:** *void*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/ObjectWithPrivateValues.ts#L11)
