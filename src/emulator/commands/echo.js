const { Terminal } = require("xterm");

/**
 * 
 * @param {string[]} argv 
 * @param {Terminal} terminal 
 */
module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [-e] [MESSAGE]
Print a line of text into terminal.
    -e \t Enable parsing of backslash escapes`
        );
        return;
    }

    let args = [...argv];
    args.shift();

    // remove -e
    if (args.indexOf('-e') != -1)
        args.splice(args.indexOf('-e'), 1)

    let text = args.join(' ');

    if (argv.indexOf('-e') != -1) {
        try {
            text = JSON.parse(`"${text}"`);
        } catch (err) {
            terminal.write(`${argv[0]}: can't parse string: ${err}`);
        }
    }

    terminal.writeln(text);
}