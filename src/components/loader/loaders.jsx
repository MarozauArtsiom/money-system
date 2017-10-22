import React from 'react';
import './loader.less';

export default class loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='loader' style={this.props.show ? {} : { display: 'none' }}>
                <div id="fountainG">
                    <div id="fountainG_1" className="fountainG"></div>
                    <div id="fountainG_2" className="fountainG"></div>
                    <div id="fountainG_3" className="fountainG"></div>
                    <div id="fountainG_4" className="fountainG"></div>
                    <div id="fountainG_5" className="fountainG"></div>
                    <div id="fountainG_6" className="fountainG"></div>
                    <div id="fountainG_7" className="fountainG"></div>
                    <div id="fountainG_8" className="fountainG"></div>
                </div>
            </div>
        )
    }
}