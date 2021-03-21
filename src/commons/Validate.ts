/* eslint-disable */
const stringToBooleanMap = new Map<string, boolean>([
    ['true', true],
    ['y', true],
    ['yes', true],
    ['oui', true],
    ['on', true],
    ['false', false],
    ['n', false],
    ['no', false],
    ['non', false],
    ['off', false]
]);

export default class Validate {
    public static mail(mail: string): boolean {
        return Validate.isString(mail) && !!mail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    public static uuid(uuid: string): boolean {
        return Validate.isString(uuid) && !!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }

    // Returns if a value is a string
    public static isString(value): value is string {
        return typeof value === 'string' || value instanceof String;
    }
    // Returns if a value is really a number
    public static isNumber(value): value is number {
        return typeof value === 'number' && isFinite(value);
    }

    // Returns if a value is a function
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isFunction(value): value is Function {
        return typeof value === 'function';
    }
    // Returns if a value is an object
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isObject(value): value is object {
        return value && typeof value === 'object' && value.constructor === Object;
    }
    // Returns if a value is null
    public static isNull(value): value is null {
        return value === null;
    }

    // Returns if a value is undefined
    public static isUndefined(value): value is undefined {
        return typeof value === 'undefined';
    }

    // Returns if a value is a boolean
    public static isBoolean(value): value is boolean {
        return typeof value === 'boolean';
    }
    // Returns if a value is a regexp
    public static isRegExp(value): value is RegExp {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }
    // Returns if value is an error object
    public static isError(value): value is Error {
        return value instanceof Error && typeof value.message !== 'undefined';
    }
    // Returns if value is a date
    public static isDate(value, acceptTimestamp = true): value is Date {
        return (
            value instanceof Date ||
            (Validate.isString(value) && !Number.isNaN(Date.parse(value.toString()))) ||
            (acceptTimestamp && Validate.isNumber(value) && !Number.isNaN(new Date(value)))
        );
    }
    // Returns if value is a Buffer
    public static isBuffer(value): value is Buffer {
        return Buffer.isBuffer(value);
    }
    // Returns if a Symbol
    public static isSymbol(value): value is symbol {
        return typeof value === 'symbol';
    }

    public static implementsTKeys<T>(obj: any, keys: Array<keyof T>): obj is T {
        if (!obj || !Array.isArray(keys) || Validate.isString(obj) || Validate.isNumber(obj) || Validate.isBoolean(obj)) {
            return false;
        }

        return keys.reduce((impl, key) => impl && key in obj, true);
    }

    /**
     * Return a boolean depending on the string . ("true", "y", "yes", "oui", "on" return true, else it's return false)
     * @param {string} str
     * @param {boolean} strict return null instead of false if not in list
     * @return {boolean}
     */
    public static stringToBoolean(str: string, strict = false): boolean {
        return stringToBooleanMap.get((str || '').toLowerCase()) || (strict ? null : false);
    }
}
