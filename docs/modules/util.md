[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / util

# Module: util

## Table of contents

### Functions

- [createDebugger](util.md#createdebugger)
- [getUrlRepresentation](util.md#geturlrepresentation)

## Functions

### createDebugger

▸ `Const`**createDebugger**(`name`: *string*): Debugger

create a debugger extending the default debugger

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | name for the debugger    |

**Returns:** Debugger

Defined in: [util.ts:10](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/util.ts#L10)

___

### getUrlRepresentation

▸ `Const`**getUrlRepresentation**(`req`: AxiosRequestConfig, `hidePassword?`: *boolean*): *string*

used to log an url

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`req` | AxiosRequestConfig | - | the AxiosRequestConfig object from axios   |
`hidePassword` | *boolean* | true | to hide "auth" part of the url    |

**Returns:** *string*

Defined in: [util.ts:22](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/util.ts#L22)
