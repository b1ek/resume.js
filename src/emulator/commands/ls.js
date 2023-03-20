const { Terminal } = require('xterm');
const fs = require('../fs');

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.writeln(`Usage: ${argv[0]} [dirs] [-a|--all] [-l]`);
        terminal.writeln('Lists files in directories');
        terminal.writeln('  -a --all List all files (including those who start with .)');
        terminal.writeln('  -l       Use long listing format');
        return;
    }

    const has_arg = (arg) => {return argv.indexOf(arg) != -1};

    let directories = [...argv];

    const all = (has_arg('-a') || has_arg('--all'));
    const long_format = has_arg('-l');

    directories.shift();

    // remove .* files if -a not specified
    if (!all)
        directories = directories.filter(x => !x.startsWith('.'));
    
    // remove arguments
    directories = directories.filter(x => !x.startsWith('-'));

    if (directories.length == 0) directories = ['.'];

    // remove dublicates
    directories = [...new Set(directories)];

    directories.forEach((dir, i) => {

        if (!fs.lstatSync(dir).isDirectory()) {
            terminal.write(dir);
            return;
        }
        
        if (directories.length != 1) {
            terminal.writeln(dir + ':');
            terminal.writeln('');
        }

        if (!fs.existsSync(dir)) {
            terminal.writeln(`${argv[0]}: cannot access '${dir}': No such file or directory`);
            return;
        }
        let files = fs.readdirSync(dir);
        files.forEach((file, i) => {

            if (!long_format)
                terminal.write(file + '\033[0m\t');
            else
                terminal.writeln('drwx-xr-x  1 nobody nobody 4.0K Jan 1 13 01:00 ' + file);
            if ((i+1) % 5 == 0)
                terminal.writeln('');
        });
    })
    terminal.writeln('');
}