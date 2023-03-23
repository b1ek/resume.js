import React from 'react';
import { XTerm } from 'xterm-for-react';
import { Terminal } from 'xterm';

export class Console extends React.Component {
    constructor(props) {
        super(props);
        this.terminal = React.createRef(null);

        this.terminal_el = document.getElementById('resume_js_app');
        const t_width = this.terminal_el.clientWidth - 60;
        const t_height = this.terminal_el.clientHeight - 60;

        this.state = {
            term_box: {
                width: Math.floor(t_width / 9),
                height: Math.floor(t_height / 18)
            }
        };
    }

    render() {
        return <div style={{padding: '8px'}}>
                    <XTerm
                        ref={this.terminal}
                        options={{
                            theme: {
                                background: '#212121',
                                brightGreen: '#15a179'
                            },
                            convertEol: true,
                            rows: this.state.term_box.height,
                            cols: this.state.term_box.width
                        }}
                    />
                </div>;
    }

    componentDidMount() {
        const term_ref = this.terminal.current;
        require('./emulator')(term_ref);

        /** @type { Terminal } */
        const terminal = term_ref.terminal;
        terminal.focus();

        window.onresize = (ev) => {
            const t_width = this.terminal_el.clientWidth;
            const t_height = this.terminal_el.clientHeight;
            this.setState({
                term_box: {
                    width: Math.floor(t_width / 27),
                    height: Math.floor(t_height / 6.7)
                }
            })
        };

    }
}