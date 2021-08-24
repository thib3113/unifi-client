const debugMock = jest.fn();
const debugExtend = jest.fn().mockImplementation(() => debugMock);
const createDebuggerMock = jest.fn().mockImplementation(() => debugMock);
// @ts-ignore
debugMock.extend = debugExtend;

export const removeTrailingSlashMock = jest.fn();

export const axiosUrlParamsMock = jest.fn().mockImplementation((instance) => instance);

export const getUrlRepresentationMock = jest.fn().mockImplementation((req) => req);

export const convertTimestampSecondsToDateMock = jest.fn();

jest.mock('../../src/util', () => {
    const originalModule = jest.requireActual('../../src/util');
    return {
        createDebugger: createDebuggerMock,
        removeTrailingSlash: removeTrailingSlashMock.mockImplementation((str) => originalModule.removeTrailingSlash(str)),
        axiosUrlParams: axiosUrlParamsMock,
        getUrlRepresentation: getUrlRepresentationMock,
        convertTimestampSecondsToDate: convertTimestampSecondsToDateMock.mockImplementation(originalModule.convertTimestampSecondsToDate)
    };
});

export const debug = {
    createDebuggerMock,
    debugExtend,
    debugMock
};
