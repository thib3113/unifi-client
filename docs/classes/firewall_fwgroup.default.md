[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [Firewall/FWGroup](../modules/firewall_fwgroup.md) / default

# Class: default

[Firewall/FWGroup](../modules/firewall_fwgroup.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Implements

* [*IFWGroup*](../interfaces/interfaces.ifwgroup.md)

## Table of contents

### Constructors

- [constructor](firewall_fwgroup.default.md#constructor)

### Properties

- [\_id](firewall_fwgroup.default.md#_id)
- [group\_members](firewall_fwgroup.default.md#group_members)
- [group\_type](firewall_fwgroup.default.md#group_type)
- [name](firewall_fwgroup.default.md#name)
- [site\_id](firewall_fwgroup.default.md#site_id)

### Accessors

- [config](firewall_fwgroup.default.md#config)
- [controller](firewall_fwgroup.default.md#controller)
- [instance](firewall_fwgroup.default.md#instance)
- [privateMap](firewall_fwgroup.default.md#privatemap)
- [site](firewall_fwgroup.default.md#site)

### Methods

- [checkNeeds](firewall_fwgroup.default.md#checkneeds)
- [getPrivate](firewall_fwgroup.default.md#getprivate)
- [mapObject](firewall_fwgroup.default.md#mapobject)
- [needVersion](firewall_fwgroup.default.md#needversion)
- [setPrivate](firewall_fwgroup.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: [*IFWGroup*](../interfaces/interfaces.ifwgroup.md)): [*default*](firewall_fwgroup.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |
`props` | [*IFWGroup*](../interfaces/interfaces.ifwgroup.md) |

**Returns:** [*default*](firewall_fwgroup.default.md)

Overrides: [default](commons__objectsubsite.default.md)

Defined in: [Firewall/FWGroup.ts:9](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/FWGroup.ts#L9)

## Properties

### \_id

• **\_id**: *string*

Implementation of: [IFWGroup](../interfaces/interfaces.ifwgroup.md).[_id](../interfaces/interfaces.ifwgroup.md#_id)

Defined in: [Firewall/FWGroup.ts:5](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/FWGroup.ts#L5)

___

### group\_members

• **group\_members**: *string*[]

Implementation of: [IFWGroup](../interfaces/interfaces.ifwgroup.md).[group_members](../interfaces/interfaces.ifwgroup.md#group_members)

Defined in: [Firewall/FWGroup.ts:6](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/FWGroup.ts#L6)

___

### group\_type

• **group\_type**: *address-group* \| *port-group* \| *ipv6-address-group*

Implementation of: [IFWGroup](../interfaces/interfaces.ifwgroup.md).[group_type](../interfaces/interfaces.ifwgroup.md#group_type)

Defined in: [Firewall/FWGroup.ts:7](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/FWGroup.ts#L7)

___

### name

• **name**: *string*

Implementation of: [IFWGroup](../interfaces/interfaces.ifwgroup.md).[name](../interfaces/interfaces.ifwgroup.md#name)

Defined in: [Firewall/FWGroup.ts:8](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/FWGroup.ts#L8)

___

### site\_id

• **site\_id**: *string*

Implementation of: [IFWGroup](../interfaces/interfaces.ifwgroup.md).[site_id](../interfaces/interfaces.ifwgroup.md#site_id)

Defined in: [Firewall/FWGroup.ts:9](https://github.com/thib3113/unifi-client/blob/6f710a8/src/Firewall/FWGroup.ts#L9)

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

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](firewall_fwgroup.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](firewall_fwgroup.default.md) | - | the key object that need to be only supported on some versions   |
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
