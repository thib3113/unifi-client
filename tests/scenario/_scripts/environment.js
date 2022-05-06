const { TestEnvironment } = require('jest-environment-node');
const nock = require('nock');

class CustomEnvironment extends TestEnvironment {
    async setup() {
        await super.setup();
        this.global.__NOCK__ = nock;
    }
}

module.exports = CustomEnvironment;
