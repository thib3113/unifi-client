import { IUnifiErrorMeta } from './UnifiError';
import { __Error } from './__Error';

export class ClientError extends __Error {
    public meta: IUnifiErrorMeta;

    public constructor(message: string | Error = '', code = 0, exception?: Error | string) {
        super(message, code, exception);
    }
}
