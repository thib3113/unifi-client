import { __Error } from './__Error';
import { GITHUB_URL } from '../constants';

export class OpenAPRError extends __Error {
    public constructor(message: string | Error = '', code = 0, exception?: Error | string) {
        let helloMessage = `Hello you entered in an unknown world, doesn't hesitate to open a pull request at ${GITHUB_URL} .`;
        if (message) {
            helloMessage += `\n some useful informations : \n ${message}`;
        }

        super(helloMessage, code, exception);
    }
}
