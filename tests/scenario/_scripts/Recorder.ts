import createDebug, { Debugger } from 'debug';
import nock, { Back, BackContext, Definition } from 'nock';
import path from 'path';
import dotEnv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import { DefinitionImproved, recorderRules, TEST_UNIFI_URL, TEST_UNIFIOS_URL, UNIFI_PASSWORD, UNIFI_USERNAME } from './RecoderRewriteRules';
import { glob } from 'glob';

const rootPath = path.join(__dirname, '..', '..', '..');

export const FIXTURES_PATH = path.join(rootPath, 'tests', 'nockFixtures');

type fakeNockType = {
    back: Back;
    enableNetConnect: () => void;
};

type recordMode = 'true' | 'skip';

export class Recorder {
    private readonly debug = createDebug('test-recorder');

    public readonly nock = nock;

    private readonly recordMode?: recordMode;
    private isGeneratingMockTestMode: boolean = false;

    private store: Record<string, unknown> = {};

    constructor() {
        dotEnv.config({
            path: path.join(rootPath, '.env')
        });

        this.debug('construct');

        this.nock.back.fixtures = FIXTURES_PATH;

        this.recordMode = process.env.JEST_RECORD as recordMode | undefined;

        this.debug('set record mode to %o', this.recordMode);
        if (this.isRecordMode()) {
            this.debug('set nock mode to "record" and enable net connect');
            this.nock.back.setMode('record');
            this.nock.enableNetConnect();
        }
    }

    private hash(str: string): string {
        return crypto.createHash('sha256').update(str).digest('hex');
    }

    public isRecordMode() {
        return this.recordMode === 'true';
    }

    public getFullFixturePath(name: string, unifiOs = true): string {
        return path.join(FIXTURES_PATH, this.getFixturePath(name, unifiOs));
    }

    private getFixturePath(name: string, unifiOs = true): string {
        return path.join(unifiOs ? 'unifios' : 'unifi', this.hash(name) + '.json');
    }

    /**
     * start a mode that will automatically delete files when retrying to record them .
     * can be useful to tests mocks
     */
    public startGeneratingMockTestMode() {
        this.isGeneratingMockTestMode = true;
    }

    public stopGeneratingMockTestMode() {
        this.isGeneratingMockTestMode = false;
    }

    async record<T>(
        name: string,
        fn: (context?: BackContext) => Promise<T>,
        unifiOs = true,
        options?: {
            byPassCheckExist: boolean;
        }
    ): Promise<T> {
        const filePath = this.getFixturePath(name, unifiOs);
        const fullFilePath = this.getFullFixturePath(name, unifiOs);

        if (this.recordMode === 'skip') {
            this.debug('recordMode set to skip, skipping http mock');
            return fn();
        }

        if (!options?.byPassCheckExist && this.recordMode === 'true' && fs.existsSync(fullFilePath)) {
            if (!this.isGeneratingMockTestMode) {
                throw new Error(`this record seems to already exist . Delete it before recording it`);
            }

            await fs.promises.unlink(fullFilePath);
        }

        this.debug('record %o (unifios ? %o) will be stored in : %o', name, unifiOs, fullFilePath);
        const { nockDone, context } = await this.nock.back(filePath, {
            afterRecord: this.getAfterRecordHandler(name, unifiOs)
        });
        try {
            const res = await fn(context);
            nockDone();
            return res;
        } catch (e) {
            this.debug('record %o failed with : %O', name, e);
            this.nock.recorder.clear();
            throw e;
        } finally {
            this.debug('end record %o', name);
        }
    }

    getAfterRecordHandler(name: string, unifiOs: boolean) {
        return (definitions: Array<Definition>): Array<Definition> => {
            this.debug('afterRecordHandler');

            return definitions.map((definition: DefinitionImproved) => ({
                ...definition,
                __isUnifiOs: unifiOs,
                __name: name
            }));
        };
    }

    async teardown() {
        this.debug('teardown');

        if (!this.isRecordMode()) {
            this.debug('not recordMode skip');
        }

        const definitionsFiles = await glob(`${FIXTURES_PATH.split(path.sep).join(path.posix.sep)}/**/*.json`);
        this.debug('found %o definitions files');

        await Promise.all(
            definitionsFiles.map(async (file) => {
                const definitions: Array<DefinitionImproved> = await (async () => {
                    const fileBuffer = await fs.promises.readFile(file);

                    try {
                        return JSON.parse(fileBuffer.toString());
                    } catch (e) {
                        throw new Error(`fail to parse json from file ${file}`);
                    }
                })();

                const recordStore = {};

                const newDefinitions = definitions.map((definition: DefinitionImproved) => {
                    if (typeof definition.scope === 'object') {
                        throw new Error('non "string" scope not handled');
                    }

                    const definitionStore = {};

                    recorderRules.reduce((previousValue, rule) => {
                        if (
                            Object.entries(rule.match).some(([k, v]) => {
                                return typeof v === 'function'
                                    ? // @ts-ignore
                                      !v(previousValue[k])
                                    : previousValue[k] != v;
                            })
                        ) {
                            return previousValue;
                        }

                        return rule.fn(definition, {
                            global: this.store,
                            definition: definitionStore,
                            record: recordStore
                        });
                    }, definition);

                    return definition;
                });

                await fs.promises.writeFile(file, JSON.stringify(newDefinitions));
            })
        );
    }
}

export const recorder = new Recorder();

export { UNIFI_USERNAME, UNIFI_PASSWORD, TEST_UNIFIOS_URL, TEST_UNIFI_URL };
