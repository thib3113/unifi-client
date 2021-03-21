const NodeEnvironment = require('jest-environment-node');
const nock = require('nock');

class CustomEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();
        this.global.__NOCK__ = nock;
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;
