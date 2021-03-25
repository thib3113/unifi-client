[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Devices/Devices](../modules/devices_devices.md) / default

# Class: default

[Devices/Devices](../modules/devices_devices.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Table of contents

### Constructors

- [constructor](devices_devices.default.md#constructor)

### Accessors

- [config](devices_devices.default.md#config)
- [controller](devices_devices.default.md#controller)
- [instance](devices_devices.default.md#instance)
- [privateMap](devices_devices.default.md#privatemap)
- [site](devices_devices.default.md#site)

### Methods

- [checkNeeds](devices_devices.default.md#checkneeds)
- [create](devices_devices.default.md#create)
- [get](devices_devices.default.md#get)
- [getController](devices_devices.default.md#getcontroller)
- [getPrivate](devices_devices.default.md#getprivate)
- [getinstance](devices_devices.default.md#getinstance)
- [import](devices_devices.default.md#import)
- [list](devices_devices.default.md#list)
- [list2](devices_devices.default.md#list2)
- [mapObject](devices_devices.default.md#mapobject)
- [needVersion](devices_devices.default.md#needversion)
- [setPrivate](devices_devices.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): [*default*](devices_devices.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** [*default*](devices_devices.default.md)

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:8](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubSite.ts#L8)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

**Returns:** [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)

Defined in: [commons/_ObjectSubSite.ts:15](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubSite.ts#L15)

• `Protected`set **config**(`value`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubSite.ts:19](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubSite.ts#L19)

___

### controller

• `Protected`get **controller**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Defined in: [commons/_ObjectSubController.ts:30](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L30)

• `Protected`set **controller**(`value`: [*IController*](../interfaces/icontroller.icontroller-1.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IController*](../interfaces/icontroller.icontroller-1.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:34](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L34)

___

### instance

• `Protected`get **instance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubController.ts:23](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L23)

• `Protected`set **instance**(`value`: AxiosInstance): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | AxiosInstance |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:27](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L27)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/ObjectWithPrivateValues.ts#L18)

___

### site

• `Protected`get **site**(): [*ISite*](../interfaces/sites_isite.isite.md)

**Returns:** [*ISite*](../interfaces/sites_isite.isite.md)

Defined in: [commons/_ObjectSubController.ts:37](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L37)

• `Protected`set **site**(`value`: [*ISite*](../interfaces/sites_isite.isite.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*ISite*](../interfaces/sites_isite.isite.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:41](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L41)

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

Defined in: [commons/_ObjectSubController.ts:70](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L70)

___

### create

▸ **create**(`device`: [*partialDevice*](../modules/devices_devices.md#partialdevice)): *Promise*<[*default*](devices_device.default.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`device` | [*partialDevice*](../modules/devices_devices.md#partialdevice) |

**Returns:** *Promise*<[*default*](devices_device.default.md)\>

Defined in: [Devices/Devices.ts:10](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Devices/Devices.ts#L10)

___

### get

▸ **get**(`_id`: *string*): *Promise*<[*default*](devices_device.default.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`_id` | *string* |

**Returns:** *Promise*<[*default*](devices_device.default.md)\>

Defined in: [Devices/Devices.ts:43](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Devices/Devices.ts#L43)

___

### getController

▸ **getController**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:55](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L55)

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getinstance

▸ **getinstance**(): AxiosInstance

**Returns:** AxiosInstance

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:52](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L52)

___

### import

▸ `Protected`**import**(`props`: *any*): [*default*](devices_devices.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *any* |

**Returns:** [*default*](devices_devices.default.md)

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubSite.ts:23](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubSite.ts#L23)

___

### list

▸ **list**(): *Promise*<[*default*](devices_device.default.md)[]\>

**Returns:** *Promise*<[*default*](devices_device.default.md)[]\>

Defined in: [Devices/Devices.ts:101](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Devices/Devices.ts#L101)

___

### list2

▸ **list2**(): *Promise*<[*default*](devices_device.default.md)[]\>

**Returns:** *Promise*<[*default*](devices_device.default.md)[]\>

Defined in: [Devices/Devices.ts:89](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Devices/Devices.ts#L89)

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

Defined in: [commons/_ObjectSubSite.ts:43](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubSite.ts#L43)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](devices_devices.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](devices_devices.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:85](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/_ObjectSubController.ts#L85)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/54bf19f/src/commons/ObjectWithPrivateValues.ts#L11)
