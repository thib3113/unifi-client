[unifi-client - v0.0.22](../README.md) / [Exports](../modules.md) / [UnifiAuth](../modules/unifiauth.md) / default

# Class: default

[UnifiAuth](../modules/unifiauth.md).default

## Hierarchy

* [*default*](commons_objectwithprivatevalues.default.md)

  ↳ **default**

## Table of contents

### Constructors

- [constructor](unifiauth.default.md#constructor)

### Properties

- [csrfToken](unifiauth.default.md#csrftoken)
- [instance](unifiauth.default.md#instance)
- [rememberMe](unifiauth.default.md#rememberme)
- [token](unifiauth.default.md#token)
- [unifiOs](unifiauth.default.md#unifios)

### Accessors

- [password](unifiauth.default.md#password)
- [privateMap](unifiauth.default.md#privatemap)
- [username](unifiauth.default.md#username)

### Methods

- [addInterceptors](unifiauth.default.md#addinterceptors)
- [getCookieTokenName](unifiauth.default.md#getcookietokenname)
- [getCookies](unifiauth.default.md#getcookies)
- [getPrivate](unifiauth.default.md#getprivate)
- [getToken](unifiauth.default.md#gettoken)
- [getVersion](unifiauth.default.md#getversion)
- [login](unifiauth.default.md#login)
- [logout](unifiauth.default.md#logout)
- [setPrivate](unifiauth.default.md#setprivate)

## Constructors

### constructor

\+ **new default**(`props`: [*IUnifiAuthProps*](../interfaces/unifiauth.iunifiauthprops.md), `instance`: AxiosInstance): [*default*](unifiauth.default.md)

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IUnifiAuthProps*](../interfaces/unifiauth.iunifiauthprops.md) |
`instance` | AxiosInstance |

**Returns:** [*default*](unifiauth.default.md)

Overrides: [default](commons_objectwithprivatevalues.default.md)

Defined in: [UnifiAuth.ts:46](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L46)

## Properties

### csrfToken

• `Private` **csrfToken**: *string*

Defined in: [UnifiAuth.ts:46](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L46)

___

### instance

• `Private` **instance**: AxiosInstance

Defined in: [UnifiAuth.ts:22](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L22)

___

### rememberMe

• `Private` `Readonly` **rememberMe**: *boolean*

Defined in: [UnifiAuth.ts:23](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L23)

___

### token

• `Private` **token**: *string*

Defined in: [UnifiAuth.ts:45](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L45)

___

### unifiOs

• **unifiOs**: *boolean*

Defined in: [UnifiAuth.ts:24](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L24)

## Accessors

### password

• `Private`get **password**(): *string*

**Returns:** *string*

Defined in: [UnifiAuth.ts:33](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L33)

• `Private`set **password**(`data`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *void*

Defined in: [UnifiAuth.ts:37](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L37)

___

### privateMap

• `Protected`get **privateMap**(): *WeakMap*<any, any\>

**Returns:** *WeakMap*<any, any\>

Defined in: [commons/ObjectWithPrivateValues.ts:18](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/ObjectWithPrivateValues.ts#L18)

___

### username

• `Private`get **username**(): *string*

**Returns:** *string*

Defined in: [UnifiAuth.ts:25](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L25)

• `Private`set **username**(`data`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`data` | *string* |

**Returns:** *void*

Defined in: [UnifiAuth.ts:29](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L29)

## Methods

### addInterceptors

▸ `Private`**addInterceptors**(): *void*

**Returns:** *void*

Defined in: [UnifiAuth.ts:71](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L71)

___

### getCookieTokenName

▸ `Private`**getCookieTokenName**(): *string*

**Returns:** *string*

Defined in: [UnifiAuth.ts:41](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L41)

___

### getCookies

▸ `Private`**getCookies**(`res`: *AxiosResponse*<any\>): CookieMap

#### Parameters:

Name | Type |
:------ | :------ |
`res` | *AxiosResponse*<any\> |

**Returns:** CookieMap

Defined in: [UnifiAuth.ts:129](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L129)

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

Defined in: [commons/ObjectWithPrivateValues.ts:6](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/ObjectWithPrivateValues.ts#L6)

___

### getToken

▸ `Private`**getToken**(): *Promise*<string\>

**Returns:** *Promise*<string\>

Defined in: [UnifiAuth.ts:200](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L200)

___

### getVersion

▸ **getVersion**(): *Promise*<any\>

**Returns:** *Promise*<any\>

Defined in: [UnifiAuth.ts:188](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L188)

___

### login

▸ **login**(): *Promise*<[*IUser*](../interfaces/user_iuser.iuser.md)\>

**Returns:** *Promise*<[*IUser*](../interfaces/user_iuser.iuser.md)\>

Defined in: [UnifiAuth.ts:136](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L136)

___

### logout

▸ **logout**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Defined in: [UnifiAuth.ts:184](https://github.com/thib3113/unifi-client/blob/6f710a8/src/UnifiAuth.ts#L184)

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

Defined in: [commons/ObjectWithPrivateValues.ts:11](https://github.com/thib3113/unifi-client/blob/6f710a8/src/commons/ObjectWithPrivateValues.ts#L11)
