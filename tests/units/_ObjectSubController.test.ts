//need this first
import { checkNeedsMock, checkNeedVersionMock } from '../mocks/utils';
import { _ObjectSubController } from '../../src/commons/_ObjectSubController';
import axios from 'axios';
import { ClientError, Controller } from '../../src';

describe('_ObjectSubController', () => {
    describe('constructor', () => {
        it('should construct', () => {
            const subController = new _ObjectSubController({
                // @ts-ignore
                controller: { foo: 'bar' },
                instance: axios
            });

            expect(subController.getController()).toStrictEqual({ foo: 'bar' });
            // @ts-ignore
            expect(subController.controllerInstance).toBe(axios);
            expect(subController.getInstance()).toBeUndefined();
            // @ts-ignore
            expect(subController.instance).toBeUndefined();
            // @ts-ignore
            subController.instance = axios;
            // @ts-ignore
            expect(subController.instance).toBe(axios);
            // @ts-ignore
            expect(subController.config).toStrictEqual({
                controller: { foo: 'bar' },
                instance: axios
            });

            // @ts-ignore
            expect(subController.site).toBeUndefined();
            // @ts-ignore
            subController.site = { foo: 'bar' };
            // @ts-ignore
            expect(subController.site).toStrictEqual({ foo: 'bar' });
            // @ts-ignore
            expect(subController.debug).toStrictEqual(expect.any(Function));
        });
        it('should reject non valid configuration', () => {
            expect.assertions(6);
            try {
                // @ts-ignore
                new _ObjectSubController();
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('ObjectSubController not correctly initialized');
            }
            try {
                // @ts-ignore
                new _ObjectSubController({ instance: {} });
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('ObjectSubController not correctly initialized');
            }
            try {
                // @ts-ignore
                new _ObjectSubController({ controller: {} });
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('ObjectSubController not correctly initialized');
            }
        });
    });

    describe('validate functions', () => {
        let subController: _ObjectSubController & {
            checkNeeds: (minVersion?: string, unifiOs?: boolean) => boolean;
            controller: Controller;
            checkNeedVersion: (minVersion?: string, unifiOs?: boolean) => boolean;
            needVersion: <T>(key: string, value?: T, minVersion?: string, unifiOs?: boolean, allowUndefined?: boolean) => boolean;
        };
        beforeEach(() => {
            // @ts-ignore
            subController = new _ObjectSubController({
                // @ts-ignore
                controller: { unifiOs: true, version: '7.0.0' },
                instance: axios
            });
        });
        describe('checkNeeds', () => {
            it('should check minVersion', () => {
                checkNeedsMock.mockImplementationOnce(() => false);
                expect(subController.checkNeeds('8.0.0')).toBe(false);
                expect(checkNeedsMock).toHaveBeenCalledWith({ unifiOs: true, version: '7.0.0' }, '8.0.0', undefined);
                checkNeedsMock.mockClear();

                checkNeedsMock.mockImplementationOnce(() => true);
                expect(subController.checkNeeds('7.0.0')).toBe(true);
                expect(checkNeedsMock).toHaveBeenCalledWith({ unifiOs: true, version: '7.0.0' }, '7.0.0', undefined);
            });
            // it('should check unifiOs', () => {
            //     subController.controller.unifiOs = true;
            //     expect(subController.checkNeeds(undefined, false)).toBeFalsy();
            //     expect(subController.checkNeeds(undefined, true)).toBeTruthy();
            //     subController.controller.unifiOs = false;
            //     expect(subController.checkNeeds(undefined, true)).toBeFalsy();
            //     expect(subController.checkNeeds(undefined, false)).toBeTruthy();
            // });
        });
        describe('checkNeedVersion', () => {
            it('should pass parameters', () => {
                checkNeedVersionMock.mockImplementationOnce(() => {
                    throw new Error('my error');
                });
                try {
                    subController.checkNeedVersion('7.0.0', true, 'test');
                    expect(false).toBe(true);
                } catch (e) {
                    expect(e).toBeInstanceOf(Error);
                    expect(e.message).toBe('my error');
                    expect(checkNeedVersionMock).toHaveBeenCalledWith({ unifiOs: true, version: '7.0.0' }, '7.0.0', true, 'test');
                }

                checkNeedVersionMock.mockClear();
                checkNeedVersionMock.mockImplementationOnce(() => true);

                subController.checkNeedVersion('8.0.0', undefined);
                expect(checkNeedVersionMock).toHaveBeenCalledWith({ unifiOs: true, version: '7.0.0' }, '8.0.0', undefined, '');
            });

            //     // const checkNeedsMock = jest.fn().mockReturnValue(false);
            //     beforeEach(() => {
            //         checkNeedVersionMock.mockImplementation(() => {
            //             throw new Error('my error');
            //         });
            //     });
            //     it('should return true if version match', () => {
            //         checkNeedVersionMock.mockImplementationOnce(() => true);
            //         //this need to doesn't crash
            //         subController.checkNeedVersion('7.0.0', true);
            //         expect(true).toBeTruthy();
            //     });
            //     it('should pass a parameterName', () => {
            //         checkNeedVersionMock.mockImplementationOnce(() => true);
            //         subController.checkNeedVersion('7.0.0', true);
            //         expect(checkNeedVersionMock).toHaveBeenCalledWith(
            //             {
            //                 unifiOs: true,
            //                 version: '7.0.0'
            //             },
            //             '7.0.0',
            //             true,
            //             ''
            //         );
            //     });
            // it('should validate unifiOs', () => {
            //     expect.assertions(4);
            //     try {
            //         subController.checkNeedVersion(undefined, true);
            //     } catch (e) {
            //         expect(e).toBeInstanceOf(ClientError);
            //         expect(e.message).toBe('need UnifiOs controller');
            //     }
            //     try {
            //         subController.checkNeedVersion(undefined, false);
            //     } catch (e) {
            //         expect(e).toBeInstanceOf(ClientError);
            //         expect(e.message).toBe('need non-UnifiOs controller');
            //     }
            // });
            // it('should validate minVersion', () => {
            //     expect.assertions(2);
            //     try {
            //         subController.checkNeedVersion('2.0.1');
            //     } catch (e) {
            //         expect(e).toBeInstanceOf(ClientError);
            //         expect(e.message).toBe('need minimal controller version 2.0.1');
            //     }
            // });
            // it('should add parameterName in the error', () => {
            //     expect.assertions(2);
            //     try {
            //         subController.checkNeedVersion('2.0.1', undefined, 'test');
            //     } catch (e) {
            //         expect(e).toBeInstanceOf(ClientError);
            //         expect(e.message).toBe('test need minimal controller version 2.0.1');
            //     }
            // });
        });
        describe('needVersion', () => {
            const checkNeedVersionMock = jest.fn();
            beforeEach(() => {
                subController.checkNeedVersion = checkNeedVersionMock;
            });
            it('should set key', () => {
                checkNeedVersionMock.mockImplementationOnce(() => true);
                expect(subController.needVersion('foo', 'bar', '6.0.0', true)).toBeTruthy();
                // @ts-ignore
                expect(subController.foo).toBe('bar');
            });
            it('should disallow undefined', () => {
                checkNeedVersionMock.mockImplementationOnce(() => true);
                expect(subController.needVersion('foo', undefined, '6.0.0', true)).toBeTruthy();
                expect('foo' in subController).toBeFalsy();
            });
            it('should allow undefined', () => {
                checkNeedVersionMock.mockImplementationOnce(() => true);
                expect(subController.needVersion('foo', undefined, '6.0.0', true, true)).toBeTruthy();
                expect('foo' in subController).toBeTruthy();
                // @ts-ignore
                expect(subController.foo).toBeUndefined();
            });
            it('should allow undefined', () => {
                checkNeedVersionMock.mockImplementationOnce(() => true);
                expect(subController.needVersion('foo', undefined, '6.0.0', true, true)).toBeTruthy();
                expect('foo' in subController).toBeTruthy();
                // @ts-ignore
                expect(subController.foo).toBeUndefined();
            });
            it('should crash if needs not match', () => {
                checkNeedVersionMock.mockImplementationOnce(() => {
                    throw new Error('needVersion error');
                });
                expect(subController.needVersion('foo', 'bar', '6.0.0', true, true)).toBeFalsy();
                expect('foo' in subController).toBeTruthy();

                expect.assertions(6);
                try {
                    // this will crash
                    // @ts-ignore
                    expect(subController.foo).toBe('bar');
                } catch (e) {
                    expect(e).toBeInstanceOf(Error);
                    expect(e.message).toBe('needVersion error');
                }
                try {
                    // this will crash
                    // @ts-ignore
                    subController.foo = 'bar2';
                } catch (e) {
                    expect(e).toBeInstanceOf(Error);
                    expect(e.message).toBe('needVersion error');
                }
            });
        });

        describe('toJSON', () => {
            const checkNeedVersionMock = jest.fn();
            beforeEach(() => {
                subController.checkNeedVersion = checkNeedVersionMock;
            });

            it('test to Json to remove blocked keys', () => {
                checkNeedVersionMock.mockImplementationOnce(() => true);
                expect(subController.needVersion('foo', 'bar', '6.0.0', true)).toBeTruthy();
                checkNeedVersionMock.mockImplementationOnce(() => {
                    throw new Error('my error');
                });
                expect(subController.needVersion('tata', 'yoyo', '6.0.0', true)).toBeFalsy();

                expect(JSON.parse(JSON.stringify(subController))).toStrictEqual({
                    foo: 'bar'
                });
            });
        });
    });
});
