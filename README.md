
# unifi-client
[![NPM version](http://img.shields.io/npm/v/unifi-client.svg)](https://www.npmjs.com/package/unifi-client) 
[![CI](https://github.com/thib3113/unifi-client/actions/workflows/CI.yml/badge.svg)](https://github.com/thib3113/unifi-client/actions/workflows/CI.yml) 
[![codecov](https://codecov.io/gh/thib3113/unifi-client/branch/main/graph/badge.svg?token=MZKEJ9F2WR)](https://codecov.io/gh/thib3113/unifi-client) 
[![Downloads](https://img.shields.io/npm/dm/unifi-client.svg)](https://www.npmjs.com/package/unifi-client) 
[![License](https://img.shields.io/github/license/thib3113/unifi-client.svg)](https://github.com/thib3113/unifi-client/blob/main/LICENSE) 
[![Known Vulnerabilities](https://snyk.io/test/github/thib3113/unifi-client/badge.svg)](https://snyk.io/test/github/thib3113/unifi-client) 
[![Dependencies status](https://david-dm.org/thib3113/unifi-client.svg)](https://david-dm.org/thib3113/unifi-client) 
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg?logo=paypal)](https://paypal.me/thib3113) 
[![GitHub stars](https://img.shields.io/github/stars/thib3113/unifi-client.svg?style=social&label=Star)](https://github.com/thib3113/unifi-client/stargazers/)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=bugs)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=code_smells)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=ncloc)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=security_rating)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=sqale_index)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client) 
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=thib3113_unifi-client&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=thib3113_unifi-client)

![Dependencies update - renovate](https://img.shields.io/badge/renovate-enabled-green?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjUgNSAzNzAgMzcwIj48Y2lyY2xlIGN4PSIxODkiIGN5PSIxOTAiIHI9IjE4NCIgZmlsbD0iI2ZlMiIvPjxwYXRoIGZpbGw9IiM4YmIiIGQ9Ik0yNTEgMjU2bC0zOC0zOGExNyAxNyAwIDAxMC0yNGw1Ni01NmMyLTIgMi02IDAtN2wtMjAtMjFhNSA1IDAgMDAtNyAwbC0xMyAxMi05LTggMTMtMTNhMTcgMTcgMCAwMTI0IDBsMjEgMjFjNyA3IDcgMTcgMCAyNGwtNTYgNTdhNSA1IDAgMDAwIDdsMzggMzh6Ii8+PHBhdGggZmlsbD0iI2Q1MSIgZD0iTTMwMCAyODhsLTggOGMtNCA0LTExIDQtMTYgMGwtNDYtNDZjLTUtNS01LTEyIDAtMTZsOC04YzQtNCAxMS00IDE1IDBsNDcgNDdjNCA0IDQgMTEgMCAxNXoiLz48cGF0aCBmaWxsPSIjYjMwIiBkPSJNMjg1IDI1OGw3IDdjNCA0IDQgMTEgMCAxNWwtOCA4Yy00IDQtMTEgNC0xNiAwbC02LTdjNCA1IDExIDUgMTUgMGw4LTdjNC01IDQtMTIgMC0xNnoiLz48cGF0aCBmaWxsPSIjYTMwIiBkPSJNMjkxIDI2NGw4IDhjNCA0IDQgMTEgMCAxNmwtOCA3Yy00IDUtMTEgNS0xNSAwbC05LThjNSA1IDEyIDUgMTYgMGw4LThjNC00IDQtMTEgMC0xNXoiLz48cGF0aCBmaWxsPSIjZTYyIiBkPSJNMjYwIDIzM2wtNC00Yy02LTYtMTctNi0yMyAwLTcgNy03IDE3IDAgMjRsNCA0Yy00LTUtNC0xMSAwLTE2bDgtOGM0LTQgMTEtNCAxNSAweiIvPjxwYXRoIGZpbGw9IiNiNDAiIGQ9Ik0yODQgMzA0Yy00IDAtOC0xLTExLTRsLTQ3LTQ3Yy02LTYtNi0xNiAwLTIybDgtOGM2LTYgMTYtNiAyMiAwbDQ3IDQ2YzYgNyA2IDE3IDAgMjNsLTggOGMtMyAzLTcgNC0xMSA0em0tMzktNzZjLTEgMC0zIDAtNCAybC04IDdjLTIgMy0yIDcgMCA5bDQ3IDQ3YTYgNiAwIDAwOSAwbDctOGMzLTIgMy02IDAtOWwtNDYtNDZjLTItMi0zLTItNS0yeiIvPjxwYXRoIGZpbGw9IiMxY2MiIGQ9Ik0xNTIgMTEzbDE4LTE4IDE4IDE4LTE4IDE4em0xLTM1bDE4LTE4IDE4IDE4LTE4IDE4em0tOTAgODlsMTgtMTggMTggMTgtMTggMTh6bTM1LTM2bDE4LTE4IDE4IDE4LTE4IDE4eiIvPjxwYXRoIGZpbGw9IiMxZGQiIGQ9Ik0xMzQgMTMxbDE4LTE4IDE4IDE4LTE4IDE4em0tMzUgMzZsMTgtMTggMTggMTgtMTggMTh6Ii8+PHBhdGggZmlsbD0iIzJiYiIgZD0iTTExNiAxNDlsMTgtMTggMTggMTgtMTggMTh6bTU0LTU0bDE4LTE4IDE4IDE4LTE4IDE4em0tODkgOTBsMTgtMTggMTggMTgtMTggMTh6bTEzOS04NWwyMyAyM2M0IDQgNCAxMSAwIDE2TDE0MiAyNDBjLTQgNC0xMSA0LTE1IDBsLTI0LTI0Yy00LTQtNC0xMSAwLTE1bDEwMS0xMDFjNS01IDEyLTUgMTYgMHoiLz48cGF0aCBmaWxsPSIjM2VlIiBkPSJNMTM0IDk1bDE4LTE4IDE4IDE4LTE4IDE4em0tNTQgMThsMTgtMTcgMTggMTctMTggMTh6bTU1LTUzbDE4LTE4IDE4IDE4LTE4IDE4em05MyA0OGwtOC04Yy00LTUtMTEtNS0xNiAwTDEwMyAyMDFjLTQgNC00IDExIDAgMTVsOCA4Yy00LTQtNC0xMSAwLTE1bDEwMS0xMDFjNS00IDEyLTQgMTYgMHoiLz48cGF0aCBmaWxsPSIjOWVlIiBkPSJNMjcgMTMxbDE4LTE4IDE4IDE4LTE4IDE4em01NC01M2wxOC0xOCAxOCAxOC0xOCAxOHoiLz48cGF0aCBmaWxsPSIjMGFhIiBkPSJNMjMwIDExMGwxMyAxM2M0IDQgNCAxMSAwIDE2TDE0MiAyNDBjLTQgNC0xMSA0LTE1IDBsLTEzLTEzYzQgNCAxMSA0IDE1IDBsMTAxLTEwMWM1LTUgNS0xMSAwLTE2eiIvPjxwYXRoIGZpbGw9IiMxYWIiIGQ9Ik0xMzQgMjQ4Yy00IDAtOC0yLTExLTVsLTIzLTIzYTE2IDE2IDAgMDEwLTIzTDIwMSA5NmExNiAxNiAwIDAxMjIgMGwyNCAyNGM2IDYgNiAxNiAwIDIyTDE0NiAyNDNjLTMgMy03IDUtMTIgNXptNzgtMTQ3bC00IDItMTAxIDEwMWE2IDYgMCAwMDAgOWwyMyAyM2E2IDYgMCAwMDkgMGwxMDEtMTAxYTYgNiAwIDAwMC05bC0yNC0yMy00LTJ6Ii8+PC9zdmc+  
)

[![NPM](https://nodei.co/npm/unifi-client.png)](https://nodei.co/npm/unifi-client/)

This library is a nodejs client to talk with unifi rest API .

## Example
```typescript  
import Controller from 'unifi-client'  
  
//only works with local accounts  
const controller = new Controller({  
  username: 'ubnt',  
  password: 'ubnt',  
  url: 'https://unifi',  
  strictSSL: false  
});  

//login to the controller
await controller.login()  
  
//retrieve sites  
const sites = controller.getSites()  
  
//work on one site  
const site = sites[0];  
  
//example request to get firewall rules  
const rules = await site.firewall.getRules();  
```  
---  

To work on multiples sites on the same time
```typescript  
const controller = new Controller({...});  
  
const sites = controller.getSites();  
  
//get firewallRules on two sites  
const rules = await site[0].firewall.getRules();  
const rules2 = await site[1].firewall.getRules();  
```  

How to use the HTTP instances
```typescript      
//use the controller instance directly . Authentication, url construction and other is already managed for you  
const self = controller.getInstance().get('/api/self');  
  
//for a custom site :   
const topology = site.getInstance().get('/topology');
```

Get firewall rules, it return an array of [FWRule](https://thib3113.github.io/unifi-client/classes/Firewall_FWRule.FWRule.html)

```typescript
const rules = await site.firewall.getRules();
```

###Instances
The instances returned by `getInstance` are basicaly some [axios instances](https://github.com/axios/axios#instance-methods) . With some additions : 
```typescript
//url params
// use them to manage a rest url for example
instance.get('/url/:uuid', {
    urlParams: {
        uuid: 'my-uuid'
    }
}) 
// will call the url /url/my-uuid


// apiVersion : 
// some api call are on the v2 api, so you can set the api version when calling
console.log(site.name); // default
site.getInstance().get('/super/endpoint', {
    apiVersion: 2
});
// will call the url /v2/api/site/default/super/endpoint
```

### how to use URLs from the unifi front : 
The urls of unifi are like :

- `/proxy/network/v2/api/site/default/notifications` for unifiOs
or
- `/v2/api/site/default/notifications` for non unifiOs

the url is constructed like : 
`/[v<ApiVersion>/]api/site/<sitename>[/<urlToCall>]`
- ApiVersion : the version of the API (for version > 1)
- sitename : the name of the site (already included in site instance)

To illustrate, to call the url I see on my browser network tabs : 

`https://192.168.1.1/proxy/network/v2/api/site/default/notifications`

I just need to :
```typescript
// configure my controller
const controller = new Controller({
    username: 'ubnt',
    password: 'ubnt',
    url: 'https://192.168.1.1',
    strictSSL: false
});

//login to the controller
await controller.login()

//retrieve sites  
const sites = controller.getSites()

// select the site "default"
const site = sites.find((site) => site.name === 'default');

//call my url
const notifications = site.getInstance().get('/default/notifications', {
    apiVersion: 2
});

//do something with notifications
```

More examples in the folder [examples](./examples)

## Websockets
This library supports websockets, you can listen on them with : 
```typescript
// initWebSockets for controller :
await controller.initWebSockets();

// listen for controller websockets ( only for unifiOS )
controller.on() / controller.ws.on()

// listen for super site websockets
controller.superWS.on();


// initWebSockets for site :
await site.initWebSockets();
// listen for this site websockets
site.on() / site.ws.on()

// doesn't known the name of the event ? you can listen on joker : 
controller.on('*', (eventName, ...args) => {
    console.log(eventName, ...args);
});

// want to listen on all websockets of a controller on the same listener 
// all websockets registered : 
// - controller websockets if unifiOS 
// - super site WS
// - all sites where ws are init ( closed or not )
controller.globalWS.on('*', (eventName, ...args) => {
    console.log(eventName, ...args);
});
```

the support of websocket is experimental, and with a really bad coverage . Doesn't hesitate to open a PR, to add more websockets types

## Technical documentation
All the technical documentation is available [here](https://thib3113.github.io/unifi-client/modules)

## Work In Progress
check [technical documentation](https://thib3113.github.io/unifi-client/modules) for available methods

## Tests
This library is auto-tested on :
- UDM-pro : `latest`
- Unifi controller : `latest`, `6.2.25`, `6.1.71`, `6.0.45`, `6.0.43`, `6.0.41`, `6.0.36`, `6.0.28`, `6.0.23`
## References
This nodejs package/class uses functionality/Know-How gathered from different third-party projects:

* [UniFi-API-client](https://github.com/Art-of-WiFi/UniFi-API-client)
* [unifi_sh_api](https://dl.ui.com/unifi/5.12.35/unifi_sh_api)
* [node-unifi](https://github.com/jens-maus/node-unifi)

## Debug
To debug, you can use the [debug](https://www.npmjs.com/package/debug) library, just set the `DEBUG` environnement variable ([check this](https://github.com/visionmedia/debug#cmd)) .

* `unifi-client` : base debug namespace
* `unifi-client:<className>` : will show debug for this class (eg : unifi-client:Controller will log controller logs )
* `unifi-client:axios` : will logs axios request (can contain secrets informations)
* `unifi-client:axios:verbose` : will logs more things on axios, like send and receive payload (can contain secrets informations)
* `unifi-client:axios:curl` : will log curl cmd corresponding to the axios request (can contain secrets informations)

## Useful links
ubntwiki : https://ubntwiki.com/products/software/unifi-controller/api
