import { BaseDevice } from './BaseDevice';
import { IWLANDeviceRaw } from './IWLANDeviceRaw';
import { IAccMeterStats, IAntennaTable, IRadioTable, IRadioTableStat, IVapTable } from './interfaces';
import { Validate } from '../commons/Validate';
import { EDeviceType } from './EDeviceType';
import { IBaseDeviceMandatoryRaw } from './IBaseDeviceRaw';

export class UAPDevice extends BaseDevice {
    public static type = EDeviceType.UAP;
    public type = EDeviceType.UAP;
    import(props: Partial<IWLANDeviceRaw> & IBaseDeviceMandatoryRaw): this {
        super.import(props);

        if (!Validate.isUndefined(props.x_vwirekey)) {
            this.xVwirekey = props.x_vwirekey;
        }
        if (!Validate.isUndefined(props.vwire_table)) {
            this.vwireTable = props.vwire_table;
        }
        if (!Validate.isUndefined(props.antenna_table)) {
            this.antennaTable = props.antenna_table;
        }
        if (!Validate.isUndefined(props.radio_table)) {
            this.radioTable = props.radio_table;
        }
        if (!Validate.isUndefined(props.scan_radio_table)) {
            this.scanRadioTable = props.scan_radio_table;
        }
        if (!Validate.isUndefined(props.country_code)) {
            this.countryCode = props.country_code;
        }
        if (!Validate.isUndefined(props.countrycode_table)) {
            this.countrycodeTable = props.countrycode_table;
        }
        if (!Validate.isUndefined(props.wlangroup_id_na)) {
            this.wlangroupIdNa = props.wlangroup_id_na;
        }
        if (!Validate.isUndefined(props.wlangroup_id_ng)) {
            this.wlangroupIdNg = props.wlangroup_id_ng;
        }
        if (!Validate.isUndefined(props.acc_meter_stats)) {
            this.accMeterStats = props.acc_meter_stats;
        }
        if (!Validate.isUndefined(props.supports_fingerprint_ml)) {
            this.supportsFingerprintMl = props.supports_fingerprint_ml;
        }
        if (!Validate.isUndefined(props.disconnection_reason)) {
            this.disconnectionReason = props.disconnection_reason;
        }
        if (!Validate.isUndefined(props.scanning)) {
            this.scanning = props.scanning;
        }
        if (!Validate.isUndefined(props.spectrum_scanning)) {
            this.spectrumScanning = props.spectrum_scanning;
        }
        if (!Validate.isUndefined(props.meshv3_peer_mac)) {
            this.meshv3PeerMAC = props.meshv3_peer_mac;
        }
        if (!Validate.isUndefined(props.element_peer_mac)) {
            this.elementPeerMAC = props.element_peer_mac;
        }
        if (!Validate.isUndefined(props.hide_ch_width)) {
            this.hideChWidth = props.hide_ch_width;
        }
        if (!Validate.isUndefined(props.isolated)) {
            this.isolated = props.isolated;
        }
        if (!Validate.isUndefined(props.radio_table_stats)) {
            this.radioTableStats = props.radio_table_stats;
        }
        if (!Validate.isUndefined(props.port_stats)) {
            this.portStats = props.port_stats;
        }
        if (!Validate.isUndefined(props.vap_table)) {
            this.vapTable = props.vap_table;
        }
        if (!Validate.isUndefined(props.vwire_vap_table)) {
            this.vwireVapTable = props.vwire_vap_table;
        }
        if (!Validate.isUndefined(props['bytes-d'])) {
            this.bytesD = props['bytes-d'];
        }
        if (!Validate.isUndefined(props['tx_bytes-d'])) {
            this.txBytesD = props['tx_bytes-d'];
        }
        if (!Validate.isUndefined(props['rx_bytes-d'])) {
            this.rxBytesD = props['rx_bytes-d'];
        }
        if (!Validate.isUndefined(props['bytes-r'])) {
            this.bytesR = props['bytes-r'];
        }
        if (!Validate.isUndefined(props.last_scan)) {
            this.lastScan = props.last_scan;
        }
        if (!Validate.isUndefined(props.vwireEnabled)) {
            this.vwireEnabled = props.vwireEnabled;
        }
        if (!Validate.isUndefined(props.uplink_table)) {
            this.uplinkTable = props.uplink_table;
        }

        return this;
    }

    public updateDevice(payload: Partial<IWLANDeviceRaw>): Promise<this> {
        return this._updateDevice(payload);
    }

    public enable(enable = true): Promise<unknown> {
        return this.updateDevice({
            disabled: !enable
        });
    }

    public xVwirekey: string;
    public vwireTable: Array<unknown>;
    public antennaTable: Array<IAntennaTable>;
    public radioTable: Array<IRadioTable>;
    public scanRadioTable: Array<unknown>;
    public countryCode: number;
    public countrycodeTable: Array<unknown>;
    public wlangroupIdNa: string;
    public wlangroupIdNg: string;
    public accMeterStats: IAccMeterStats;
    public supportsFingerprintMl: boolean;
    public disconnectionReason: string;
    public scanning: boolean;
    public spectrumScanning: boolean;
    public meshv3PeerMAC: string;
    public elementPeerMAC: string;
    public hideChWidth: string;
    public isolated: boolean;
    public radioTableStats: Array<IRadioTableStat>;
    public portStats: Array<unknown>;
    public vapTable: Array<IVapTable>;
    public vwireVapTable: Array<unknown>;
    public bytesD: number;
    public txBytesD: number;
    public rxBytesD: number;
    public bytesR: number;
    public lastScan: number;
    public vwireEnabled: boolean;
    public uplinkTable: Array<unknown>;
}
