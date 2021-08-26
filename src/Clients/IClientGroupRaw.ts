export interface IClientGroupRaw {
    name: string;
    site_id: string;
    _id: string;
    attr_hidden_id?: string;
    attr_no_delete?: boolean;
    qos_rate_max_up?: number;
    qos_rate_max_down?: number;
}
