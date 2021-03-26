[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Devices/Device](../modules/devices_device.md) / default

# Class: default

[Devices/Device](../modules/devices_device.md).default

## Hierarchy

* [*default*](commons__objectsubsite.default.md)

  ↳ **default**

## Implements

* [*IDevice*](../interfaces/devices_idevice.idevice.md)

## Table of contents

### Constructors

- [constructor](devices_device.default.md#constructor)

### Properties

- [\_id](devices_device.default.md#_id)
- [confidence](devices_device.default.md#confidence)
- [dev\_cat](devices_device.default.md#dev_cat)
- [dev\_family](devices_device.default.md#dev_family)
- [dev\_id](devices_device.default.md#dev_id)
- [dev\_id\_override](devices_device.default.md#dev_id_override)
- [dev\_vendor](devices_device.default.md#dev_vendor)
- [fingerprint\_engine\_version](devices_device.default.md#fingerprint_engine_version)
- [fingerprint\_override](devices_device.default.md#fingerprint_override)
- [fingerprint\_source](devices_device.default.md#fingerprint_source)
- [first\_seen](devices_device.default.md#first_seen)
- [fixed\_ip](devices_device.default.md#fixed_ip)
- [forget](devices_device.default.md#forget)
- [hostname](devices_device.default.md#hostname)
- [is\_guest](devices_device.default.md#is_guest)
- [is\_wired](devices_device.default.md#is_wired)
- [last\_seen](devices_device.default.md#last_seen)
- [mac](devices_device.default.md#mac)
- [name](devices_device.default.md#name)
- [network\_id](devices_device.default.md#network_id)
- [note](devices_device.default.md#note)
- [noted](devices_device.default.md#noted)
- [os\_name](devices_device.default.md#os_name)
- [oui](devices_device.default.md#oui)
- [site\_id](devices_device.default.md#site_id)
- [use\_fixedip](devices_device.default.md#use_fixedip)
- [user\_group\_id](devices_device.default.md#user_group_id)

### Accessors

- [config](devices_device.default.md#config)
- [controller](devices_device.default.md#controller)
- [instance](devices_device.default.md#instance)
- [privateMap](devices_device.default.md#privatemap)
- [site](devices_device.default.md#site)

### Methods

- [\_forget](devices_device.default.md#_forget)
- [checkNeeds](devices_device.default.md#checkneeds)
- [delete](devices_device.default.md#delete)
- [getController](devices_device.default.md#getcontroller)
- [getPrivate](devices_device.default.md#getprivate)
- [getinstance](devices_device.default.md#getinstance)
- [import](devices_device.default.md#import)
- [mapObject](devices_device.default.md#mapobject)
- [needVersion](devices_device.default.md#needversion)
- [setPrivate](devices_device.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md), `props`: [*IDevice*](../interfaces/devices_idevice.idevice.md)): [*default*](devices_device.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubSiteConfig*](../interfaces/commons__objectsubsite.iobjectsubsiteconfig.md) |
`props` | [*IDevice*](../interfaces/devices_idevice.idevice.md) |

**Returns:** [*default*](devices_device.default.md)

Overrides: [default](commons__objectsubsite.default.md)

Defined in: [Devices/Device.ts:6](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L6)

## Properties

### \_id

• **\_id**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[_id](../interfaces/devices_idevice.idevice.md#_id)

Defined in: [Devices/Device.ts:136](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L136)

___

### confidence

• **confidence**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[confidence](../interfaces/devices_idevice.idevice.md#confidence)

Defined in: [Devices/Device.ts:137](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L137)

___

### dev\_cat

• **dev\_cat**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[dev_cat](../interfaces/devices_idevice.idevice.md#dev_cat)

Defined in: [Devices/Device.ts:138](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L138)

___

### dev\_family

• **dev\_family**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[dev_family](../interfaces/devices_idevice.idevice.md#dev_family)

Defined in: [Devices/Device.ts:139](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L139)

___

### dev\_id

• **dev\_id**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[dev_id](../interfaces/devices_idevice.idevice.md#dev_id)

Defined in: [Devices/Device.ts:140](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L140)

___

### dev\_id\_override

• **dev\_id\_override**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[dev_id_override](../interfaces/devices_idevice.idevice.md#dev_id_override)

Defined in: [Devices/Device.ts:141](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L141)

___

### dev\_vendor

• **dev\_vendor**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[dev_vendor](../interfaces/devices_idevice.idevice.md#dev_vendor)

Defined in: [Devices/Device.ts:142](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L142)

___

### fingerprint\_engine\_version

• **fingerprint\_engine\_version**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[fingerprint_engine_version](../interfaces/devices_idevice.idevice.md#fingerprint_engine_version)

Defined in: [Devices/Device.ts:161](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L161)

___

### fingerprint\_override

• **fingerprint\_override**: *boolean*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[fingerprint_override](../interfaces/devices_idevice.idevice.md#fingerprint_override)

Defined in: [Devices/Device.ts:143](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L143)

___

### fingerprint\_source

• **fingerprint\_source**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[fingerprint_source](../interfaces/devices_idevice.idevice.md#fingerprint_source)

Defined in: [Devices/Device.ts:144](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L144)

___

### first\_seen

• **first\_seen**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[first_seen](../interfaces/devices_idevice.idevice.md#first_seen)

Defined in: [Devices/Device.ts:145](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L145)

___

### fixed\_ip

• **fixed\_ip**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[fixed_ip](../interfaces/devices_idevice.idevice.md#fixed_ip)

Defined in: [Devices/Device.ts:160](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L160)

___

### forget

• **forget**: () => *Promise*<[*default*](devices_device.default.md)\>

Forget one or more client devices - forget_sta()

return true on success
required parameter <macs> = array of client MAC addresses

NOTE:
only supported with controller versions 5.9.X and higher, can be
slow (up to 5 minutes) on larger controllers

#### Type declaration:

▸ (): *Promise*<[*default*](devices_device.default.md)\>

**Returns:** *Promise*<[*default*](devices_device.default.md)\>

Defined in: [Devices/Device.ts:109](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L109)

Defined in: [Devices/Device.ts:109](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L109)

___

### hostname

• **hostname**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[hostname](../interfaces/devices_idevice.idevice.md#hostname)

Defined in: [Devices/Device.ts:146](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L146)

___

### is\_guest

• **is\_guest**: *boolean*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[is_guest](../interfaces/devices_idevice.idevice.md#is_guest)

Defined in: [Devices/Device.ts:147](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L147)

___

### is\_wired

• **is\_wired**: *boolean*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[is_wired](../interfaces/devices_idevice.idevice.md#is_wired)

Defined in: [Devices/Device.ts:148](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L148)

___

### last\_seen

• **last\_seen**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[last_seen](../interfaces/devices_idevice.idevice.md#last_seen)

Defined in: [Devices/Device.ts:149](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L149)

___

### mac

• **mac**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[mac](../interfaces/devices_idevice.idevice.md#mac)

Defined in: [Devices/Device.ts:150](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L150)

___

### name

• **name**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[name](../interfaces/devices_idevice.idevice.md#name)

Defined in: [Devices/Device.ts:151](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L151)

___

### network\_id

• **network\_id**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[network_id](../interfaces/devices_idevice.idevice.md#network_id)

Defined in: [Devices/Device.ts:159](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L159)

___

### note

• **note**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[note](../interfaces/devices_idevice.idevice.md#note)

Defined in: [Devices/Device.ts:152](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L152)

___

### noted

• **noted**: *boolean*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[noted](../interfaces/devices_idevice.idevice.md#noted)

Defined in: [Devices/Device.ts:153](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L153)

___

### os\_name

• **os\_name**: *number*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[os_name](../interfaces/devices_idevice.idevice.md#os_name)

Defined in: [Devices/Device.ts:154](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L154)

___

### oui

• **oui**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[oui](../interfaces/devices_idevice.idevice.md#oui)

Defined in: [Devices/Device.ts:155](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L155)

___

### site\_id

• **site\_id**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[site_id](../interfaces/devices_idevice.idevice.md#site_id)

Defined in: [Devices/Device.ts:156](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L156)

___

### use\_fixedip

• **use\_fixedip**: *boolean*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[use_fixedip](../interfaces/devices_idevice.idevice.md#use_fixedip)

Defined in: [Devices/Device.ts:158](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L158)

___

### user\_group\_id

• **user\_group\_id**: *string*

Implementation of: [IDevice](../interfaces/devices_idevice.idevice.md).[user_group_id](../interfaces/devices_idevice.idevice.md#user_group_id)

Defined in: [Devices/Device.ts:157](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L157)

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

### \_forget

▸ `Private`**_forget**(): *Promise*<[*default*](devices_device.default.md)\>

**Returns:** *Promise*<[*default*](devices_device.default.md)\>

Defined in: [Devices/Device.ts:110](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L110)

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

Defined in: [commons/_ObjectSubController.ts:70](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L70)

___

### delete

▸ **delete**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [Devices/Device.ts:127](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L127)

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

▸ `Protected`**import**(`props`: [*IDevice*](../interfaces/devices_idevice.idevice.md)): [*default*](devices_device.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IDevice*](../interfaces/devices_idevice.idevice.md) |

**Returns:** [*default*](devices_device.default.md)

Overrides: [default](commons__objectsubsite.default.md)

Defined in: [Devices/Device.ts:19](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/Device.ts#L19)

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

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](devices_device.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](devices_device.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

Inherited from: [default](commons__objectsubsite.default.md)

Defined in: [commons/_ObjectSubController.ts:85](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L85)

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
