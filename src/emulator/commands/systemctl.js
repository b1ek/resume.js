const { Terminal } = require("xterm");

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    terminal.writeln(`${argv[0]}: systemd is bad`);
}