export type timestampDate = number;
/**
 * 2021-07-09T07:43:13+00:00
 */
export type dateISOString = string;

// objects that can be : new Date(<input>)
export type dateInput = timestampDate | dateISOString | Date;

/**
 * xx:xx:xx:xx:xx:xx
 */
export type macAddress = string;

export type ipV4Address = string;
export type ipv6Address = string;

export type ipv4CIDR = string;
export type ipv6CIDR = string;

export type timeZone = string;

export type uuid = string;

export type semverVersion = string;

export type email = string;

export type LANWAN = 'LAN' | 'WAN';
export type lanwan = 'lan' | 'wan';

/**
 * 0 to 1
 */
export type percentageToOne = number;

/**
 * 0 to 100
 */
export type percentage = number;
