import React from 'react';
import { XTerm } from 'xterm-for-react';
import { Terminal } from 'xterm';

export class Console extends React.Component {
    constructor(props) {
        super(props);
        this.terminal = React.createRef(null);
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
                            rows: 30,
                            cols: 200
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
    }
}