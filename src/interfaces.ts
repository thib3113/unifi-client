export type ipString = string;

export enum EProxyNamespaces {
    LED = 'led',
    NETWORK = 'network',
    USERS = 'users',
    ACCESS_ULP_GO = 'access/ulp-go',
    ACCESS = 'access',
    PROTECT = 'protect',
    TALK = 'talk'
}

export type proxyNamespace = EProxyNamespaces | string | boolean;

export interface IBuildUrlParams {
    url?: string;
    /**
     * the APIVersion
     */
    apiVersion?: number;
    /**
     * the current site selected
     */
    site?: string;
    baseURL?: string;
    /**
     * the namespace of the proxy part
     * default network
     */
    proxyNamespace?: proxyNamespace;
    /**
     * add the /api in the URL ? or maybe the wss ?
     */
    apiPart?: string | boolean;
}

export interface IUnifiResponseEnveloppe<T = unknown> {
    meta: {
        rc: 'ok' | string;
    };
    data: T;
}
