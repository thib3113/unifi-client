[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Controller](../modules/controller.md) / default

# Class: default

[Controller](../modules/controller.md).default

## Implements

* [*IController*](../interfaces/icontroller.icontroller-1.md)

## Table of contents

### Constructors

- [constructor](controller.default.md#constructor)

### Properties

- [\_sites](controller.default.md#_sites)
- [auth](controller.default.md#auth)
- [controllerInstance](controller.default.md#controllerinstance)
- [logged](controller.default.md#logged)
- [unifiOs](controller.default.md#unifios)
- [version](controller.default.md#version)

### Accessors

- [sites](controller.default.md#sites)

### Methods

- [addAxiosDebugInterceptors](controller.default.md#addaxiosdebuginterceptors)
- [addAxiosPlugins](controller.default.md#addaxiosplugins)
- [addAxiosProxyInterceptors](controller.default.md#addaxiosproxyinterceptors)
- [getSites](controller.default.md#getsites)
- [login](controller.default.md#login)
- [logout](controller.default.md#logout)
- [needLoggedIn](controller.default.md#needloggedin)

## Constructors

### constructor

\+ **new default**(`props`: [*IControllerProps*](../interfaces/controller.icontrollerprops.md)): [*default*](controller.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IControllerProps*](../interfaces/controller.icontrollerprops.md) |

**Returns:** [*default*](controller.default.md)

Defined in: [Controller.ts:35](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L35)

## Properties

### \_sites

• `Private` `Readonly` **\_sites**: [*default*](sites_sites.default.md)

Defined in: [Controller.ts:32](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L32)

___

### auth

• **auth**: [*default*](unifiauth.default.md)

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md).[auth](../interfaces/icontroller.icontroller-1.md#auth)

Defined in: [Controller.ts:31](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L31)

___

### controllerInstance

• `Readonly` **controllerInstance**: AxiosInstance

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md).[controllerInstance](../interfaces/icontroller.icontroller-1.md#controllerinstance)

Defined in: [Controller.ts:29](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L29)

___

### logged

• `Private` **logged**: *boolean*

Defined in: [Controller.ts:35](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L35)

___

### unifiOs

• **unifiOs**: *boolean*

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md).[unifiOs](../interfaces/icontroller.icontroller-1.md#unifios)

Defined in: [Controller.ts:33](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L33)

___

### version

• **version**: *string*= '7.0.0'

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md).[version](../interfaces/icontroller.icontroller-1.md#version)

Defined in: [Controller.ts:34](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L34)

## Accessors

### sites

• get **sites**(): [*default*](sites_sites.default.md)

**Returns:** [*default*](sites_sites.default.md)

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md).[sites](../interfaces/icontroller.icontroller-1.md#sites)

Defined in: [Controller.ts:25](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L25)

## Methods

### addAxiosDebugInterceptors

▸ **addAxiosDebugInterceptors**(): *void*

**Returns:** *void*

Defined in: [Controller.ts:87](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L87)

___

### addAxiosPlugins

▸ **addAxiosPlugins**(): *void*

**Returns:** *void*

Defined in: [Controller.ts:181](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L181)

___

### addAxiosProxyInterceptors

▸ **addAxiosProxyInterceptors**(): *void*

**Returns:** *void*

Defined in: [Controller.ts:172](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L172)

___

### getSites

▸ **getSites**(): *Promise*<[*default*](sites_site.default.md)[]\>

**Returns:** *Promise*<[*default*](sites_site.default.md)[]\>

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md)

Defined in: [Controller.ts:69](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L69)

___

### login

▸ **login**(): *Promise*<[*IUser*](../interfaces/user_iuser.iuser.md)\>

**Returns:** *Promise*<[*IUser*](../interfaces/user_iuser.iuser.md)\>

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md)

Defined in: [Controller.ts:74](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L74)

___

### logout

▸ **logout**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Implementation of: [IController](../interfaces/icontroller.icontroller-1.md)

Defined in: [Controller.ts:82](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L82)

___

### needLoggedIn

▸ `Private`**needLoggedIn**(): *void*

**Returns:** *void*

Defined in: [Controller.ts:63](https://github.com/thib3113/unifi-client/blob/54bf19f/src/Controller.ts#L63)
