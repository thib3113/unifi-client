// @ts-ignore
jest.mock('nock', () => global.__NOCK__);

// @ts-ignore
jest.mock('./Recorder', () => global.recorder);
