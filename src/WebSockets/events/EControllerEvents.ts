export enum EControllerEvents {
    CONNECTION = 'ctrl.connect',
    RECONNECTION = 'ctrl.reconnect',
    /**
     * close of the connection, will try a reconnection
     */
    CLOSE = 'ctrl.close',
    PONG = 'pong',
    /**
     * will try a reconnection
     */
    ERROR = 'ctrl.error',
    /**
     * will not reconnect
     */
    FATAL_ERROR = 'ctrl.fatal_error'
}
