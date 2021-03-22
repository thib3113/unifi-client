[unifi-client - v0.0.23](../README.md) / [Exports](../modules.md) / [commons/Validate](../modules/commons_validate.md) / default

# Class: default

[commons/Validate](../modules/commons_validate.md).default

## Table of contents

### Constructors

- [constructor](commons_validate.default.md#constructor)

### Methods

- [implementsTKeys](commons_validate.default.md#implementstkeys)
- [isBoolean](commons_validate.default.md#isboolean)
- [isBuffer](commons_validate.default.md#isbuffer)
- [isDate](commons_validate.default.md#isdate)
- [isError](commons_validate.default.md#iserror)
- [isFunction](commons_validate.default.md#isfunction)
- [isNull](commons_validate.default.md#isnull)
- [isNumber](commons_validate.default.md#isnumber)
- [isObject](commons_validate.default.md#isobject)
- [isRegExp](commons_validate.default.md#isregexp)
- [isString](commons_validate.default.md#isstring)
- [isSymbol](commons_validate.default.md#issymbol)
- [isUndefined](commons_validate.default.md#isundefined)
- [mail](commons_validate.default.md#mail)
- [stringToBoolean](commons_validate.default.md#stringtoboolean)
- [uuid](commons_validate.default.md#uuid)

## Constructors

### constructor

\+ **new default**(): [*default*](commons_validate.default.md)

**Returns:** [*default*](commons_validate.default.md)

## Methods

### implementsTKeys

▸ `Static`**implementsTKeys**<T\>(`obj`: *any*, `keys`: keyof T[]): obj is T

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type |
:------ | :------ |
`obj` | *any* |
`keys` | keyof T[] |

**Returns:** obj is T

Defined in: [commons/Validate.ts:82](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L82)

___

### isBoolean

▸ `Static`**isBoolean**(`value`: *any*): value is boolean

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is boolean

Defined in: [commons/Validate.ts:54](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L54)

___

### isBuffer

▸ `Static`**isBuffer**(`value`: *any*): value is Buffer

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is Buffer

Defined in: [commons/Validate.ts:74](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L74)

___

### isDate

▸ `Static`**isDate**(`value`: *any*, `acceptTimestamp?`: *boolean*): value is Date

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`value` | *any* | - |
`acceptTimestamp` | *boolean* | true |

**Returns:** value is Date

Defined in: [commons/Validate.ts:66](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L66)

___

### isError

▸ `Static`**isError**(`value`: *any*): value is Error

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is Error

Defined in: [commons/Validate.ts:62](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L62)

___

### isFunction

▸ `Static`**isFunction**(`value`: *any*): value is Function

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is Function

Defined in: [commons/Validate.ts:35](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L35)

___

### isNull

▸ `Static`**isNull**(`value`: *any*): value is null

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is null

Defined in: [commons/Validate.ts:44](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L44)

___

### isNumber

▸ `Static`**isNumber**(`value`: *any*): value is number

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is number

Defined in: [commons/Validate.ts:29](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L29)

___

### isObject

▸ `Static`**isObject**(`value`: *any*): value is object

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is object

Defined in: [commons/Validate.ts:40](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L40)

___

### isRegExp

▸ `Static`**isRegExp**(`value`: *any*): value is RegExp

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is RegExp

Defined in: [commons/Validate.ts:58](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L58)

___

### isString

▸ `Static`**isString**(`value`: *any*): value is string

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is string

Defined in: [commons/Validate.ts:25](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L25)

___

### isSymbol

▸ `Static`**isSymbol**(`value`: *any*): value is symbol

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is symbol

Defined in: [commons/Validate.ts:78](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L78)

___

### isUndefined

▸ `Static`**isUndefined**(`value`: *any*): value is undefined

#### Parameters:

Name | Type |
:------ | :------ |
`value` | *any* |

**Returns:** value is undefined

Defined in: [commons/Validate.ts:49](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L49)

___

### mail

▸ `Static`**mail**(`mail`: *string*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`mail` | *string* |

**Returns:** *boolean*

Defined in: [commons/Validate.ts:16](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L16)

___

### stringToBoolean

▸ `Static`**stringToBoolean**(`str`: *string*, `strict?`: *boolean*): *boolean*

Return a boolean depending on the string . ("true", "y", "yes", "oui", "on" return true, else it's return false)

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`str` | *string* | - |  |
`strict` | *boolean* | false | return null instead of false if not in list   |

**Returns:** *boolean*

Defined in: [commons/Validate.ts:96](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L96)

___

### uuid

▸ `Static`**uuid**(`uuid`: *string*): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`uuid` | *string* |

**Returns:** *boolean*

Defined in: [commons/Validate.ts:20](https://github.com/thib3113/unifi-client/blob/6f21a04/src/commons/Validate.ts#L20)
