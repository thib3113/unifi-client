const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv');
const { isRecordMode } = require('./common');
const { recorder } = require('./Recorder');

// dotEnv.config({
//     path: path.join(__dirname, '..', '..', '..', '.env')
// });
//
module.exports = async () => {
    const loginPath = recorder.getFullFixturePath('login', true);
    if (recorder.isRecordMode() && fs.existsSync(loginPath)) {
        await fs.promises.rm(loginPath);
    }
};
