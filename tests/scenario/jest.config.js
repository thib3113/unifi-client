const baseConfig = require('../jest.config.base');
const path = require('path');

module.exports = {
    ...baseConfig,

    displayName: 'scenarios tests',
    // A path to a module which exports an async function that is triggered once before all test suites
    globalSetup: path.resolve(path.join(__dirname, './_scripts/globalSetup.ts')),

    // A path to a module which exports an async function that is triggered once after all test suites
    globalTeardown: path.resolve(path.join(__dirname, './_scripts/teardown.ts')),

    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: [path.resolve(path.join(__dirname, './_scripts/setup.ts'))],

    // The test environment that will be used for testing
    testEnvironment: path.resolve(path.join(__dirname, './_scripts/environment.js')),

    testMatch: baseConfig.testMatchPattern.map((pattern) => path.posix.join(__dirname.split(path.sep).join(path.posix.sep), pattern)),
    testMatchPattern: undefined
};
delete module.exports.testMatchPattern;
