import { Terminal } from 'xterm';
const fs = require('../fs');

/**
 * @param {string[]} argv
 * @param {Terminal} terminal
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(`
Usage: ${argv[0]} [DIRECTORY] [-p]
Create a directory
    -p  Create parent directories
`);
        return;
    }

    const parents = argv.indexOf('-p') != -1;
    const dir = argv[1];
    
    try {
        fs.mkdirSync(dir, {recursive: parents});
    } catch (err) {
        terminal.write(`${argv[0]}: can't create ${dir}: ${err}`);
    }
}