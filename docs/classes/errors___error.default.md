[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Errors/__Error](../modules/errors___error.md) / default

# Class: default

[Errors/__Error](../modules/errors___error.md).default

## Hierarchy

* **default**

  ↳ [*default*](errors_clienterror.default.md)

  ↳ [*default*](errors_unifierror.default.md)

## Implements

* *Error*

## Table of contents

### Constructors

- [constructor](errors___error.default.md#constructor)

### Properties

- [\_message](errors___error.default.md#_message)
- [code](errors___error.default.md#code)
- [errorCode](errors___error.default.md#errorcode)
- [exception](errors___error.default.md#exception)
- [message](errors___error.default.md#message)
- [name](errors___error.default.md#name)
- [stack](errors___error.default.md#stack)

### Methods

- [toString](errors___error.default.md#tostring)

## Constructors

### constructor

\+ **new default**(`message?`: *string* \| Error, `code?`: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md), `exception?`: *string* \| Error): [*default*](errors___error.default.md)

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`message` | *string* \| Error | '' |
`code` | [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md) | - |
`exception` | *string* \| Error | null |

**Returns:** [*default*](errors___error.default.md)

Defined in: [Errors/__Error.ts:16](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L16)

## Properties

### \_message

• `Protected` **\_message**: *string*

Defined in: [Errors/__Error.ts:6](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L6)

___

### code

• **code**: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md)

can also contains error like certificates error (https://nodejs.org/api/tls.html#tls_x509_certificate_error_codes) or other errors . Can be a string, or a number

Defined in: [Errors/__Error.ts:14](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L14)

___

### errorCode

• **errorCode**: [*EErrorsCodes*](../enums/errors_eerrorscodes.eerrorscodes.md)

can also contains error like certificates error (https://nodejs.org/api/tls.html#tls_x509_certificate_error_codes) or other errors . Can be a string, or a number

Defined in: [Errors/__Error.ts:10](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L10)

___

### exception

• **exception**: Error

Defined in: [Errors/__Error.ts:15](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L15)

___

### message

• **message**: *string*

Implementation of: void

Defined in: [Errors/__Error.ts:16](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L16)

___

### name

• **name**: *string*= 'Error'

Implementation of: void

Defined in: [Errors/__Error.ts:78](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L78)

___

### stack

• **stack**: *string*

Implementation of: void

Defined in: [Errors/__Error.ts:5](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L5)

## Methods

### toString

▸ **toString**(): *string*

**Returns:** *string*

Defined in: [Errors/__Error.ts:57](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Errors/__Error.ts#L57)
