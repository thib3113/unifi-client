import { _ObjectSubSite } from '../../src/commons/_ObjectSubSite';
import { controller, site } from '../mocks';
import axios from 'axios';
import { ClientError, FWRule } from '../../src';

jest.mock('../../src/Firewall/FWRule');

describe('_objectSubSite', () => {
    describe('errors', () => {
        it('should handle an empty construct', () => {
            expect.assertions(2);
            try {
                // @ts-ignore
                new _ObjectSubSite();
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('ObjectSubController not correctly initialized');
            }
        });
        it('should handle a construct without site', () => {
            expect.assertions(2);
            try {
                // @ts-ignore
                new _ObjectSubSite({
                    controller
                });
            } catch (e) {
                expect(e).toBeInstanceOf(ClientError);
                expect(e.message).toBe('ObjectSubSite not correctly initialized');
            }
        });
    });
    it('construct', () => {
        const subSite = new _ObjectSubSite({
            controller,
            site
        });
        // @ts-ignore
        expect(subSite.site).toStrictEqual(site);
        try {
            // @ts-ignore
            expect(subSite.config).toStrictEqual({
                controller,
                site,
                instance: controller.controllerInstance
            });
        } catch (e) {
            console.log(e.stack);
        }
    });
    it('should return this after import', () => {
        const subSite = new _ObjectSubSite({
            controller,
            site
        });
        // @ts-ignore
        expect(subSite.import({})).toBe(subSite);
    });
    describe('mapObject', () => {
        let subSite: _ObjectSubSite;
        beforeEach(() => {
            subSite = new _ObjectSubSite({
                controller,
                site
            });
            (FWRule as jest.Mock).mockClear();
        });
        it('should map data to an object', () => {
            // @ts-ignore
            const object = subSite.mapObject<FWRule>(FWRule, undefined);
            // @ts-ignore
            expect(FWRule).not.toBeCalled();
            expect(object).toBe(undefined);
        });
        it('should return if no data', () => {
            // @ts-ignore
            const object = subSite.mapObject<FWRule>(FWRule, {});
            // @ts-ignore
            expect(FWRule).toBeCalledWith(subSite.config, {});
            expect(object).toBeInstanceOf(FWRule);
        });
    });
    it('get instance', () => {
        const subSite = new _ObjectSubSite({
            controller,
            site
        });

        // @ts-ignore
        expect(subSite.instance).toBe(site.getInstance());
    });
});
