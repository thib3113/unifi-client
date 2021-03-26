[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [commons/ObjectWithPrivateValues](../modules/commons_objectwithprivatevalues.md) / default

# Class: default

[commons/ObjectWithPrivateValues](../modules/commons_objectwithprivatevalues.md).default

## Hierarchy

* **default**

  ↳ [*default*](commons__objectsubcontroller.default.md)

  ↳ [*default*](unifiauth.default.md)

## Table of contents

### Constructors

- [constructor](commons_objectwithprivatevalues.default.md#constructor)

### Accessors

- [privateMap](commons_objectwithprivatevalues.default.md#privatemap)

### Methods

- [getPrivate](commons_objectwithprivatevalues.default.md#getprivate)
- [setPrivate](commons_objectwithprivatevalues.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(): [*default*](commons_objectwithprivatevalues.default.md)

**Returns:** [*default*](commons_objectwithprivatevalues.default.md)

Defined in: [commons/ObjectWithPrivateValues.ts:2](https://github.com/thib3113/unifi-client/blob/17e4ed2/src/commons/ObjectWithPrivateValues.ts#L2)

## Accessors

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/17e4ed2/src/commons/ObjectWithPrivateValues.ts#L18)

## Methods

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/17e4ed2/src/commons/ObjectWithPrivateValues.ts#L6)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/17e4ed2/src/commons/ObjectWithPrivateValues.ts#L11)
