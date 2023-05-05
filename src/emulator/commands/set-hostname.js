const { Terminal } = require("xterm");

const orig_ip = data.ip;

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal, zsh) => {
    if (argv.indexOf('--help') !== -1 | (!argv[1])) {
        terminal.writeln(`Usage: ${argv[0]} [hostname] [-R] [--help]
    -R      Reset it to original IP (${orig_ip})
    --help  Show this page`
        );
        return 0;
    }

    if (argv.indexOf('-R') !== -1) {
        data.ip = orig_ip;
        zsh.update_prompt();
        return 0;
    }

    if (argv[1] == 'blek.codes') {
        terminal.writeln(`${argv[0]}: cannot set hostname to ${argv[1]}: permission denied (you are not on blek.codes you moron)`);
        return 1;
    }

    data.ip = argv[1];
    zsh.update_prompt();
    return 0;
}