import React from 'react';
import './ex-rates-list.less';
import * as _ from 'underscore';

import RateItem from "./../rate-item/rate-item.jsx";
import Loader from './../loader/loaders.jsx';
import ScrollContainer from "./../scroll-container/scroll-container.jsx";

export default class ExRatesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterValue: ''};
    }

    onRateClick(rate) {
        this.props.onSelectRate(rate);
    }

    filterInput(event) {
        this.setState({ filterValue: event.target.value });
    }

    render() {
        return (
            <div>
                <Loader show={this.props.isLoading} />
                <div style={this.props.isLoading ? { display: 'none' } : {}}>
                    <div className="ex-rates-list__filter-input">
                        <label htmlFor="filterInput"> Filter: </label>
                        <input id="filterInput"
                            type="text"
                            value={this.state.filterValue}
                            onChange={this.filterInput.bind(this)}
                        />
                    </div>
                    <ScrollContainer>
                        {_.chain(this.props.rates)
                            .filter((value) => {
                                let needToUse = true;
                                if (this.state.filterValue) {
                                    let abbr = value.curAbbreviation.toLowerCase();
                                    let filter = this.state.filterValue.toLowerCase();
                                    needToUse = abbr.includes(filter);
                                }
                                return needToUse;
                            })
                            .map((rate) => {
                                return (
                                    <RateItem key={rate.curID}
                                        rate={rate}
                                        onSelect={() => this.onRateClick(rate)}
                                        isSelected={this.props.selectedRate ? this.props.selectedRate.curID === rate.curID : false}
                                    ></RateItem>
                                )
                            })
                            .value()
                        }
                    </ScrollContainer>
                </div>
            </div>
        )
    }
}