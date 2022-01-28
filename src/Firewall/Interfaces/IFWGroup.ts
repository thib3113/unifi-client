export interface IFWGroup {
    _id: string;
    name: string;
    group_type: 'address-group' | 'port-group' | 'ipv6-address-group';
    group_members: Array<string>;
    site_id: string;
}
