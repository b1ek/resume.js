const { Terminal } = require("xterm");
const sleep = require("../../lib/sleep");

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
    /** @type {string} */
    const pass = await zsh.get_stdin({hide: true});
    const some_random_array = new Uint16Array([12319, 14486, 12589, 13232]);
    let checksum = new Uint32Array(pass.length);

    let i = 0;
    for (const letter of pass) {
        checksum[i] = letter.charCodeAt(0) * 128;
        checksum[i] += (i*8) - letter.charCodeAt(0);
        i++;
    }
    i = undefined;

    console.log(checksum, some_random_array);

    let valid = true;
    if (checksum.length == some_random_array.length)
        for (let i = 0; i != some_random_array.length; i++) {
            if (checksum[i] != some_random_array[i])
                valid = false;
        }
    else
        valid = false;

    console.log(valid);

    if (valid) {
        terminal.writeln('yay, you did it!! congratulations :3');
    } else {
        await sleep(3000);
        terminal.writeln('su: Authentication failure');
        return 1;
    }
}