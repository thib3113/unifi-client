import { IWLANDeviceRaw } from './IWLANDeviceRaw';
import { ENetworkDeviceType } from './ENetworkDeviceType';
import { IBaseDeviceMandatoryRaw } from '../IBaseDeviceMandatoryRaw';
import { UAPDevice } from './UAPDevice';
import { Validate } from '../../commons/Validate';
import { enabledDisabled } from '../../commons';

export class LTEDevice extends UAPDevice {
    public static type = ENetworkDeviceType.UAP;
    public type = ENetworkDeviceType.UAP;
    import(props: Partial<IWLANDeviceRaw> & IBaseDeviceMandatoryRaw): this {
        super.import(props);

        if (!Validate.isUndefined(props.lte_ext_ant)) {
            this.lteExtAnt = props.lte_ext_ant;
        }
        if (!Validate.isUndefined(props.lte_poe)) {
            this.ltePOE = props.lte_poe;
        }
        if (!Validate.isUndefined(props.lte_failover_mode)) {
            this.lteFailOverMode = props.lte_failover_mode;
        }
        if (!Validate.isUndefined(props.lte_data_warning_enabled)) {
            this.lteDataWarningEnabled = props.lte_data_warning_enabled;
        }
        if (!Validate.isUndefined(props.lte_data_limit_enabled)) {
            this.lteDataLimitEnabled = props.lte_data_limit_enabled;
        }
        if (!Validate.isUndefined(props.lte_roaming_allowed)) {
            this.lteRoamingAllowed = props.lte_roaming_allowed;
        }
        if (!Validate.isUndefined(props.lte_state)) {
            this.lteState = props.lte_state;
        }
        if (!Validate.isUndefined(props.lte_auth_type)) {
            this.lteAuthType = props.lte_auth_type;
        }
        if (!Validate.isUndefined(props.lte_hard_limit)) {
            this.lteHardLimit = props.lte_hard_limit;
        }
        if (!Validate.isUndefined(props.lte_soft_limit)) {
            this.lteSoftLimit = props.lte_soft_limit;
        }
        if (!Validate.isUndefined(props.lte_apn)) {
            this.lteAPN = props.lte_apn;
        }
        if (!Validate.isUndefined(props.lte_iccid)) {
            this.lteIccid = props.lte_iccid;
        }
        if (!Validate.isUndefined(props.lte_ip)) {
            this.lteIP = props.lte_ip;
        }
        if (!Validate.isUndefined(props.lte_networkoperator)) {
            this.lteNetworkOperator = props.lte_networkoperator;
        }
        if (!Validate.isUndefined(props.lte_pdptype)) {
            this.ltePdptype = props.lte_pdptype;
        }
        if (!Validate.isUndefined(props.lte_rat)) {
            this.lteRat = props.lte_rat;
        }
        if (!Validate.isUndefined(props.lte_signal)) {
            this.lteSignal = props.lte_signal;
        }
        if (!Validate.isUndefined(props.lte_band)) {
            this.lteBand = props.lte_band;
        }
        if (!Validate.isUndefined(props.lte_rx_chan)) {
            this.lteRXChan = props.lte_rx_chan;
        }
        if (!Validate.isUndefined(props.lte_tx_chan)) {
            this.lteTXChan = props.lte_tx_chan;
        }
        if (!Validate.isUndefined(props.lte_rssi)) {
            this.lteRSSI = props.lte_rssi;
        }
        if (!Validate.isUndefined(props.lte_rsrq)) {
            this.lteRSRQ = props.lte_rsrq;
        }
        if (!Validate.isUndefined(props.lte_cell_id)) {
            this.lteCellId = props.lte_cell_id;
        }
        if (!Validate.isUndefined(props.lte_radio_mode)) {
            this.lteRadioMode = props.lte_radio_mode;
        }
        if (!Validate.isUndefined(props.lte_rsrp)) {
            this.lteRSRP = props.lte_rsrp;
        }
        if (!Validate.isUndefined(props.lte_failover)) {
            this.lteFailover = props.lte_failover;
        }
        if (!Validate.isUndefined(props.total_tx_bytes)) {
            this.totalTXBytes = props.total_tx_bytes;
        }
        if (!Validate.isUndefined(props.total_rx_bytes)) {
            this.totalRXBytes = props.total_rx_bytes;
        }
        if (!Validate.isUndefined(props.lte_is_sim_pin_required)) {
            this.lteIsSimPinRequired = props.lte_is_sim_pin_required;
        }
        if (!Validate.isUndefined(props.lte_sim_pin_tries_left)) {
            this.lteSimPinTriesLeft = props.lte_sim_pin_tries_left;
        }
        if (!Validate.isUndefined(props.lte_is_sim_pin_verified)) {
            this.lteIsSimPinVerified = props.lte_is_sim_pin_verified;
        }

        return this;
    }

    public async save(): Promise<this> {
        return this;
    }

    public lteExtAnt?: enabledDisabled;
    public ltePOE?: enabledDisabled;
    public lteFailOverMode?: 'failover' | string;
    public lteDataWarningEnabled?: boolean;
    public lteDataLimitEnabled?: boolean;
    public lteRoamingAllowed?: boolean;
    public lteState?: string;
    public lteAuthType?: string;
    public lteHardLimit?: number;
    public lteSoftLimit?: number;
    public lteAPN?: string;
    public lteIccid?: string;
    public lteIP?: string;
    public lteNetworkOperator?: string;
    public ltePdptype?: string;
    public lteRat?: string;
    public lteSignal?: string;
    public lteBand?: string;
    public lteRXChan?: string;
    public lteTXChan?: string;
    public lteRSSI?: string;
    public lteRSRQ?: string;
    public lteCellId?: string;
    public lteRadioMode?: string;
    public lteRSRP?: string;
    public lteFailover?: boolean;
    public totalTXBytes?: number;
    public totalRXBytes?: number;
    public lteIsSimPinRequired?: boolean;
    public lteSimPinTriesLeft?: number;
    public lteIsSimPinVerified?: boolean;
}
