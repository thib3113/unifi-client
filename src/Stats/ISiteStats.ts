export interface ISiteStats {
    'wan-tx_bytes': number;
    'wan-rx_bytes': number;
    'wan2-tx_bytes': number;
    'wan2-rx_bytes': number;
    wlan_bytes: number;
    num_sta: number;
    'lan-num_sta': number;
    'wlan-num_sta': number;
    time: any;
    site: string;
    o: string;
    oid: string;
    // only for version < 4.9.1
    bytes?: number;
}
