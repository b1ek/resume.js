import { Terminal } from 'xterm';
import { saveAs } from 'file-saver';
const fs = require('../fs');

/**
 * 
 * @param { string[] } argv 
 * @param { Terminal } terminal 
 */
module.exports = (argv, terminal) => {

    if (argv.indexOf('--help') != -1) {
        terminal.write(
`Usage: ${argv[0]} [DESTANATION]\n
Import files from your system to this filesystem.
`
        );
        return;
    }

    let el = document.getElementById('upload_file_btn');
    if (el == null) {
        el = document.createElement('input');
        el.style.display = 'none';
        el.type = 'file';
        el.id = 'upload_file_btn';
        el.setAttribute('multiple', 'multiple');
        document.body.appendChild(el);
    }

    const dir = argv[1] || '.';

    el.click();
    
    let files = el.files;
    global.f = files
}