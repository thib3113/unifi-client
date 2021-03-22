[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [IController](../modules/icontroller.md) / IController

# Interface: IController

[IController](../modules/icontroller.md).IController

## Implemented by

* [*default*](../classes/controller.default.md)

## Table of contents

### Properties

- [auth](icontroller.icontroller-1.md#auth)
- [controllerInstance](icontroller.icontroller-1.md#controllerinstance)
- [sites](icontroller.icontroller-1.md#sites)
- [unifiOs](icontroller.icontroller-1.md#unifios)
- [version](icontroller.icontroller-1.md#version)

### Methods

- [getSites](icontroller.icontroller-1.md#getsites)
- [login](icontroller.icontroller-1.md#login)
- [logout](icontroller.icontroller-1.md#logout)

## Properties

### auth

• **auth**: [*default*](../classes/unifiauth.default.md)

Defined in: [IController.ts:9](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L9)

___

### controllerInstance

• **controllerInstance**: AxiosInstance

Defined in: [IController.ts:10](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L10)

___

### sites

• **sites**: [*default*](../classes/sites_sites.default.md)

Defined in: [IController.ts:11](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L11)

___

### unifiOs

• **unifiOs**: *boolean*

Defined in: [IController.ts:12](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L12)

___

### version

• **version**: *string*

Defined in: [IController.ts:8](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L8)

## Methods

### getSites

▸ **getSites**(): *Promise*<[*default*](../classes/sites_site.default.md)[]\>

**Returns:** *Promise*<[*default*](../classes/sites_site.default.md)[]\>

Defined in: [IController.ts:14](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L14)

___

### login

▸ **login**(): *Promise*<[*IUser*](user_iuser.iuser.md)\>

**Returns:** *Promise*<[*IUser*](user_iuser.iuser.md)\>

Defined in: [IController.ts:16](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L16)

___

### logout

▸ **logout**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [IController.ts:18](https://github.com/thib3113/unifi-client/blob/7789674/src/IController.ts#L18)
