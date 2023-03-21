const { Terminal } = require("xterm");
const fs = require('../fs')

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [...FILES] [OPTIONS]
Delete specified flies
    -r -R --recursive   Recursively delete all files in directory
    -f --force          Ignore nonexistant files and arguments
`
        );
        return;
    }

    let files = [...argv];
    files.shift();
    files = files.filter(file => !file.startsWith('-'));

    let args = [...argv].filter(arg => arg.startsWith('-'));

    // explode -abc => -a -b -c
    args.forEach((arg, i) => {
        if (arg.match(/-\w{2,}/)) {
            args.splice(i, 1);
            arg.substring(1).split('').forEach(part => args.push('-' + part));
        }
    })

    const recursive = args.indexOf('-r') != -1;
    const force     = args.indexOf('-f') != -1;

    files.forEach(file => {
        try {
            const stat = fs.lstatSync(file);

            if (stat.isDirectory()) {
                if (!recursive) {
                    if (!force)
                        terminal.writeln(`${argv[0]}: cannot remove ${file}: is a directory`);
                    return -1;
                }
                fs.readdirSync(file).forEach(file => fs.unlinkSync(file));
                fs.rmdirSync(file);
            }
            fs.unlinkSync(file);
        } catch (err) {
            if (!force)
                terminal.writeln(`${argv[0]}: cannot remove ${file}: ${err}`);
        }
    });
}