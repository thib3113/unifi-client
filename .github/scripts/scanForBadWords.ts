import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

const args = process.argv.slice(2);

const main = async () => {
    const bannedWordsPath = path.join(process.cwd(), 'badwords.json');
    if (!fs.existsSync(bannedWordsPath)) {
        return;
    }
    const bannedWords: Array<{ search: string; replacement: string }> = JSON.parse(fs.readFileSync(bannedWordsPath).toString());
    const pattern = args[0];
    const files: Array<string> = await glob(pattern);
    if (files.length === 0) {
        throw new Error(`no files found with pattern ${pattern}`);
    }

    files.forEach((f) => {
        let fileContent = fs.readFileSync(f).toString();
        bannedWords.forEach((w) => {
            fileContent = fileContent
                .split(w.search)
                .join(w.replacement)
                .split(JSON.stringify(w.search))
                .join(JSON.stringify(w.replacement));
        });
        fs.writeFileSync(f, fileContent);
    });
};

main().catch((e) => console.error(e));
