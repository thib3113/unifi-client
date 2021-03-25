[unifi-client - v0.1.0](../README.md) / [Exports](../modules.md) / index

# Module: index

## Table of contents

### References

- [ClientError](index.md#clienterror)
- [Controller](index.md#controller)
- [Devices](index.md#devices)
- [Firewall](index.md#firewall)
- [GuestAuthorization](index.md#guestauthorization)
- [Hotspots](index.md#hotspots)
- [ISite](index.md#isite)
- [UnifiError](index.md#unifierror)
- [\_\_Error](index.md#__error)
- [default](index.md#default)

### Enumerations

- [EErrorsCodes](../enums/index.eerrorscodes.md)

### Interfaces

- [IAuthorizeGuest](../interfaces/index.iauthorizeguest.md)
- [IFWGroup](../interfaces/index.ifwgroup.md)
- [IFWRule](../interfaces/index.ifwrule.md)
- [IGuestAuthorization](../interfaces/index.iguestauthorization.md)

### Type aliases

- [AuthorizedBy](index.md#authorizedby)
- [FWRuleActions](index.md#fwruleactions)
- [ipString](index.md#ipstring)
- [networkConfType](index.md#networkconftype)
- [ruleSet](index.md#ruleset)

## References

### ClientError

Renames and exports: [default](../classes/errors_clienterror.default.md)

___

### Controller

Renames and exports: [default](../classes/controller.default.md)

___

### Devices

Renames and exports: [default](../classes/devices_devices.default.md)

___

### Firewall

Renames and exports: [default](../classes/firewall_firewall.default.md)

___

### GuestAuthorization

Renames and exports: [default](../classes/hotspot_guestauthorization.default.md)

___

### Hotspots

Renames and exports: [default](../classes/hotspot_hotspots.default.md)

___

### ISite

Re-exports: [ISite](../interfaces/sites_isite.isite.md)

___

### UnifiError

Renames and exports: [default](../classes/errors_unifierror.default.md)

___

### \_\_Error

Renames and exports: [default](../classes/errors___error.default.md)

___

### default

Re-exports: [default](../classes/controller.default.md)

## Type aliases

### AuthorizedBy

Ƭ **AuthorizedBy**: *api* \| *string*

Defined in: [Hotspot/IGuestAuthorization.ts:3](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/Hotspot/IGuestAuthorization.ts#L3)

___

### FWRuleActions

Ƭ **FWRuleActions**: *drop* \| *accept* \| *reject*

Defined in: [interfaces.ts:23](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/interfaces.ts#L23)

___

### ipString

Ƭ **ipString**: *string*

Defined in: [interfaces.ts:25](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/interfaces.ts#L25)

___

### networkConfType

Ƭ **networkConfType**: *NETv4* \| *ADDRv4* \| *string*

Defined in: [interfaces.ts:2](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/interfaces.ts#L2)

___

### ruleSet

Ƭ **ruleSet**: *WAN_IN* \| *WAN_OUT* \| *WAN_LOCAL* \| *LAN_IN* \| *LAN_OUT* \| *LAN_LOCAL* \| *GUEST_IN* \| *GUEST_OUT* \| *GUEST_LOCAL* \| *WANv6_IN* \| *WANv6_OUT* \| *WANv6_LOCAL* \| *LANv6_IN* \| *LANv6_OUT* \| *LANv6_LOCAL* \| *GUESTv6_IN* \| *GUESTv6_OUT* \| *GUESTv6_LOCAL*

Defined in: [interfaces.ts:3](https://github.com/thib3113/unifi-client/blob/a5b15ed/src/interfaces.ts#L3)
