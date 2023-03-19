import { Terminal } from 'xterm';
const fs = require('../fs');

/**
 * @param {string[]} argv
 * @param {Terminal} terminal
 */
module.exports = async (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(`
Usage: ${argv[0]} [URL] [-O out.file] [-V] [-Q] [-s]
    --help      Show this help
    -O [FILE]   Specify output file
    -V          Verbose mode
    -Q          Quiet mode (default)
`);
        return;
    }

    const url = argv[1];
    
    let filepath = url.split('/')[url.split('/').length - 1];
    
    if (argv.indexOf('-O') != -1) {
        if (argv.indexOf('-O') + 1 == argv.length) {
            terminal.writeln(`${argv[0]}: missing output file`);
            return;
        }
        filepath = argv[argv.indexOf('-O') + 1];
    }

    function progress(p) {
        let total = p.total;
        
        if (total == 0)
            total = '?'
        // terminal.write(`\rDownloading... ${p.loaded}/${total}`);
    }

    function write(file) {
        if (filepath == '-') {
            terminal.write(file);
        } else {
            fs.writeFileSync(filepath, new Buffer(file));
        }
    }

    let file;

    let req = new XMLHttpRequest();
    req.open('GET', 'http://cors.blek.codes/' + url, true);
    req.responseType = 'arraybuffer';
    req.onprogress = progress;
    req.onload = (e) => {
        if (e.type == 'load') {
            write(req.response);
        }
    };
    req.send();
    
    const delay = t => new Promise(resolve => setTimeout(resolve, t));
    while(req.readyState == 1) await delay(250);


    return;
}