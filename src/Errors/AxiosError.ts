import * as util from 'util';
import { AxiosError as BaseAxiosError } from 'axios';

//fork of axios-error https://github.com/bottenderjs/messaging-apis/blob/master/packages/axios-error/src/index.ts

function indent(str: string): string {
    return (str || '')
        .split('\n')
        .map((s) => (s ? `  ${s}` : ''))
        .join('\n');
}

function json(data: unknown): string {
    try {
        return JSON.stringify(data, null, 2);
    } catch (e) {
        return '<json-unstringifiable>';
    }
}

export type customPickFromAxiosError = Pick<BaseAxiosError, 'config' | 'request' | 'response'>;

export class AxiosError extends Error {
    config: BaseAxiosError['config'];

    request?: BaseAxiosError['request'];

    response?: BaseAxiosError['response'];

    status?: number;

    /**
     * @example
     * ```js
     * new AxiosError(errorThrownByAxios)
     * ```
     */
    constructor(error: BaseAxiosError);

    /**
     * @example
     * ```js
     * new AxiosError('error message', errorThrownByAxios)
     * ```
     */
    constructor(message: string, error: BaseAxiosError);

    /**
     * @example
     * ```js
     * new AxiosError('error message', { config, request, response })
     * ```
     */
    constructor(message: string, error: customPickFromAxiosError);

    constructor(messageOrError: string | BaseAxiosError, error?: BaseAxiosError | customPickFromAxiosError) {
        let err: customPickFromAxiosError;
        if (typeof messageOrError === 'string') {
            super(messageOrError);
            err = error as customPickFromAxiosError;
        } else {
            super(messageOrError.message);
            err = messageOrError;
        }

        const { config, request, response } = err;

        this.config = config;
        this.request = request;
        this.response = response;
        if (response?.status) {
            this.status = response.status;
        }

        this.name = 'AxiosError';
    }

    [util.inspect.custom](): string {
        let requestMessage = '';

        if (this.config) {
            let { data } = this.config;

            try {
                data = JSON.parse(data);
            } catch (_) {} // eslint-disable-line

            let requestData = '';

            if (this.config.data) {
                requestData = `
Request Data -
${indent(json(data))}`;
            }

            requestMessage = `
Request -
  ${this.config.method ? this.config.method.toUpperCase() : ''} ${this.config.url}
${requestData}`;
        }

        let responseMessage = '';

        if (this.response) {
            let responseData = '';

            if (this.response.data) {
                responseData = `
Response Data -
${indent(json(this.response.data))}`;
            }

            responseMessage = `
Response -
  ${this.response.status} ${this.response.statusText}
${responseData}`;
        }

        return `
${this.stack}

Error Message -
  ${this.message}
${requestMessage}
${responseMessage}
`;
    }
}
