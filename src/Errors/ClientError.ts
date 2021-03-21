import __Error from './__Error';
import { IUnifiErrorMeta } from './UnifiError';

export default class ClientError extends __Error {
    public meta: IUnifiErrorMeta;

    public constructor(message: string | Error = '', code = 0, exception: Error | string = null) {
        super(message, code, exception);
    }
}
