const { fs, vol } = require('memfs');
const { ufs } = require('unionfs');

ufs.use(fs).use(vol.fromJSON(require('./files')));

if (!fs.existsSync('dev'))
    fs.mkdirSync('dev');

// /dev/random & /dev/random
(async () => {
    const delay = t => new Promise(resolve => setTimeout(resolve, t));;
    const crypto = require('crypto');

    while (true) {
        await delay(3);
        const buffer = crypto.randomBytes(16);
        fs.writeFileSync('dev/urandom', buffer);
        fs.writeFileSync('dev/random', buffer)
    }
})();

ufs.constants = fs.constants;

module.exports = ufs;