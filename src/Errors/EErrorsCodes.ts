export enum EErrorsCodes {
    UNKNOWN_ERROR = 0,
    /**
     * fail to detect if it's UnifiOs or not
     */
    FAIL_TO_DETECT_UNIFIOS,
    /**
     * Fail to read CSRF token from cookie in unifi answer
     */
    FAIL_GET_CSRF_COOKIE,

    /**
     * the version of your controller is too old to access this property
     */
    NEED_MORE_RECENT_CONTROLLER,

    /**
     * the type of controller (unifiOs / non unifiOs) doesn't allow this property
     */
    UNIFI_CONTROLLER_TYPE_MISMATCH,
    /**
     * you need to login before using this function
     */
    NEED_LOGIN,
    /**
     * some functions will show a message, and you can force to use it
     */
    NEED_TO_FORCE,
    /**
     * you pass an incorrect parameter
     */
    BAD_PARAMETERS,
    // CODE THAT CAN COME FROM UNIFI ( 100 to 600 )
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    REQUEST_ENTITY_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    NEED_2FA = 499,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    FAIL_LOGIN
}
