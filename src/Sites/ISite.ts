export interface ISite {
    _id: string;
    anonymous_id: string;
    name: string;
    desc: string;
    attr_hidden_id: string;
    attr_no_delete: boolean;
    role: string;
    /**
     * UNIFIOS only
     */
    role_hotspot?: boolean;
}
