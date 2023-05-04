const { Terminal } = require("xterm");
const sleep = require('../../lib/sleep');

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = async (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [OPTIONS]
Show current process list`);
        return;
    }
    terminal.write('PID\tTTY\tTIME\t\tCMD');

    await sleep(5);

    terminal.write(`
1\tpts/0\t00:00:00\tzsh
2\tpts/0\t00:00:00\tps
`);
}