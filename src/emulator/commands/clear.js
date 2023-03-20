const { Terminal } = require("xterm");
const package = require('../../../package.json');

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [options]
    -V Print resume.js version
`
        );
        return;
    }

    if (argv.indexOf('-V') != -1) {
        terminal.write(`resume.js version ${package.version} by ${package.author}\n`);
        return;
    }

    terminal.clear();
}