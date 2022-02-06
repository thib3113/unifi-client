import { IFWV4RuleRaw } from './IFWV4RuleRaw';
import { IFWV6RuleRaw } from './IFWV6RuleRaw';

export * from './types';
export * from './IFWGroup';
export * from './IFWRuleBaseRaw';
export * from './IFWV4RuleRaw';
export * from './IFWV6RuleRaw';

export type IFWRule = IFWV4RuleRaw & IFWV6RuleRaw;
