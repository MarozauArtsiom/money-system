import React from 'react';
import './scroll-container.less';

export default class ScrollContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='scroll-container'>
                <div className='scroll-container__wrapper'>
                    <div className='scroll-container__content'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}