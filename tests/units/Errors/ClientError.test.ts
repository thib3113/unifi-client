import { ClientError, EErrorsCodes } from '../../../src';

describe('ClientError', () => {
    it('should create ClientError', () => {
        const err = new ClientError('message', EErrorsCodes.UNAUTHORIZED);
        expect(err.message).toBe(`message`);
    });
    it('should create empty ClientError', () => {
        new ClientError();
    });
});
