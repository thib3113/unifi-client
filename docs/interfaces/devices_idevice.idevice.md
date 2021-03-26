[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / [Devices/IDevice](../modules/devices_idevice.md) / IDevice

# Interface: IDevice

[Devices/IDevice](../modules/devices_idevice.md).IDevice

## Hierarchy

* [*IUnknownDevice*](devices_iunknowndevice.iunknowndevice.md)

  ↳ **IDevice**

## Implemented by

* [*default*](../classes/devices_device.default.md)

## Table of contents

### Properties

- [\_id](devices_idevice.idevice.md#_id)
- [confidence](devices_idevice.idevice.md#confidence)
- [dev\_cat](devices_idevice.idevice.md#dev_cat)
- [dev\_family](devices_idevice.idevice.md#dev_family)
- [dev\_id](devices_idevice.idevice.md#dev_id)
- [dev\_id\_override](devices_idevice.idevice.md#dev_id_override)
- [dev\_vendor](devices_idevice.idevice.md#dev_vendor)
- [fingerprint\_engine\_version](devices_idevice.idevice.md#fingerprint_engine_version)
- [fingerprint\_override](devices_idevice.idevice.md#fingerprint_override)
- [fingerprint\_source](devices_idevice.idevice.md#fingerprint_source)
- [first\_seen](devices_idevice.idevice.md#first_seen)
- [fixed\_ip](devices_idevice.idevice.md#fixed_ip)
- [hostname](devices_idevice.idevice.md#hostname)
- [is\_guest](devices_idevice.idevice.md#is_guest)
- [is\_wired](devices_idevice.idevice.md#is_wired)
- [last\_seen](devices_idevice.idevice.md#last_seen)
- [mac](devices_idevice.idevice.md#mac)
- [name](devices_idevice.idevice.md#name)
- [network\_id](devices_idevice.idevice.md#network_id)
- [note](devices_idevice.idevice.md#note)
- [noted](devices_idevice.idevice.md#noted)
- [os\_name](devices_idevice.idevice.md#os_name)
- [oui](devices_idevice.idevice.md#oui)
- [site\_id](devices_idevice.idevice.md#site_id)
- [use\_fixedip](devices_idevice.idevice.md#use_fixedip)
- [user\_group\_id](devices_idevice.idevice.md#user_group_id)

## Properties

### \_id

• **\_id**: *string*

Defined in: [Devices/IDevice.ts:4](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L4)

___

### confidence

• **confidence**: *number*

Defined in: [Devices/IDevice.ts:18](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L18)

___

### dev\_cat

• **dev\_cat**: *number*

Defined in: [Devices/IDevice.ts:13](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L13)

___

### dev\_family

• **dev\_family**: *number*

Defined in: [Devices/IDevice.ts:14](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L14)

___

### dev\_id

• **dev\_id**: *number*

Defined in: [Devices/IDevice.ts:17](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L17)

___

### dev\_id\_override

• **dev\_id\_override**: *number*

Defined in: [Devices/IDevice.ts:11](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L11)

___

### dev\_vendor

• **dev\_vendor**: *number*

Defined in: [Devices/IDevice.ts:16](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L16)

___

### fingerprint\_engine\_version

• `Optional` **fingerprint\_engine\_version**: *string*

Defined in: [Devices/IDevice.ts:20](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L20)

___

### fingerprint\_override

• **fingerprint\_override**: *boolean*

Defined in: [Devices/IDevice.ts:10](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L10)

___

### fingerprint\_source

• **fingerprint\_source**: *number*

Defined in: [Devices/IDevice.ts:12](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L12)

___

### first\_seen

• **first\_seen**: *number*

Defined in: [Devices/IDevice.ts:7](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L7)

___

### fixed\_ip

• `Optional` **fixed\_ip**: *string*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[fixed_ip](devices_iunknowndevice.iunknowndevice.md#fixed_ip)

Defined in: [Devices/IUnknownDevice.ts:12](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L12)

___

### hostname

• **hostname**: *string*

Defined in: [Devices/IDevice.ts:9](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L9)

___

### is\_guest

• **is\_guest**: *boolean*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[is_guest](devices_iunknowndevice.iunknowndevice.md#is_guest)

Defined in: [Devices/IUnknownDevice.ts:9](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L9)

___

### is\_wired

• **is\_wired**: *boolean*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[is_wired](devices_iunknowndevice.iunknowndevice.md#is_wired)

Defined in: [Devices/IUnknownDevice.ts:10](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L10)

___

### last\_seen

• **last\_seen**: *number*

Defined in: [Devices/IDevice.ts:8](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L8)

___

### mac

• **mac**: *string*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[mac](devices_iunknowndevice.iunknowndevice.md#mac)

Defined in: [Devices/IUnknownDevice.ts:4](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L4)

___

### name

• **name**: *string*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[name](devices_iunknowndevice.iunknowndevice.md#name)

Defined in: [Devices/IUnknownDevice.ts:6](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L6)

___

### network\_id

• `Optional` **network\_id**: *string*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[network_id](devices_iunknowndevice.iunknowndevice.md#network_id)

Defined in: [Devices/IUnknownDevice.ts:13](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L13)

___

### note

• **note**: *string*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[note](devices_iunknowndevice.iunknowndevice.md#note)

Defined in: [Devices/IUnknownDevice.ts:7](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L7)

___

### noted

• **noted**: *boolean*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[noted](devices_iunknowndevice.iunknowndevice.md#noted)

Defined in: [Devices/IUnknownDevice.ts:8](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L8)

___

### os\_name

• **os\_name**: *number*

Defined in: [Devices/IDevice.ts:15](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L15)

___

### oui

• **oui**: *string*

Defined in: [Devices/IDevice.ts:6](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L6)

___

### site\_id

• **site\_id**: *string*

Defined in: [Devices/IDevice.ts:5](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IDevice.ts#L5)

___

### use\_fixedip

• `Optional` **use\_fixedip**: *boolean*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[use_fixedip](devices_iunknowndevice.iunknowndevice.md#use_fixedip)

Defined in: [Devices/IUnknownDevice.ts:14](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L14)

___

### user\_group\_id

• `Optional` **user\_group\_id**: *string*

Inherited from: [IUnknownDevice](devices_iunknowndevice.iunknowndevice.md).[user_group_id](devices_iunknowndevice.iunknowndevice.md#user_group_id)

Defined in: [Devices/IUnknownDevice.ts:5](https://github.com/thib3113/unifi-client/blob/8d1ef7c/src/Devices/IUnknownDevice.ts#L5)
