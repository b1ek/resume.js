module.exports = (argv, terminal) => {
    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [-r]
Print out the guide how to use the terminal
    -r \t Undocumented feature
`
        );
        return;
    }

    if (argv.indexOf('-r') != -1) {
        // TODO: put some easter eggs here
    }

    terminal.write(
`Welcome to my resume!
This is a UNIX terminal emulator.
Most of the basic unix commands are available (ls, cat, rm, mkdir, etc)

Although you may not be a unix user so heres a quick summary what command does what:
ls \t- List files in directory
cat \t- Read file contents to terminal
rm \t- Remove file contents
mkdir \t- Create directory
wget \t- Download file from internet (more: wget --help)
ps \t- List processes
l \t- alias to ls -al

Also there are some custom defined commands which are somewhat more fun:
guide \t- Show you this menu
skills \t- My skills info
`
    );
}