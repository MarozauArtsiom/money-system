import {
    BaseApi,
    http
} from './base-api';

import * as _ from 'underscore';

export class BankApiService extends BaseApi {
    constructor() {
        super();
    }

    getTodaysCurrencies() {
        let today = new Date(Date.now());
        let currentCurrencies = this.getCurrenciesForDate(today.getFullYear(), today.getMonth(), today.getDay());

        let yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let prevCurrencies = this.getCurrenciesForDate(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDay());
        return Promise.all([currentCurrencies, prevCurrencies])
            .then(([current, previous]) => {
                let result = current;
                _.forEach(result, (rate, index) => {
                    result[index].curDifference = result[index].curOfficialRate - previous[index].curOfficialRate;
                });
                return result;
            });
    }

    getCurrenciesForDate(year, month, date) {
        let url = this.combineUrl(`/ExRates/Rates?onDate=${year}-${month}-${date}&Periodicity=0`);
        return http.get(url)
            .then((response) => { response.data.map(v => this.parseEntity(v)) });
    }

    getRateCurrencyStatistics(curID, startDate, endDate) {
        let startDateParsed = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDay()}`;
        let endDateParsed = `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDay()}`;
        let url = this.combineUrl(`/ExRates/Rates/Dynamics/${curID}?startDate=${startDateParsed}&endDate=${endDateParsed}`);
        return http.get(url)
            .then((response) => { response.data.map(v => this.parseEntity(v)) });
    }
}