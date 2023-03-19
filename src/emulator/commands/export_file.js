import { Terminal } from 'xterm';
import { saveAs } from 'file-saver';
const fs = require('../fs');

/**
 * 
 * @param { string[] } argv 
 * @param { Terminal } terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1 || argv.length == 1) {
        terminal.write(
`Usage: ${argv[0]} [FILES] [-z]
Export file from filesystem to your device.
    -z  Compress in zip format (not supported)`);
        return;
    }

    let files = [...argv];
    files.shift();

    if (argv.indexOf('-z') != -1) {
        terminal.write(`${argv[0]}: cannot zip '${files.join(' ').replace('\'', "\\'")}': not supported\n`);
        return;
    }

    try {
        var isFileSaverSupported = !!new Blob;
    } catch (e) {}

    if (!isFileSaverSupported) {
        terminal.write(`${argv[0]}: Your browser does not support this feature.`);
        return;
    }

    if (!fs.existsSync(argv[1])) {
        terminal.write(`${argv[0]}: cannot open ${argv[1]}: no such file or directory\n`);
        return;
    }
    saveAs(new Blob([fs.readFileSync(argv[1])]), argv[1]);


}