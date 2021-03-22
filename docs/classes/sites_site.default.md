[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Sites/Site](../modules/sites_site.md) / default

# Class: default

[Sites/Site](../modules/sites_site.md).default

## Hierarchy

* [*default*](commons__objectsubcontroller.default.md)

  ↳ **default**

## Implements

* [*ISite*](../interfaces/sites_isite.isite.md)

## Table of contents

### Constructors

- [constructor](sites_site.default.md#constructor)

### Properties

- [\_id](sites_site.default.md#_id)
- [anonymous\_id](sites_site.default.md#anonymous_id)
- [attr\_hidden\_id](sites_site.default.md#attr_hidden_id)
- [attr\_no\_delete](sites_site.default.md#attr_no_delete)
- [desc](sites_site.default.md#desc)
- [firewall](sites_site.default.md#firewall)
- [hotspots](sites_site.default.md#hotspots)
- [name](sites_site.default.md#name)
- [role](sites_site.default.md#role)
- [role\_hotspot](sites_site.default.md#role_hotspot)

### Accessors

- [config](sites_site.default.md#config)
- [controller](sites_site.default.md#controller)
- [instance](sites_site.default.md#instance)
- [privateMap](sites_site.default.md#privatemap)
- [site](sites_site.default.md#site)

### Methods

- [checkNeeds](sites_site.default.md#checkneeds)
- [getPrivate](sites_site.default.md#getprivate)
- [needVersion](sites_site.default.md#needversion)
- [setPrivate](sites_site.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`controller`: [*IController*](../interfaces/icontroller.icontroller-1.md), `props`: [*ISite*](../interfaces/sites_isite.isite.md)): [*default*](sites_site.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`controller` | [*IController*](../interfaces/icontroller.icontroller-1.md) |
`props` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** [*default*](sites_site.default.md)

Overrides: [default](commons__objectsubcontroller.default.md)

Defined in: [Sites/Site.ts:20](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L20)

## Properties

### \_id

• **\_id**: *string*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[_id](../interfaces/sites_isite.isite.md#_id)

Defined in: [Sites/Site.ts:10](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L10)

___

### anonymous\_id

• **anonymous\_id**: *string*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[anonymous_id](../interfaces/sites_isite.isite.md#anonymous_id)

Defined in: [Sites/Site.ts:11](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L11)

___

### attr\_hidden\_id

• **attr\_hidden\_id**: *string*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[attr_hidden_id](../interfaces/sites_isite.isite.md#attr_hidden_id)

Defined in: [Sites/Site.ts:14](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L14)

___

### attr\_no\_delete

• **attr\_no\_delete**: *boolean*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[attr_no_delete](../interfaces/sites_isite.isite.md#attr_no_delete)

Defined in: [Sites/Site.ts:15](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L15)

___

### desc

• **desc**: *string*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[desc](../interfaces/sites_isite.isite.md#desc)

Defined in: [Sites/Site.ts:13](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L13)

___

### firewall

• **firewall**: [*default*](firewall_firewall.default.md)

Defined in: [Sites/Site.ts:19](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L19)

___

### hotspots

• **hotspots**: [*default*](hotspot_hotspots.default.md)

Defined in: [Sites/Site.ts:20](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L20)

___

### name

• **name**: *string*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[name](../interfaces/sites_isite.isite.md#name)

Defined in: [Sites/Site.ts:12](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L12)

___

### role

• **role**: *string*

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[role](../interfaces/sites_isite.isite.md#role)

Defined in: [Sites/Site.ts:16](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L16)

___

### role\_hotspot

• **role\_hotspot**: *boolean*

UNIFIOS only

Implementation of: [ISite](../interfaces/sites_isite.isite.md).[role_hotspot](../interfaces/sites_isite.isite.md#role_hotspot)

Defined in: [Sites/Site.ts:17](https://github.com/thib3113/unifi-client/blob/78d04fb/src/Sites/Site.ts#L17)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)

**Returns:** [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)

Defined in: [commons/_ObjectSubController.ts:16](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L16)

• `Protected`set **config**(`value`: [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:20](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L20)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubController.ts:30](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L30)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:34](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L34)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubController.ts:23](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L23)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:27](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L27)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubController.ts:37](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L37)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:41](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L41)

## Methods

### checkNeeds

▸ `Protected`**checkNeeds**(`minVersion?`: *string*, `unifiOs?`: *boolean*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`minVersion?` | *string* |
`unifiOs?` | *boolean* |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/_ObjectSubController.ts:63](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L63)

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

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/ObjectWithPrivateValues.ts#L6)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](sites_site.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](sites_site.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/_ObjectSubController.ts:78](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/_ObjectSubController.ts#L78)

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

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/78d04fb/src/commons/ObjectWithPrivateValues.ts#L11)
