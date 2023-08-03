const { TestEnvironment } = require('jest-environment-node');

class CustomEnvironment extends TestEnvironment {
    async setup() {
        await super.setup();
        this.global.recorder = require('./Recorder');
    }
}

module.exports = CustomEnvironment;
