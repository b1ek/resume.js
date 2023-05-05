const { Terminal } = require("xterm");

/**
 * @param {string[]} argv
 * @param {Terminal} terminal
 */
module.exports = async (argv, terminal, zsh) => {
    if (argv.indexOf('--help') !== -1) {
        terminal.writeln(
            `Usage: ${argv[0]} [options] [<user>]` + '\n' +
            'Change the user ID and group ID to <user>\'s.' + '\n' +
            '\n' +
            'If <user> is not giver, root is assumed.' + '\n' +
            'This command is an easter egg. Try to guess the root\'s password!'
        );
        return;
    }

    const user = argv[1] || 'root';
    const users = Object.freeze(['root', 'daemon', 'bin', 'sys', 'adm', 'nobody', 'lpd', 'lp', 'ipsec', 'user']);

    if (users.indexOf(user) == -1) {
        terminal.writeln(`${argv[0]}: user ${user} does not exist or the user entry does not contain all the required fields`);
        return 2;
    }

    terminal.write('Password: ');
    const pass = await zsh.get_stdin({hide: true});

    terminal.write(pass);
}