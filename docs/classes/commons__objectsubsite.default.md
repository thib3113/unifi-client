[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [commons/_ObjectSubSite](../modules/commons__objectsubsite.md) / default

# Class: default

[commons/_ObjectSubSite](../modules/commons__objectsubsite.md).default

## Hierarchy

* [*default*](commons__objectsubcontroller.default.md)

  ↳ **default**

  ↳↳ [*default*](devices_device.default.md)

  ↳↳ [*default*](devices_devices.default.md)

  ↳↳ [*default*](firewall_firewall.default.md)

  ↳↳ [*default*](firewall_fwgroup.default.md)

  ↳↳ [*default*](firewall_fwrule.default.md)

  ↳↳ [*default*](hotspot_guestauthorization.default.md)

  ↳↳ [*default*](hotspot_hotspots.default.md)

## Table of contents

### Constructors

- [constructor](commons__objectsubsite.default.md#constructor)

### Accessors

- [config](commons__objectsubsite.default.md#config)
- [controller](commons__objectsubsite.default.md#controller)
- [instance](commons__objectsubsite.default.md#instance)
- [privateMap](commons__objectsubsite.default.md#privatemap)
- [site](commons__objectsubsite.default.md#site)

### Methods

- [checkNeeds](commons__objectsubsite.default.md#checkneeds)
- [getController](commons__objectsubsite.default.md#getcontroller)
- [getPrivate](commons__objectsubsite.default.md#getprivate)
- [getinstance](commons__objectsubsite.default.md#getinstance)
- [import](commons__objectsubsite.default.md#import)
- [mapObject](commons__objectsubsite.default.md#mapobject)
- [needVersion](commons__objectsubsite.default.md#needversion)
- [setPrivate](commons__objectsubsite.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): [*default*](commons__objectsubsite.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** [*default*](commons__objectsubsite.default.md)

Overrides: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/_ObjectSubSite.ts:8](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubSite.ts#L8)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

**Returns:** [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

Defined in: [commons/_ObjectSubSite.ts:15](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubSite.ts#L15)

• `Protected`set **config**(`value`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:19](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubSite.ts#L19)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubController.ts:30](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L30)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:34](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L34)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubController.ts:23](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L23)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:27](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L27)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubController.ts:37](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L37)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:41](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L41)

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

Defined in: [commons/_ObjectSubController.ts:70](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L70)

___

### getController

▸ **getController**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/_ObjectSubController.ts:55](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L55)

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getinstance

▸ **getinstance**(): AxiosInstance

**Returns:** AxiosInstance

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/_ObjectSubController.ts:52](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L52)

___

### import

▸ `Protected`**import**(`props`: *any*): [*default*](commons__objectsubsite.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *any* |

**Returns:** [*default*](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:23](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubSite.ts#L23)

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

Defined in: [commons/_ObjectSubSite.ts:43](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubSite.ts#L43)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](commons__objectsubsite.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](commons__objectsubsite.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubcontroller.default.md)

Defined in: [commons/_ObjectSubController.ts:85](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/_ObjectSubController.ts#L85)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/d186312/src/commons/ObjectWithPrivateValues.ts#L11)
