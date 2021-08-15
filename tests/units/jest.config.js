const baseConfig = require('../jest.config.base');
const path = require('path');

module.exports = {
    ...baseConfig,
    displayName: 'units tests',
    testMatch: baseConfig.testMatchPattern.map((pattern) => path.posix.join(__dirname, pattern)),
    testMatchPattern: undefined
};

delete module.exports.testMatchPattern;
