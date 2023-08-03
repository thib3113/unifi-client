const { recorder } = require('./Recorder');

module.exports = async () => {
    try {
        await recorder.teardown();
    } catch (e) {
        console.error(e);
        debugger;
    }
};
