const { Terminal } = require("xterm");

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [OPTIONS]
Show current process list`);
        return;
    }
    terminal.write(
`\tPID\tTTY\tTIME\tCMD
 42\tpts/0\t00:00:00\tzsh
 43\tpts/0\t00:00:00\tps
`);
}