//list of icmpType for V6
//gather from Firewall => add new rule v6 => IPv6 ICMP Type Name

export type icmpTypeV6 =
    | ''
    | 'address-unreachable'
    | 'bad-header'
    | 'communication-prohibited'
    | 'destination-unreachable'
    | 'echo-reply'
    | 'echo-request'
    | 'neighbor-advertisement'
    | 'neighbor-solicitation'
    | 'no-route'
    | 'packet-too-big'
    | 'parameter-problem'
    | 'port-unreachable'
    | 'redirect'
    | 'router-advertisement'
    | 'router-solicitation'
    | 'time-exceeded'
    | 'ttl-zero-during-reassembly'
    | 'ttl-zero-during-transit'
    | 'unknown-header-type'
    | 'unknown-option'
    | string;
