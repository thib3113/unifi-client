import { __Error } from './__Error';

export interface IUnifiErrorMeta {
    validationError?: {
        field: string;
        pattern: string;
    };
}

export class UnifiError extends __Error {
    public meta: IUnifiErrorMeta;

    public constructor(message: string | Error = '', code = 0, pMeta: IUnifiErrorMeta = {}, exception?: Error | string) {
        super(message, code, exception);
        //clone meta object before removing parts
        const meta = { ...pMeta };

        //just in case
        // @ts-ignore
        delete meta.msg;
        // @ts-ignore
        delete meta.rc;
        this.meta = meta;
        //just in case framework try to read message directly
        const metaString = ` ${JSON.stringify(this.meta)}`;
        this._message = `${this._message}${Object.values(this.meta).length > 0 ? metaString : ''}`;
        this.message = this._message;
        // Set the prototype explicitly.
        // Object.setPrototypeOf(this, Error.prototype);
    }

    name: string = 'UnifiError';
}
