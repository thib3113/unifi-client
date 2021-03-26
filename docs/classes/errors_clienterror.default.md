[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Errors/ClientError](../modules/errors_clienterror.md) / default

# Class: default

[Errors/ClientError](../modules/errors_clienterror.md).default

## Hierarchy

* [*default*](errors___error.default.md)

  ↳ **default**

## Table of contents

### Constructors

- [constructor](errors_clienterror.default.md#constructor)

### Properties

- [\_message](errors_clienterror.default.md#_message)
- [code](errors_clienterror.default.md#code)
- [errorCode](errors_clienterror.default.md#errorcode)
- [exception](errors_clienterror.default.md#exception)
- [message](errors_clienterror.default.md#message)
- [meta](errors_clienterror.default.md#meta)
- [name](errors_clienterror.default.md#name)
- [stack](errors_clienterror.default.md#stack)

### Methods

- [toString](errors_clienterror.default.md#tostring)

## Constructors

### constructor

\+ **new default**(`message?`: *string* \| Error, `code?`: *number*, `exception?`: *string* \| Error): [*default*](errors_clienterror.default.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* \| Error | '' |
`code` | *number* | 0 |
`exception` | *string* \| Error | null |

**Returns:** [*default*](errors_clienterror.default.md)

Overrides: [default](errors___error.default.md)

Defined in: [Errors/ClientError.ts:5](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/ClientError.ts#L5)

## Properties

### \_message

• `Protected` **\_message**: *string*

Inherited from: [default](errors___error.default.md).[_message](errors___error.default.md#_message)

Defined in: [Errors/__Error.ts:6](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L6)

___

### code

• **code**: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md)

can also contains error like certificates error (https://nodejs.org/api/tls.html#tls_x509_certificate_error_codes) or other errors . Can be a string, or a number

Inherited from: [default](errors___error.default.md).[code](errors___error.default.md#code)

Defined in: [Errors/__Error.ts:14](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L14)

___

### errorCode

• **errorCode**: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md)

can also contains error like certificates error (https://nodejs.org/api/tls.html#tls_x509_certificate_error_codes) or other errors . Can be a string, or a number

Inherited from: [default](errors___error.default.md).[errorCode](errors___error.default.md#errorcode)

Defined in: [Errors/__Error.ts:10](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L10)

___

### exception

• **exception**: Error

Inherited from: [default](errors___error.default.md).[exception](errors___error.default.md#exception)

Defined in: [Errors/__Error.ts:15](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L15)

___

### message

• **message**: *string*

Inherited from: [default](errors___error.default.md).[message](errors___error.default.md#message)

Defined in: [Errors/__Error.ts:16](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L16)

___

### meta

• **meta**: [*IUnifiErrorMeta*](../interfaces/errors_unifierror.iunifierrormeta.md)

Defined in: [Errors/ClientError.ts:5](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/ClientError.ts#L5)

___

### name

• **name**: *string*= 'Error'

Inherited from: [default](errors___error.default.md).[name](errors___error.default.md#name)

Defined in: [Errors/__Error.ts:78](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L78)

___

### stack

• **stack**: *string*

Inherited from: [default](errors___error.default.md).[stack](errors___error.default.md#stack)

Defined in: [Errors/__Error.ts:5](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L5)

## Methods

### toString

▸ **toString**(): *string*

**Returns:** *string*

Inherited from: [default](errors___error.default.md)

Defined in: [Errors/__Error.ts:57](https://github.com/thib3113/unifi-client/blob/d186312/src/Errors/__Error.ts#L57)
