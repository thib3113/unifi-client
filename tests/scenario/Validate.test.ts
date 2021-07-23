import { Validate } from '../../src/commons/Validate';

describe('Validate.test.ts', () => {
    it('should validate function mail', () => {
        expect(Validate.mail('test@hmail.com')).toBeTruthy();
        expect(Validate.mail('http://test.hmail.com')).toBeFalsy();
    });
    it('should validate function uuid', () => {
        expect(Validate.uuid('906335d7-bade-4157-bef8-c241c360f1d1')).toBeTruthy();
        expect(Validate.uuid('906335d7-bade-4157-bef8-241c360f1d1')).toBeFalsy();
    });
    it('should validate function isString', () => {
        expect(Validate.isString('test')).toBeTruthy();
        expect(Validate.isString(25)).toBeFalsy();
    });
    it('should validate function isNumber', () => {
        expect(Validate.isNumber(25)).toBeTruthy();
        expect(Validate.isNumber('test')).toBeFalsy();
    });
    it('should validate function isFunction', () => {
        expect(Validate.isFunction(() => true)).toBeTruthy();
        expect(Validate.isFunction(true)).toBeFalsy();
    });
    it('should validate function isObject', () => {
        expect(Validate.isObject({ foo: true })).toBeTruthy();
        expect(Validate.isObject(true)).toBeFalsy();
    });
    it('should validate function isNull', () => {
        expect(Validate.isNull(null)).toBeTruthy();
        expect(Validate.isNull('foo')).toBeFalsy();
    });
    it('should validate function isUndefined', () => {
        expect(Validate.isUndefined(undefined)).toBeTruthy();
        expect(Validate.isUndefined(null)).toBeFalsy();
        expect(Validate.isUndefined('foo')).toBeFalsy();
    });
    it('should validate function isBoolean', () => {
        expect(Validate.isBoolean(true)).toBeTruthy();
        expect(Validate.isBoolean(false)).toBeTruthy();
        expect(Validate.isBoolean(null)).toBeFalsy();
        expect(Validate.isBoolean('foo')).toBeFalsy();
    });
    it('should validate function isRegExp', () => {
        expect(Validate.isRegExp(/.*/)).toBeTruthy();
        expect(Validate.isRegExp(false)).toBeFalsy();
        expect(Validate.isRegExp(null)).toBeFalsy();
        expect(Validate.isRegExp('foo')).toBeFalsy();
    });
    it('should validate function isError', () => {
        expect(Validate.isError(new Error())).toBeTruthy();
        expect(Validate.isError(false)).toBeFalsy();
        expect(Validate.isError(null)).toBeFalsy();
        expect(Validate.isError('foo')).toBeFalsy();
    });
    it('should validate function isDate', () => {
        expect(Validate.isDate(new Date(), false)).toBeTruthy();
        // @ts-ignore
        expect(Validate.isDate(Date.now(), true)).toBeTruthy();
        expect(Validate.isDate(false)).toBeFalsy();
        expect(Validate.isDate(null)).toBeFalsy();
        expect(Validate.isDate('foo')).toBeFalsy();
    });
    it('should validate function isBuffer', () => {
        expect(Validate.isBuffer(Buffer.from(''))).toBeTruthy();
        expect(Validate.isBuffer(false)).toBeFalsy();
        expect(Validate.isBuffer(null)).toBeFalsy();
        expect(Validate.isBuffer('foo')).toBeFalsy();
    });
    it('should validate function isSymbol', () => {
        expect(Validate.isSymbol(Symbol(''))).toBeTruthy();
        expect(Validate.isSymbol(false)).toBeFalsy();
        expect(Validate.isSymbol(null)).toBeFalsy();
        expect(Validate.isSymbol('foo')).toBeFalsy();
    });
    it('should validate function implementsTKeys', () => {
        expect(
            Validate.implementsTKeys<Date>(new Date(), ['getDate', 'getDay'])
        ).toBeTruthy();
        expect(
            Validate.implementsTKeys<Date>({}, ['getDate', 'getDay'])
        ).toBeFalsy();
        expect(
            // @ts-ignore
            Validate.implementsTKeys<Date>({}, 'getDate')
        ).toBeFalsy();
        expect(
            // @ts-ignore
            Validate.implementsTKeys<Date>('str', ['getDate'])
        ).toBeFalsy();
    });
    it('should validate function stringToBoolean', () => {
        expect(Validate.stringToBoolean('true')).toBeTruthy();
        expect(Validate.stringToBoolean('y')).toBeTruthy();
        expect(Validate.stringToBoolean('yes')).toBeTruthy();
        expect(Validate.stringToBoolean('oui')).toBeTruthy();
        expect(Validate.stringToBoolean('on')).toBeTruthy();
        expect(Validate.stringToBoolean('false')).toBeFalsy();
        expect(Validate.stringToBoolean('n')).toBeFalsy();
        expect(Validate.stringToBoolean('no')).toBeFalsy();
        expect(Validate.stringToBoolean('non')).toBeFalsy();
        expect(Validate.stringToBoolean('off')).toBeFalsy();
        expect(Validate.stringToBoolean('toto')).toBeFalsy();
    });
});
