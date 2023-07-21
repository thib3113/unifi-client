const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const cookie = require('cookie');
const setCookieParser = require('set-cookie-parser');
const { isRecordMode } = require('./isRecordMode');
const { Validate } = require('../../../src/commons/Validate');

const testFolder = path.join(__dirname, '..', '..', 'nockFixtures');

const jwtKey = crypto.randomUUID();

module.exports = async () => {
    try {
        if (isRecordMode()) {
            let cookieToken = '';

            const checkFolder = (folder) => {
                fs.readdirSync(folder)
                    .filter((f) => f !== 'login.json')
                    //transform to full path
                    .map((f) => path.join(folder, f))
                    //filter directories
                    .filter((f) => {
                        if (fs.statSync(f).isDirectory()) {
                            checkFolder(f);
                            return false;
                        }
                        return true;
                    })
                    .map((f) => {
                        checkFileFn(f);
                    });
            };

            const checkFileFn = (filePath) => {
                if (!fs.existsSync(filePath)) {
                    return;
                }
                try {
                    let jsonParsed = JSON.parse(fs.readFileSync(filePath).toString());
                    jsonParsed = jsonParsed.map((def) => {
                        if (def.method === 'POST' && Validate.isString(def.path) && def.path.includes('login') && def.status === 200) {
                            def.body = {
                                ...def.body,
                                username: 'ubnt',
                                password: 'ubnt'
                            };

                            const response = def.response;
                            def.response = {
                                ...response,
                                unique_id: crypto.randomUUID(),
                                id: crypto.randomUUID(),
                                first_name: 'firstName',
                                last_name: 'lastName',
                                full_name: 'fullName',
                                email: 'demo@ubnt.com',
                                username: 'ubnt',
                                create_time: Date.now(),
                                password_revision: Date.now(),
                                update_time: Date.now(),
                                groups: response.groups.map((g) => ({
                                    ...g,
                                    unique_id: crypto.randomUUID(),
                                    create_time: new Date().toISOString()
                                })),
                                roles: response.roles.map((r) => ({ ...r, unique_id: crypto.randomUUID() })),
                                deviceToken: jwt.sign({ user_id: crypto.randomUUID() }, jwtKey, { expiresIn: '100y' })
                            };
                        }

                        // @ts-ignore rawHeaders seems not typed
                        def.rawHeaders = def.rawHeaders.map((def) => {
                            const tokenCookieStr = 'TOKEN=';
                            if (def.startsWith('TOKEN=') && def.length > tokenCookieStr.length) {
                                if (!cookieToken) {
                                    const cookies = setCookieParser.parse(def, {
                                        map: true
                                    });
                                    const curCookie = cookies['TOKEN'];
                                    const decodedToken = jwt.decode(curCookie.value);
                                    delete decodedToken.exp;

                                    const token = jwt.sign(decodedToken, jwtKey, { expiresIn: '100y' });
                                    def = cookie.serialize('TOKEN', token, {
                                        ...curCookie,
                                        // @ts-ignore
                                        sameSite: curCookie.sameSite
                                    });
                                    cookieToken = def;
                                } else {
                                    def = cookieToken;
                                }
                            }
                            return def;
                        });

                        return def;
                    });
                    // @ts-ignore
                    fs.writeFileSync(filePath, JSON.stringify(jsonParsed, ' ', 4));
                } catch (e) {
                    console.log(e);
                    debugger;
                }
            };

            //start by the login.json file
            checkFileFn(path.join(testFolder, 'login.json'));

            checkFolder(testFolder);
        }
    } catch (e) {
        console.error(e);
        debugger;
    }
};
