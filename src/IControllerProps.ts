import { IUnifiAuthProps } from './UnifiAuth';

export interface IControllerProps extends IUnifiAuthProps {
    url: string;
    strictSSL?: boolean;
    webSocketsURL?: string;
}
