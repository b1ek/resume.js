import { Terminal } from 'xterm';

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.writeln(`Usage: ${argv[0]} [--help]`);
        terminal.writeln('Lists all available commands.');
        return;
    }
    const cmds = Object.keys(require('../commands'));
    let i = 0;
    cmds.forEach(x => {
        if (x == argv[0]) return;
        if (i == 4) {
            terminal.writeln('');
            i = 0;
        } else i++;
        terminal.write('\033[1;32m' + x + '\033[0m\t');
    });
    terminal.writeln('');
}