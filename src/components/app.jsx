import React from 'react';
import './app.less';

import { BankApiService } from './../services/bank-api.js';

import ExRatesList from './ex-rates-list/ex-rates-list.jsx';
import RateInformation from "./rate-information/rate-information.jsx";
import RateStatistic from './rate-statistic/rate-statistic.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.bankApiService = new BankApiService();
        this.initializeData();
        this.onSelectRate = (selectedRate) => {
            this.setState({ selectedRate: selectedRate });
            let now = Date.now();
            let startDay = new Date(now);
            let endDate = new Date(now);
            endDate.setMonth(endDate.getMonth() + 1);

            this.bankApiService.getRateCurrencyStatistics(selectedRate.curID, startDay, endDate)
                .then((stats) => {
                    this.setState({ rateCurrencyStatistic: stats });
                });
        }
    }

    initializeData() {
        this.state = {};
        this.bankApiService.getTodaysCurrencies()
            .then((rates) => {
                this.setState({ rates: rates })
            });
    }

    render() {
        return (
            <div className='app'>
                <div className="app__container">
                    <div className='app__ex-rates-list'>
                        <ExRatesList rates={this.state.rates}
                                     isLoading={!this.state.rates}
                                     onSelectRate={this.onSelectRate}
                                     selectedRate={this.state.selectedRate}
                        />
                    </div>
                    <div className='app__rate-information'>
                        <RateInformation rate={this.props.selectedRate} />
                    </div>
                    <div className='app__rate-statistic'>
                        <RateStatistic rateCurrencyStatistic={this.state.rateCurrencyStatistic}
                        />
                    </div>
                </div>
            </div>
        );
    }
}