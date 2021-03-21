import __Error from './__Error';

export interface IUnifiErrorMeta {
    validationError?: {
        field: string;
        pattern: string;
    };
}

export default class UnifiError extends __Error {
    public meta: IUnifiErrorMeta;

    public constructor(message: string | Error = '', code = 0, meta: IUnifiErrorMeta = {}, exception: Error | string = null) {
        super(message, code, exception);

        //just in case
        // @ts-ignore
        delete meta.msg;
        // @ts-ignore
        delete meta.rc;
        this.meta = meta;
        //just in case framework try to read message directly
        this._message = `${this._message} ${Object.values(this.meta).length > 0 ? JSON.stringify(this.meta) : ''}`;

        // Set the prototype explicitly.
        // Object.setPrototypeOf(this, Error.prototype);
    }

    name: string = 'UnifiError';
}
