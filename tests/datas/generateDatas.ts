import axios from 'axios';
import { format } from 'util';
import fs from 'fs';
import path from 'path';

const fingerprintsUrl = 'https://static.ubnt.com/fingerprint/%s/devicelist.json';
const fingerprintPath = path.join(__dirname, 'fingerprints');

const main = async () => {
    await Promise.all(
        [0, 1, 2].map(async (n) => {
            const res = (await axios.get(format(fingerprintsUrl, n.toString()))).data;
            return fs.promises.writeFile(path.join(fingerprintPath, `${n}.json`), JSON.stringify(res));
        })
    );
};

main().catch((e) => console.error(e));
