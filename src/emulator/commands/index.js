let cmds = {
    'cat': require('./cat'),
    'cmds': require('./cmds'),
    'cmdls': require('./cmds'),
    'help': require('./cmds'),
    'ls': require('./ls'),
    'mkdir': require('./mkdir'),
    'wget': require('./wget'),
    'export_file': require('./export_file'),
    'import_file': require('./import_file'),
    'ps': require('./ps'),
    'clear': require('./clear'),
    'rm': require('./rm'),
    'echo': require('./echo'),
    'exit': require('./exit'),
    'systemctl': require('./systemctl'),
    'set-hostname': require('./set-hostname.js'),
    
    // funny stuff
    'su': require('./su'),
    'zsh': require('./zsh'),


    'guide': require('./guide'),
    'skills': require('./skills'),

    // alias l='ls -l'
    'l': (a,t) => {require('./ls')([...a, '-l'], t)},
};

module.exports = cmds;