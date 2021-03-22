[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Firewall/Firewall](../modules/firewall_firewall.md) / default

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
- [getGroup](firewall_firewall.default.md#getgroup)
- [getGroups](firewall_firewall.default.md#getgroups)
- [getPrivate](firewall_firewall.default.md#getprivate)
- [getRule](firewall_firewall.default.md#getrule)
- [getRules](firewall_firewall.default.md#getrules)
- [import](firewall_firewall.default.md#import)
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

Defined in: [commons/_ObjectSubSite.ts:10](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L10)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

**Returns:** [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

Defined in: [commons/_ObjectSubSite.ts:17](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L17)

• `Protected`set **config**(`value`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:21](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L21)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubSite.ts:31](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L31)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:35](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L35)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubSite.ts:24](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L24)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:28](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L28)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubSite.ts:38](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L38)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:42](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L42)

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

Defined in: [commons/_ObjectSubController.ts:63](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubController.ts#L63)

___

### createGroup

▸ **createGroup**(`group`: *Omit*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md), *_id* \| *site_id*\>): *Promise*<[*default*](firewall_fwgroup.default.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`group` | *Omit*<[*IFWGroup*](../interfaces/interfaces.ifwgroup.md), *_id* \| *site_id*\> |

**Returns:** *Promise*<[*default*](firewall_fwgroup.default.md)\>

Defined in: [Firewall/Firewall.ts:73](https://github.com/thib3113/unifi-client/blob/7789674/src/Firewall/Firewall.ts#L73)

___

### createRule

▸ **createRule**(`group`: *Omit*<[*IFWRule*](../interfaces/interfaces.ifwrule.md), *_id* \| *site_id*\>): *Promise*<[*default*](firewall_fwrule.default.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`group` | *Omit*<[*IFWRule*](../interfaces/interfaces.ifwrule.md), *_id* \| *site_id*\> |

**Returns:** *Promise*<[*default*](firewall_fwrule.default.md)\>

Defined in: [Firewall/Firewall.ts:7](https://github.com/thib3113/unifi-client/blob/7789674/src/Firewall/Firewall.ts#L7)

___

### getGroup

▸ **getGroup**(`id`: *string*): *Promise*<[*default*](firewall_fwgroup.default.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *Promise*<[*default*](firewall_fwgroup.default.md)\>

Defined in: [Firewall/Firewall.ts:54](https://github.com/thib3113/unifi-client/blob/7789674/src/Firewall/Firewall.ts#L54)

___

### getGroups

▸ **getGroups**(): *Promise*<[*default*](firewall_fwgroup.default.md)[]\>

**Returns:** *Promise*<[*default*](firewall_fwgroup.default.md)[]\>

Defined in: [Firewall/Firewall.ts:67](https://github.com/thib3113/unifi-client/blob/7789674/src/Firewall/Firewall.ts#L67)

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getRule

▸ **getRule**(`id`: *string*): *Promise*<[*default*](firewall_fwrule.default.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *Promise*<[*default*](firewall_fwrule.default.md)\>

Defined in: [Firewall/Firewall.ts:35](https://github.com/thib3113/unifi-client/blob/7789674/src/Firewall/Firewall.ts#L35)

___

### getRules

▸ **getRules**(): *Promise*<[*default*](firewall_fwrule.default.md)[]\>

**Returns:** *Promise*<[*default*](firewall_fwrule.default.md)[]\>

Defined in: [Firewall/Firewall.ts:48](https://github.com/thib3113/unifi-client/blob/7789674/src/Firewall/Firewall.ts#L48)

___

### import

▸ `Protected`**import**(`props`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *any* |

**Returns:** *void*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:47](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L47)

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

Defined in: [commons/_ObjectSubSite.ts:65](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubSite.ts#L65)

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
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:78](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/_ObjectSubController.ts#L78)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/7789674/src/commons/ObjectWithPrivateValues.ts#L11)
