const { Terminal } = require("xterm");

const original_data = Object.freeze(data);
global.orig = original_data;

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal, zsh) => {
    if (argv.indexOf('--help') !== -1) {
        terminal.writeln(`
Usage: ${argv[0]} [hostname] [-R] [--help]
    -R      Reset it to original IP (${original_data.ip})
    --help  Show this page`
        );
        return 0;
    }

    if (argv.indexOf('-R') !== -1) {
        data.ip = original_data.ip;
        zsh.update_prompt();
        return 0;
    }

    data.ip = argv[1] || 'resume.js';
    zsh.update_prompt();
    return 0;
}