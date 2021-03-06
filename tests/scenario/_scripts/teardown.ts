import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import cookie from 'cookie';
import { Definition } from 'nock';
import setCookieParser from 'set-cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import { isRecordMode } from './isRecordMode';

const testFolder = path.join(__dirname, '..', '..', 'nockFixtures');

const jwtKey = uuidv4();

module.exports = async () => {
    try {
        if (isRecordMode()) {
            let cookieToken: string = '';

            const checkFolder = (folder: string) => {
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

            const checkFileFn = (filePath: string) => {
                if (!fs.existsSync(filePath)) {
                    return;
                }
                try {
                    let jsonParsed = JSON.parse(fs.readFileSync(filePath).toString()) as Array<Definition>;
                    jsonParsed = jsonParsed.map((def) => {
                        if (def.method === 'POST' && def.path.includes('login') && def.status === 200) {
                            def.body = {
                                ...(def.body as Record<string, any>),
                                username: 'ubnt',
                                password: 'ubnt'
                            };

                            const response = def.response as Record<string, any>;
                            def.response = {
                                ...response,
                                unique_id: uuidv4(),
                                id: uuidv4(),
                                first_name: 'firstName',
                                last_name: 'lastName',
                                full_name: 'fullName',
                                email: 'demo@ubnt.com',
                                username: 'ubnt',
                                create_time: Date.now(),
                                password_revision: Date.now(),
                                update_time: Date.now(),
                                groups: response.groups.map((g) => ({ ...g, unique_id: uuidv4(), create_time: new Date().toISOString() })),
                                roles: response.roles.map((r) => ({ ...r, unique_id: uuidv4() })),
                                deviceToken: jwt.sign({ user_id: uuidv4() }, jwtKey, { expiresIn: '100y' })
                            };
                        }

                        // @ts-ignore rawHeaders seems not typed
                        def.rawHeaders = (def.rawHeaders as Array<string>).map((def) => {
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
