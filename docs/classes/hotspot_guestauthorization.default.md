[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [Hotspot/GuestAuthorization](../modules/hotspot_guestauthorization.md) / default

# Class: default

[Hotspot/GuestAuthorization](../modules/hotspot_guestauthorization.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Implements

* [*IGuestAuthorization*](../interfaces/hotspot_iguestauthorization.iguestauthorization.md)

## Table of contents

### Constructors

- [constructor](hotspot_guestauthorization.default.md#constructor)

### Properties

- [\_id](hotspot_guestauthorization.default.md#_id)
- [authorized\_by](hotspot_guestauthorization.default.md#authorized_by)
- [end](hotspot_guestauthorization.default.md#end)
- [mac](hotspot_guestauthorization.default.md#mac)
- [qos\_usage\_quota](hotspot_guestauthorization.default.md#qos_usage_quota)
- [site\_id](hotspot_guestauthorization.default.md#site_id)
- [start](hotspot_guestauthorization.default.md#start)

### Accessors

- [config](hotspot_guestauthorization.default.md#config)
- [controller](hotspot_guestauthorization.default.md#controller)
- [instance](hotspot_guestauthorization.default.md#instance)
- [privateMap](hotspot_guestauthorization.default.md#privatemap)
- [site](hotspot_guestauthorization.default.md#site)

### Methods

- [checkNeeds](hotspot_guestauthorization.default.md#checkneeds)
- [getPrivate](hotspot_guestauthorization.default.md#getprivate)
- [mapObject](hotspot_guestauthorization.default.md#mapobject)
- [needVersion](hotspot_guestauthorization.default.md#needversion)
- [setPrivate](hotspot_guestauthorization.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: [*IGuestAuthorization*](../interfaces/hotspot_iguestauthorization.iguestauthorization.md)): [*default*](hotspot_guestauthorization.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |
`props` | [*IGuestAuthorization*](../interfaces/hotspot_iguestauthorization.iguestauthorization.md) |

**Returns:** [*default*](hotspot_guestauthorization.default.md)

Overrides: [default](commons__objectsubsite.default.md)

Defined in: [Hotspot/GuestAuthorization.ts:12](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L12)

## Properties

### \_id

• **\_id**: *string*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[_id](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#_id)

Defined in: [Hotspot/GuestAuthorization.ts:6](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L6)

___

### authorized\_by

• **authorized\_by**: *string*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[authorized_by](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#authorized_by)

Defined in: [Hotspot/GuestAuthorization.ts:7](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L7)

___

### end

• **end**: *number*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[end](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#end)

Defined in: [Hotspot/GuestAuthorization.ts:8](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L8)

___

### mac

• **mac**: *string*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[mac](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#mac)

Defined in: [Hotspot/GuestAuthorization.ts:9](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L9)

___

### qos\_usage\_quota

• **qos\_usage\_quota**: *number*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[qos_usage_quota](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#qos_usage_quota)

Defined in: [Hotspot/GuestAuthorization.ts:10](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L10)

___

### site\_id

• **site\_id**: *string*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[site_id](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#site_id)

Defined in: [Hotspot/GuestAuthorization.ts:11](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L11)

___

### start

• **start**: *number*

Implementation of: [IGuestAuthorization](../interfaces/hotspot_iguestauthorization.iguestauthorization.md).[start](../interfaces/hotspot_iguestauthorization.iguestauthorization.md#start)

Defined in: [Hotspot/GuestAuthorization.ts:12](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/GuestAuthorization.ts#L12)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

**Returns:** [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

Defined in: [commons/_ObjectSubSite.ts:17](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L17)

• `Protected`set **config**(`value`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:21](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L21)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubSite.ts:31](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L31)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:35](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L35)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubSite.ts:24](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L24)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:28](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L28)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubSite.ts:38](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L38)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:42](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L42)

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

Defined in: [commons/_ObjectSubController.ts:63](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubController.ts#L63)

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/ObjectWithPrivateValues.ts#L6)

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

Defined in: [commons/_ObjectSubSite.ts:62](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L62)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](hotspot_guestauthorization.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](hotspot_guestauthorization.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:78](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubController.ts#L78)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/ObjectWithPrivateValues.ts#L11)
