import { createDebugger, getUrlRepresentation } from '../../src/util';
import { Debugger } from 'debug';
import Controller, { __Error, UnifiError } from '../../src';
import Validate from '../../src/commons/Validate';

describe('test commons utilities', () => {
    describe('getUrlRepresentation tests', () => {
        it('should return correct url without auth', () => {
            const res = getUrlRepresentation(
                {
                    baseURL: 'https://user:pass@localhost:8080',
                    url: '/url',
                    params: {
                        foo: 'bar'
                    },
                    auth: {
                        username: 'user',
                        password: 'password'
                    }
                },
                true
            );

            expect(res).toBe('https://localhost:8080/url?foo=bar');
        });

        it('should return correct url with auth', () => {
            let res = getUrlRepresentation(
                {
                    baseURL: 'https://localhost:8080',
                    url: '/url',
                    params: {
                        foo: 'bar'
                    },
                    auth: {
                        username: 'user',
                        password: 'password'
                    }
                },
                false
            );

            expect(res).toBe('https://user:password@localhost:8080/url?foo=bar');

            res = getUrlRepresentation(
                {
                    baseURL: 'https://us:pass@localhost:8080',
                    url: '/url',
                    params: {
                        foo: 'bar'
                    },
                    auth: {
                        username: 'user',
                        password: 'password'
                    }
                },
                false
            );

            expect(res).toBe('https://us:pass@localhost:8080/url?foo=bar');
        });
    });

    describe('createDebugger tests', () => {
        let debug: Debugger;
        debug = createDebugger('test');
        expect(debug.namespace).toBe('unifi-client:test');
        expect(() => {
            // @ts-ignore
            createDebugger();
        }).toThrow();
    });

    describe('test Controller without login', () => {
        const c = new Controller({
            url: '',
            password: '',
            username: ''
        });

        it('should refuse to getSites', async () => {
            try {
                await c.getSites();
                expect(false).toBeTruthy();
            } catch (e) {
                expect(true).toBeTruthy();
            }
        });

        it('should refuse to getSites', async () => {
            try {
                await c.sites.getSites();
                expect(false).toBeTruthy();
            } catch (e) {
                expect(true).toBeTruthy();
            }
        });
    });

    describe('test errors', () => {
        it('should stringify errors', () => {
            const error_str = new UnifiError(
                'fail',
                500,
                { validationError: { field: 'bar', pattern: '' } },
                new Error('caused by me')
            ).toString();
            expect(Validate.isString(error_str)).toBeTruthy();
        });

        it('should accept another error', () => {
            const error_str = new __Error(new Error('caused by me')).toString();
            expect(Validate.isString(error_str)).toBeTruthy();
        });
    });
});
