
import { Terminal } from 'xterm';
import { XTerm } from 'xterm-for-react';

const fs = require('./fs');
global.fs = fs;
const cmds = require('./commands');

/**
 * @type { Terminal }
 */
let terminal;

/**
 * @type { XTerm }
 */
let dom;

const prompt = `\x1b[1;32muser@${data.ip} \x1b[36m~ $ \x1b[0m`;
let cmd = '';
let lastcmd = window.sessionStorage.getItem('last_cmd') || '';

function text_prompt() {
    return prompt.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

/**
 * 
 * @param { string } char 
 * @param { KeyboardEvent } dom 
 */
function pr_char(char, dom) {
    if (dom.key.length != 1) return;

    cmd += char;
    terminal.write(char);
}

function exec_file(f) {

    const exists = fs.existsSync(f);
    if (!exists) {
        terminal.write('zsh: no such file or directory: ' + f);
        return;
    }

    const executable = fs.accessSync(f, fs.constants.X_OK);
    if (!executable) {
        terminal.writeln('zsh: permission denied: ' + f);
        return;
    }
    
    terminal.writeln('This is an online resume. It is not big enough to have a script runtime.\n');
    return;
}

async function exec_cmd() {
    let c = cmd;
    const command = c.split(' ')[0];
    reset_cmd(c);
    lastcmd = c;
    window.sessionStorage.setItem('last_cmd', c);

    if (command == '') {
        print_prompt();
        return;
    }

    // if path
    if (command.match(/^((\.|\.\.)\/|\/).+$/gm)) {
        exec_file(command);
        terminal.writeln('');
        print_prompt();
        return;
    }

    if (cmds[command] != undefined) {
        const startY = terminal.buffer.normal.cursorY

        await cmds[command](c.split(' '), terminal);

        await (new Promise(resolve => setTimeout(resolve, 10)));

        if (terminal.buffer.active.cursorX != 0 && startY != terminal.buffer.active.cursorY) {
            terminal.write('\033[30;47m%\033[0m\n');
        }
        print_prompt();
        return;
    }
    
    terminal.writeln('zsh: command not found: ' + command);
    print_prompt();
}

function print_prompt() {
    terminal.write(prompt);
}

function reprint_prompt() {
    terminal.write('\033[2K\r');
    print_prompt();
}

function reset_cmd() {
    cmd = '';
    terminal.writeln('');
}

function cbackspace() {
    let exploded = cmd.substring(0, cmd.length - 2).split(' ');
    
    if (exploded.length == 1) {
        reprint_prompt();
        cmd = '';
        return;
    }
    exploded.pop();
    
    cmd = exploded.join(' ') + ' ';
    reprint_prompt();
    terminal.write(cmd);
    return;

}

function backspace(isCtrl) {
    if (terminal.buffer.active.cursorX <= text_prompt().length) return;

    if (isCtrl) {
        return cbackspace();
    }

    terminal.write('\b \b');
    cmd = cmd.substring(0, cmd.length - 1);
}

/** @param { KeyboardEvent } dom */
async function control_char(id, dom) {
    
    switch (id) {

        // backspace
        case 8:
            backspace(dom.ctrlKey);
            break;

        // enter
        case 13:
            exec_cmd();
            break;
        
        case 38:
            if (lastcmd == '') break;
            cmd = lastcmd;
            reprint_prompt();
            terminal.write(lastcmd);
            break;
        
        // Ctrl+c
        case 67:
            if (dom.ctrlKey) {
                terminal.write('^C');
                reset_cmd();
                print_prompt();
                break;
            }

        case 86:
            if (dom.altKey) break;
        
        case 82:
            // Why it checks if letter is 'r':
            // For some reason, ctrl+(v|r|d) executed this code.
            // This is a simple fix
            // (same works for any other code like this in this function)
            if (dom.ctrlKey && dom.key.toLowerCase() == 'r') {
                if (Math.random() < 0.1) terminal.write('uwu');
                window.location.reload();
                break;
            }
        
        case 68:
            if (dom.ctrlKey && dom.key.toLowerCase() == 'd') {
                terminal.writeln('');
                pr_char = () => {};
                exec_cmd = pr_char;
                control_char = () => {};
                break;
            }

        default:
            const wr = (t) => {
                terminal.write(t);
                cmd += t;
            }
            if (dom.ctrlKey && (dom.key.length == 1)) {
                wr('^' + dom.key.toUpperCase());
                break;
            }

            wr('<');
            if (dom.ctrlKey)    wr('C');
            if (dom.altKey)     wr('A');
            if (dom.shiftKey)   wr('S');
            wr(`${id}>`)
            break;
    }
}

function key(e) {
    /** @type {KeyboardEvent} */
    const dom = e.domEvent;
    if (dom.key.length == 1 && !(dom.ctrlKey || dom.altKey)) {
        pr_char(e.domEvent.key, dom);
    } else {
        control_char(e.domEvent.keyCode, dom)
    }
}

function register(t, d) {
    terminal = t;
    dom = d;

    terminal.onKey(key);
    terminal.write(prompt);
}

register.pr_char = pr_char;

module.exports = register;