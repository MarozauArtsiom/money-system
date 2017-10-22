import React from 'react';
import { Line } from "react-chartjs";

import './rate-statistic.less';

export default class RateStatistic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = {
            labels: this.props.rateCurrencyStatistic.map(statistic => (new Date(statistic.date)).toUTCString()),
            datasets: {
                label: 'Month stats',
                data: this.props.rateCurrencyStatistic.map(statistic => statistic.curOfficialRate),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        };
        return (
            <div>
                <Line data={data} width="600" height="250"/>
            </div>
        )
    }
}