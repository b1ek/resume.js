import React from 'react';
import { XTerm } from 'xterm-for-react'

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
                            convertEol: true
                        }}
                    />
                </div>;
    }

    componentDidMount() {
        require('./emulator')(this.terminal.current);
        this.terminal.current.terminal.focus(); 
    }
}