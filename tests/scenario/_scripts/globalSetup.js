const fs = require('fs');
const path = require('path');
const dotEnv = require('dotenv');
const { isRecordMode } = require('./common');

dotEnv.config({
    path: path.join(__dirname, '..', '..', '..', '.env')
});

module.exports = async () => {
    const loginPath = path.join(__dirname, 'nockFixtures', 'login.json');
    if (isRecordMode() && fs.existsSync(loginPath)) {
        await fs.promises.rm(loginPath);
    }
};
