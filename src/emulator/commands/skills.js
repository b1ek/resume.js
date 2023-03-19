const fs = require('../fs');

module.exports = (argv, terminal) => {

    if (argv.indexOf('--help') != -1) {
        terminal.writeln(`Usage: ${argv[0]}\nShows my skills info`);
        return;
    }

    if (argv[1] != undefined) {
        const file = 'skills/' + argv[1];
        if (!fs.existsSync(file))
            return;
        terminal.write(fs.readFileSync(file));
        return;
    }    

    terminal.write(`
My skills

\x1b[1;32m[#####] 100% Web dev (fullstack)\x1b[0m
I like doing backend mostly, but sometimes i do
frontend projects like this one.
Learn more: \x1b[4;32mskills web\x1b[0m

\x1b[1;33m[##   ] 40%  Native C/C++/Rust\x1b[0m
Not really my zone of work but its really fun to
make something with these in spare time.
Learn more: \x1b[4;32mskills nt\x1b[0m

\x1b[1;38:5:244m[     ] 0%   Being cis\x1b[0m
Never liked it
`);
}