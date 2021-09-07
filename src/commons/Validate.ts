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

export type MustBeNullable<T> = null extends T ? T : undefined extends T ? T : never;

export class Validate {
    public static mail(mail: string): boolean {
        return Validate.isString(mail) && !!mail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }

    public static uuid(uuid: string): boolean {
        return Validate.isString(uuid) && !!uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9a-f]{12}$/i);
    }

    public static mac(address: string): boolean {
        return Validate.isString(address) && !!address.match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);
    }

    public static hexColor(color: string): boolean {
        return Validate.isString(color) && !!color.match(/^#[0-9A-F]{6}$/i);
    }

    // Returns if a value is a string
    public static isString(value: unknown): value is string {
        return typeof value === 'string' || value instanceof String;
    }
    // Returns if a value is really a number
    public static isNumber(value: unknown): value is number {
        return typeof value === 'number' && isFinite(value);
    }

    // Returns if a value is a function
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isFunction(value: unknown): value is Function {
        return typeof value === 'function';
    }
    // Returns if a value is an object
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isObject(value: unknown): value is object {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return ((value ?? false) as boolean) && typeof value === 'object' && (value as object).constructor === Object;
    }
    // Returns if a value is null
    public static isNull(value: unknown): value is null {
        return value === null;
    }

    // Returns if a value is undefined
    public static isUndefined(value: unknown): value is undefined {
        return typeof value === 'undefined';
    }

    // in typescript, the equivalent is
    // const a = undefined ?? bar
    public static isDefinedNotNull<T>(value: unknown): value is NonNullable<MustBeNullable<T>> {
        return value !== undefined && value !== null;
    }

    // Returns if a value is a boolean
    public static isBoolean(value: unknown): value is boolean {
        return typeof value === 'boolean';
    }
    // Returns if a value is a regexp
    public static isRegExp(value: unknown): value is RegExp {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return ((value ?? false) as boolean) && typeof value === 'object' && (value as object).constructor === RegExp;
    }
    // Returns if value is an error object
    public static isError(value: unknown): value is Error {
        return value instanceof Error && typeof value.message !== 'undefined';
    }
    // Returns if value is a date
    public static isDate(value: unknown, acceptTimestamp = true): value is Date {
        return (
            value instanceof Date ||
            (Validate.isString(value) && !Number.isNaN(Date.parse(value.toString()))) ||
            (acceptTimestamp && Validate.isNumber(value) && !Number.isNaN(new Date(value)))
        );
    }
    // Returns if value is a Buffer
    public static isBuffer(value: unknown): value is Buffer {
        return Buffer.isBuffer(value);
    }
    // Returns if a Symbol
    public static isSymbol(value: unknown): value is symbol {
        return typeof value === 'symbol';
    }

    public static implementsTKeys<T>(obj: unknown, keys: Array<keyof T>): obj is T {
        if (!obj || !Array.isArray(keys) || Validate.isString(obj) || Validate.isNumber(obj) || Validate.isBoolean(obj)) {
            return false;
        }

        // @ts-ignore
        return keys.reduce((impl, key) => impl && key in obj, true);
    }

    /**
     * Return a boolean depending on the string . ("true", "y", "yes", "oui", "on" return true, else it's return false)
     * @param str -the string
     * @param strict - return null instead of false if not in list
     */
    public static stringToBoolean(str: string, strict = false): boolean | null {
        return stringToBooleanMap.get((str || '').toLowerCase()) ?? (strict ? null : false);
    }
}
