import { EErrorsCodes, UnifiError } from '../../../src';

describe('UnifiError', () => {
    it('should create unifiError', () => {
        const meta = {
            validationError: {
                field: 'bar',
                pattern: 'foo'
            }
        };
        const err = new UnifiError('message', EErrorsCodes.UNAUTHORIZED, meta);
        expect(err.message).toBe(`message ${JSON.stringify(meta)}`);
    });
    it('should create empty unifiError', () => {
        new UnifiError();
    });
});
