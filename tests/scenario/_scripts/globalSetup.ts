import * as fs from 'fs';
import * as path from 'path';
import dotEnv from 'dotenv';
import { isRecordMode } from './common';

dotEnv.config({
    path: path.join(__dirname, '..', '..', '..', '.env')
});

module.exports = async () => {
    const loginPath = path.join(__dirname, 'nockFixtures', 'login.json');
    if (isRecordMode() && fs.existsSync(loginPath)) {
        await fs.promises.rm(loginPath);
    }
};
