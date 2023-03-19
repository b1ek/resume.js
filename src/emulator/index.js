module.exports = (dom) => {
    const terminal = dom.terminal;

    terminal.writeln('Welcome to my online resume!')
    terminal.writeln('Type \033[1;32mhelp\033[0m for list of commands')
    terminal.writeln('Use \033[1;33mAlt+C/V\033[0m to copy or paste');
    terminal.writeln('');

    require('./zsh')(terminal, dom);
    require('./pastebuffer')(terminal, dom);
}