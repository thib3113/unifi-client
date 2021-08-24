import { __Error, EErrorsCodes } from '../../../src';

describe('Errors', () => {
    describe('__Error', () => {
        it('should handle error', () => {
            const err = new __Error(new Error('my error'), EErrorsCodes.BAD_PARAMETERS);
            expect(err.code).toBe(EErrorsCodes.BAD_PARAMETERS);
            expect(err.errorCode).toBe(EErrorsCodes.BAD_PARAMETERS);
            expect(err.message).toBe('my error');
            expect(err.toString()).toMatch(/=== CAUSED BY ===/);
        });
        it('should handle message', () => {
            const err = new __Error('my error', EErrorsCodes.BAD_PARAMETERS);
            expect(err.code).toBe(EErrorsCodes.BAD_PARAMETERS);
            expect(err.errorCode).toBe(EErrorsCodes.BAD_PARAMETERS);
            expect(err.message).toBe('my error');
        });
        it('should handle caused by', () => {
            const err = new __Error('my error', EErrorsCodes.BAD_PARAMETERS, 'caused by me');
            expect(err.code).toBe(EErrorsCodes.BAD_PARAMETERS);
            expect(err.errorCode).toBe(EErrorsCodes.BAD_PARAMETERS);
            expect(err.message).toBe('my error');
            expect(err.toString()).toMatch(/=== CAUSED BY ===/);
        });
        it('should handle empty', () => {
            const err = new __Error();
            expect(err.code).toBe(EErrorsCodes.UNKNOWN_ERROR);
            expect(err.errorCode).toBe(EErrorsCodes.UNKNOWN_ERROR);
            expect(err.message).toBe('');
        });
    });
});
