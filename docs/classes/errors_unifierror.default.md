[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [Errors/UnifiError](../modules/errors_unifierror.md) / default

# Class: default

[Errors/UnifiError](../modules/errors_unifierror.md).default

## Hierarchy

* [*default*](errors___error.default.md)

  ↳ **default**

## Table of contents

### Constructors

- [constructor](errors_unifierror.default.md#constructor)

### Properties

- [\_message](errors_unifierror.default.md#_message)
- [code](errors_unifierror.default.md#code)
- [errorCode](errors_unifierror.default.md#errorcode)
- [exception](errors_unifierror.default.md#exception)
- [message](errors_unifierror.default.md#message)
- [meta](errors_unifierror.default.md#meta)
- [name](errors_unifierror.default.md#name)
- [stack](errors_unifierror.default.md#stack)

### Methods

- [\_toStringParts](errors_unifierror.default.md#_tostringparts)
- [toString](errors_unifierror.default.md#tostring)

## Constructors

### constructor

\+ **new default**(`message?`: *string* \| Error, `code?`: *number*, `meta?`: [*IUnifiErrorMeta*](../interfaces/errors_unifierror.iunifierrormeta.md), `exception?`: *string* \| Error): [*default*](errors_unifierror.default.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* \| Error | '' |
`code` | *number* | 0 |
`meta` | [*IUnifiErrorMeta*](../interfaces/errors_unifierror.iunifierrormeta.md) | - |
`exception` | *string* \| Error | null |

**Returns:** [*default*](errors_unifierror.default.md)

Overrides: [default](errors___error.default.md)

Defined in: [Errors/UnifiError.ts:11](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/UnifiError.ts#L11)

## Properties

### \_message

• `Protected` **\_message**: *string*

Inherited from: [default](errors___error.default.md).[_message](errors___error.default.md#_message)

Defined in: [Errors/__Error.ts:6](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L6)

___

### code

• **code**: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md)

can also contains error like certificates error (https://nodejs.org/api/tls.html#tls_x509_certificate_error_codes) or other errors . Can be a string, or a number

Inherited from: [default](errors___error.default.md).[code](errors___error.default.md#code)

Defined in: [Errors/__Error.ts:14](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L14)

___

### errorCode

• **errorCode**: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md)

can also contains error like certificates error (https://nodejs.org/api/tls.html#tls_x509_certificate_error_codes) or other errors . Can be a string, or a number

Inherited from: [default](errors___error.default.md).[errorCode](errors___error.default.md#errorcode)

Defined in: [Errors/__Error.ts:10](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L10)

___

### exception

• **exception**: Error

Inherited from: [default](errors___error.default.md).[exception](errors___error.default.md#exception)

Defined in: [Errors/__Error.ts:15](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L15)

___

### message

• **message**: *string*

Inherited from: [default](errors___error.default.md).[message](errors___error.default.md#message)

Defined in: [Errors/__Error.ts:16](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L16)

___

### meta

• **meta**: [*IUnifiErrorMeta*](../interfaces/errors_unifierror.iunifierrormeta.md)

Defined in: [Errors/UnifiError.ts:11](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/UnifiError.ts#L11)

___

### name

• **name**: *string*= 'UnifiError'

Overrides: [default](errors___error.default.md).[name](errors___error.default.md#name)

Defined in: [Errors/UnifiError.ts:37](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/UnifiError.ts#L37)

___

### stack

• **stack**: *string*

Inherited from: [default](errors___error.default.md).[stack](errors___error.default.md#stack)

Defined in: [Errors/__Error.ts:5](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L5)

## Methods

### \_toStringParts

▸ `Protected`**_toStringParts**(): *string*[]

**Returns:** *string*[]

Overrides: [default](errors___error.default.md)

Defined in: [Errors/UnifiError.ts:29](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/UnifiError.ts#L29)

___

### toString

▸ **toString**(): *string*

**Returns:** *string*

Inherited from: [default](errors___error.default.md)

Defined in: [Errors/__Error.ts:61](https://github.com/thib3113/unifi-client/blob/90eb43b/src/Errors/__Error.ts#L61)
