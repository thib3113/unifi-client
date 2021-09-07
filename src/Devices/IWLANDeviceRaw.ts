import { IBaseDeviceRaw } from './IBaseDeviceRaw';
import { IAccMeterStats, IAntennaTable, IRadioTable, IRadioTableStat, IVapTable } from './interfaces';

export interface IWLANDeviceRaw extends IBaseDeviceRaw {
    x_vwirekey: string;
    vwire_table: Array<unknown>;
    antenna_table: Array<IAntennaTable>;
    radio_table: Array<IRadioTable>;
    scan_radio_table: Array<unknown>;
    country_code: number;
    countrycode_table: Array<unknown>;
    wlangroup_id_na: string;
    wlangroup_id_ng: string;
    acc_meter_stats: IAccMeterStats;
    supports_fingerprint_ml: boolean;
    disconnection_reason: string;
    scanning: boolean;
    spectrum_scanning: boolean;
    meshv3_peer_mac: string;
    element_peer_mac: string;
    hide_ch_width: string;
    isolated: boolean;
    radio_table_stats: Array<IRadioTableStat>;
    port_stats: Array<unknown>;
    vap_table: Array<IVapTable>;
    vwire_vap_table: Array<unknown>;
    'bytes-d': number;
    'tx_bytes-d': number;
    'rx_bytes-d': number;
    'bytes-r': number;
    last_scan: number;
    vwireEnabled: boolean;
    uplink_table: Array<unknown>;
    bandsteering_mode: string;
    atf_enabled: boolean;
}
