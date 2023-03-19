import { Terminal } from "xterm"
import copy from 'copy-to-clipboard';

/** @type { Terminal } */
let terminal;
const zsh = require('./zsh');

/**
 * 
 * @param {{ key: string, domEvent: KeyboardEvent }} e 
 */
async function keyHandler(e) {
    const dom = e.domEvent;

    if (!dom.altKey)
        return;
    
    if (dom.key.length != 1)
        return;

    switch (dom.key.toLowerCase()) {
        case 'c':
            if (!terminal.hasSelection()) break;
            
            copy(terminal.getSelection())
            break;
        case 'v':
            zsh.pr_char(prompt("Paste your text:"), {key: 'a'})
            
    }
}

module.exports = (t, d) => {
    terminal = t;
    terminal.onKey(keyHandler);
    
}