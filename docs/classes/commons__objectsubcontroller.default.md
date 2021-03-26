[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [commons/_ObjectSubController](../modules/commons__objectsubcontroller.md) / default

# Class: default

[commons/_ObjectSubController](../modules/commons__objectsubcontroller.md).default

## Hierarchy

* [*default*](commons_objectwithprivatevalues.default.md)

  ↳ **default**

  ↳↳ [*default*](commons__objectsubsite.default.md)

  ↳↳ [*default*](sites_site.default.md)

## Table of contents

### Constructors

- [constructor](commons__objectsubcontroller.default.md#constructor)

### Accessors

- [config](commons__objectsubcontroller.default.md#config)
- [controller](commons__objectsubcontroller.default.md#controller)
- [instance](commons__objectsubcontroller.default.md#instance)
- [privateMap](commons__objectsubcontroller.default.md#privatemap)
- [site](commons__objectsubcontroller.default.md#site)

### Methods

- [checkNeeds](commons__objectsubcontroller.default.md#checkneeds)
- [getController](commons__objectsubcontroller.default.md#getcontroller)
- [getPrivate](commons__objectsubcontroller.default.md#getprivate)
- [getinstance](commons__objectsubcontroller.default.md#getinstance)
- [needVersion](commons__objectsubcontroller.default.md#needversion)
- [setPrivate](commons__objectsubcontroller.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`config`: [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)): [*default*](commons__objectsubcontroller.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md) |

**Returns:** [*default*](commons__objectsubcontroller.default.md)

Overrides: [default](commons_objectwithprivatevalues.default.md)

Defined in: [commons/_ObjectSubController.ts:43](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L43)

## Accessors

### config

• `Protected`get **config**(): [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)

**Returns:** [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)

Defined in: [commons/_ObjectSubController.ts:16](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L16)

• `Protected`set **config**(`value`: [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*IObjectSubController*](../interfaces/commons__objectsubcontroller.iobjectsubcontroller.md) |

**Returns:** *void*

Defined in: [commons/_ObjectSubController.ts:20](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L20)

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

Defined in: [commons/_ObjectSubController.ts:70](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L70)

___

### getController

▸ **getController**(): [*IController*](../interfaces/icontroller.icontroller-1.md)

**Returns:** [*IController*](../interfaces/icontroller.icontroller-1.md)

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

Inherited from: [default](commons_objectwithprivatevalues.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getinstance

▸ **getinstance**(): AxiosInstance

**Returns:** AxiosInstance

Defined in: [commons/_ObjectSubController.ts:52](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/_ObjectSubController.ts#L52)

___

### needVersion

▸ `Protected`**needVersion**<T\>(`key`: keyof [*default*](commons__objectsubcontroller.default.md), `value`: T, `minVersion?`: *string*, `unifiOs?`: *boolean*, `allowUndefined?`: *boolean*): *boolean*

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`key` | keyof [*default*](commons__objectsubcontroller.default.md) | - | the key object that need to be only supported on some versions   |
`value` | T | - | the value store in this object   |
`minVersion?` | *string* | - | the minimal semver version for this object   |
`unifiOs?` | *boolean* | - | need to be unifiOs ? or Unifi Controller ? if no one, pass undefined   |
`allowUndefined` | *boolean* | false | to undefined check ?    |

**Returns:** *boolean*

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

Inherited from: [default](commons_objectwithprivatevalues.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/commons/ObjectWithPrivateValues.ts#L11)
