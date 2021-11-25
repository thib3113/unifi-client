import { _ObjectSubSite, tDevice } from '../commons';
import { EProxyNamespaces, IUnifiResponseEnveloppe } from '../interfaces';
import { checkNeeds, createDebugger } from '../util';
import { IBaseNetworkDeviceRaw, ILANDeviceRaw, IWLANDeviceRaw } from './Network';
import { DeviceMapper } from './mappers/DeviceMapper';
import { EProductLine } from './EProductLine';
import { IBaseLEDDeviceRaw } from './LED';
import { IBaseConnectDeviceRaw } from './Connect';
import { IBaseProtectDeviceRaw } from './Protect';
import { IBaseTalkDeviceRaw } from './Talk';
import { IBaseAccessDeviceRaw } from './Access';

const debug = createDebugger('Devices');

export class Devices extends _ObjectSubSite {
    /**
     * allow to list unifi devices
     *
     *
     */
    public async list(): Promise<Array<tDevice>> {
        debug('list');

        if (checkNeeds(this.controller, '6.4.50')) {
            const res = (
                await this.instance.get<{
                    access_devices: Array<IBaseAccessDeviceRaw>;
                    connect_devices: Array<IBaseConnectDeviceRaw>;
                    led_devices: Array<IBaseLEDDeviceRaw>;
                    network_devices: Array<IBaseNetworkDeviceRaw>;
                    protect_devices: Array<IBaseProtectDeviceRaw>;
                    talk_devices: Array<IBaseTalkDeviceRaw>;
                }>('/device', {
                    proxyNamespace: EProxyNamespaces.NETWORK,
                    apiVersion: 2
                })
            ).data;

            const devices: Array<Promise<tDevice | undefined>> = [];

            //add access devices
            res.access_devices.forEach((d) => devices.push(DeviceMapper.mapDevice(d, EProductLine.ACCESS, this.config)));
            //add connect devices
            res.connect_devices.forEach((d) => devices.push(DeviceMapper.mapDevice(d, EProductLine.CONNECT, this.config)));
            //add LED devices
            res.led_devices.forEach((d) => devices.push(DeviceMapper.mapDevice(d, EProductLine.LED, this.config)));
            //add network devices
            res.network_devices.forEach((d) => devices.push(DeviceMapper.mapDevice(d, EProductLine.NETWORK, this.config)));
            //add protect devices
            res.protect_devices.forEach((d) => devices.push(DeviceMapper.mapDevice(d, EProductLine.PROTECT, this.config)));
            //add talk devices
            res.talk_devices.forEach((d) => devices.push(DeviceMapper.mapDevice(d, EProductLine.TALK, this.config)));

            //remove undefined values
            return (await Promise.all(devices)).filter((v) => !!v) as Array<tDevice>;
        } else {
            return this.listOld();
        }
    }

    public async listOldRaw(): Promise<Array<ILANDeviceRaw | IWLANDeviceRaw | IBaseNetworkDeviceRaw>> {
        return (
            (
                await this.instance.get<IUnifiResponseEnveloppe<Array<ILANDeviceRaw | IWLANDeviceRaw | IBaseNetworkDeviceRaw>>>(
                    '/stat/device'
                )
            ).data?.data || []
        );
    }

    public async listOld(): Promise<Array<tDevice>> {
        return (
            ((await Promise.all((await this.listOldRaw()).map((d) => DeviceMapper.mapDevice(d, EProductLine.NETWORK, this.config)))).filter(
                (v) => !!v
            ) as Array<tDevice>) || []
        );
    }
}
