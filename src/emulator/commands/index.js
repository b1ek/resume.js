let cmds = {
    'cat': require('./cat'),
    'cmds': require('./cmds'),
    'cmdls': require('./cmds'),
    'help': require('./cmds'),
    'ls': require('./ls'),
    'skills': require('./skills'),
    'mkdir': require('./mkdir'),
    'wget': require('./wget'),
    'export_file': require('./export_file'),
    'import_file': require('./import_file'),
    'zsh': require('./zsh'),
    'ps': require('./ps'),

    // alias l='ls -l'
    'l': (a,t) => {require('./ls')([...a, '-l'], t)},
};

module.exports = cmds;