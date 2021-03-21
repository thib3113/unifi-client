[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [Hotspot/Hotspots](../modules/hotspot_hotspots.md) / default

# Class: default

[Hotspot/Hotspots](../modules/hotspot_hotspots.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Table of contents

### Constructors

- [constructor](hotspot_hotspots.default.md#constructor)

### Accessors

- [config](hotspot_hotspots.default.md#config)
- [controller](hotspot_hotspots.default.md#controller)
- [instance](hotspot_hotspots.default.md#instance)
- [privateMap](hotspot_hotspots.default.md#privatemap)
- [site](hotspot_hotspots.default.md#site)

### Methods

- [authorizeGuest](hotspot_hotspots.default.md#authorizeguest)
- [checkNeeds](hotspot_hotspots.default.md#checkneeds)
- [getPrivate](hotspot_hotspots.default.md#getprivate)
- [mapObject](hotspot_hotspots.default.md#mapobject)
- [needVersion](hotspot_hotspots.default.md#needversion)
- [setPrivate](hotspot_hotspots.default.md#setprivate)
- [unAuthorizeGuest](hotspot_hotspots.default.md#unauthorizeguest)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): [*default*](hotspot_hotspots.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** [*default*](hotspot_hotspots.default.md)

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:10](https://github.com/thib3113/unifi-client/blob/92261be/src/commons/_ObjectSubSite.ts#L10)

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

### authorizeGuest

▸ **authorizeGuest**(`__namedParameters`: [*IAuthorizeGuest*](../interfaces/hotspot_iauthorizeguest.iauthorizeguest.md), `force?`: *boolean*): *Promise*<[*IGuestAuthorization*](../interfaces/hotspot_iguestauthorization.iguestauthorization.md)\>

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`__namedParameters` | [*IAuthorizeGuest*](../interfaces/hotspot_iauthorizeguest.iauthorizeguest.md) | - |
`force` | *boolean* | false |

**Returns:** *Promise*<[*IGuestAuthorization*](../interfaces/hotspot_iguestauthorization.iguestauthorization.md)\>

Defined in: [Hotspot/Hotspots.ts:16](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/Hotspots.ts#L16)

___

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

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](hotspot_hotspots.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](hotspot_hotspots.default.md) | - | the key object that need to be only supported on some versions   |
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

___

### unAuthorizeGuest

▸ **unAuthorizeGuest**(`mac`: *string*): *Promise*<void\>

#### Parameters:

Name | Type |
:------ | :------ |
`mac` | *string* |

**Returns:** *Promise*<void\>

Defined in: [Hotspot/Hotspots.ts:55](https://github.com/thib3113/unifi-client/blob/92261be/src/Hotspot/Hotspots.ts#L55)
