import React from 'react';
import './ex-rates-list.less';
import * as _ from 'underscore';

import RateItem from "./../rate-item/rate-item.jsx";
import Loader from './../loader/loaders.jsx';
import ScrollContainer from "./../scroll-container/scroll-container.jsx";

export default class ExRatesList extends React.Component {
    constructor(props) {
        super(props);
    }

    onRateClick(rate) {
        this.props.onSelectRate(rate);
    }

    render() {
        return (
            <div>
                <Loader show={this.props.isLoading} />
                <div style={this.props.isLoading ? { display: 'none' } : {}}>
                    <ScrollContainer>
                        {_.map(this.props.rates, (rate) => {
                            return <RateItem key={rate.curID}
                                             rate={rate}
                                             onSelect={() => this.onRateClick(rate)}
                                             isSelected={this.props.selectedRate ? this.props.selectedRate.curID === rate.curID : false }
                                   ></RateItem>
                        })}
                    </ScrollContainer>
                </div>
            </div>
        )
    }
}