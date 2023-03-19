const { fs, vol } = require('memfs');
fs.writeFileSync('README.md', 'uwu');
const { ufs } = require('unionfs');

ufs.use(fs).use(vol.fromJSON(require('./files')));
ufs.constants = fs.constants;

module.exports = ufs;