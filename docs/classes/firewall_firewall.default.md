[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [Firewall/Firewall](../modules/firewall_firewall.md) / default

# Class: default

[Firewall/Firewall](../modules/firewall_firewall.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Table of contents

### Constructors

- [constructor](firewall_firewall.default.md#constructor)

### Accessors

- [config](firewall_firewall.default.md#config)
- [controller](firewall_firewall.default.md#controller)
- [instance](firewall_firewall.default.md#instance)
- [privateMap](firewall_firewall.default.md#privatemap)
- [site](firewall_firewall.default.md#site)

### Methods

- [checkNeeds](firewall_firewall.default.md#checkneeds)
- [createGroup](firewall_firewall.default.md#creategroup)
- [createRule](firewall_firewall.default.md#createrule)
- [deleteFirewallGroup](firewall_firewall.default.md#deletefirewallgroup)
- [deleteFirewallRule](firewall_firewall.default.md#deletefirewallrule)
- [editGroup](firewall_firewall.default.md#editgroup)
- [editRule](firewall_firewall.default.md#editrule)
- [getGroup](firewall_firewall.default.md#getgroup)
- [getGroups](firewall_firewall.default.md#getgroups)
- [getPrivate](firewall_firewall.default.md#getprivate)
- [getRule](firewall_firewall.default.md#getrule)
- [getRules](firewall_firewall.default.md#getrules)
- [mapObject](firewall_firewall.default.md#mapobject)
- [needVersion](firewall_firewall.default.md#needversion)
- [setPrivate](firewall_firewall.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): [*default*](firewall_firewall.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** [*default*](firewall_firewall.default.md)

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:10](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L10)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

**Returns:** [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

Defined in: [commons/_ObjectSubSite.ts:17](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L17)

• `Protected`set **config**(`value`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:21](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L21)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubSite.ts:31](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L31)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:35](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L35)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubSite.ts:24](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L24)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:28](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L28)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubSite.ts:38](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L38)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:42](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L42)

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

Defined in: [commons/_ObjectSubController.ts:63](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubController.ts#L63)

___

### createGroup

▸ **createGroup**(`group`: *Omit*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md), *_id* \| *site_id*\>): *Promise*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`group` | *Omit*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md), *_id* \| *site_id*\> |

**Returns:** *Promise*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md)\>

Defined in: [Firewall/Firewall.ts:66](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L66)

___

### createRule

▸ **createRule**(`group`: *Omit*<[*IFWRule*](../interfaces/interfaces.ifwrule.md), *_id* \| *site_id*\>): *Promise*<[*IFWRule*](../interfaces/interfaces.ifwrule.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`group` | *Omit*<[*IFWRule*](../interfaces/interfaces.ifwrule.md), *_id* \| *site_id*\> |

**Returns:** *Promise*<[*IFWRule*](../interfaces/interfaces.ifwrule.md)\>

Defined in: [Firewall/Firewall.ts:8](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L8)

___

### deleteFirewallGroup

▸ **deleteFirewallGroup**(`groupId`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`groupId` | *string* |

**Returns:** *Promise*<void\>

Defined in: [Firewall/Firewall.ts:88](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L88)

___

### deleteFirewallRule

▸ **deleteFirewallRule**(`groupId`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`groupId` | *string* |

**Returns:** *Promise*<void\>

Defined in: [Firewall/Firewall.ts:27](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L27)

___

### editGroup

▸ **editGroup**(`group`: *Partial*<Omit<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md), *site_id*\>\> & { `_id`: *string*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`group` | *Partial*<Omit<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md), *site_id*\>\> & { `_id`: *string*  } |

**Returns:** *Promise*<void\>

Defined in: [Firewall/Firewall.ts:80](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L80)

___

### editRule

▸ **editRule**(`group`: *Partial*<Omit<[*IFWRule*](../interfaces/interfaces.ifwrule.md), *site_id*\>\> & { `_id`: *string*  }): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`group` | *Partial*<Omit<[*IFWRule*](../interfaces/interfaces.ifwrule.md), *site_id*\>\> & { `_id`: *string*  } |

**Returns:** *Promise*<void\>

Defined in: [Firewall/Firewall.ts:19](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L19)

___

### getGroup

▸ **getGroup**(`id`: *string*): *Promise*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *Promise*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md)\>

Defined in: [Firewall/Firewall.ts:47](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L47)

___

### getGroups

▸ **getGroups**(): *Promise*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md)[]\>

**Returns:** *Promise*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md)[]\>

Defined in: [Firewall/Firewall.ts:60](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L60)

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getRule

▸ **getRule**(`id`: *string*): *Promise*<[*IFWRule*](../interfaces/interfaces.ifwrule.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *Promise*<[*IFWRule*](../interfaces/interfaces.ifwrule.md)\>

Defined in: [Firewall/Firewall.ts:33](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L33)

___

### getRules

▸ **getRules**(): *Promise*<[*IFWRule*](../interfaces/interfaces.ifwrule.md)[]\>

**Returns:** *Promise*<[*IFWRule*](../interfaces/interfaces.ifwrule.md)[]\>

Defined in: [Firewall/Firewall.ts:43](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/Firewall.ts#L43)

___

### mapObject

▸ `Protected`**mapObject**<U\>(`constructor`: (`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: *any*) => U, `object`: *any*): U

#### Type parameters:

Name | Type |
:------ | :------ |
`U` | [*default*](commons__objectsubsite.default.md)<U\> |

#### Parameters:

Name | Type |
:------ | :------ |
`constructor` | (`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: *any*) => U |
`object` | *any* |

**Returns:** U

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:57](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubSite.ts#L57)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](firewall_firewall.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](firewall_firewall.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?   |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:79](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/_ObjectSubController.ts#L79)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/ObjectWithPrivateValues.ts#L11)
