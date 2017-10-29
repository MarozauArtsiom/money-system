import React from 'react';
import { Chart } from 'chart.js';
import * as _ from 'underscore';

import './rate-statistic.less';

export default class RateStatistic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <canvas id="myChart"
                        ref={(canvas) => {
                            this.canvas = canvas;
                        }}
                ></canvas>
            </div>
        )
    }

    componentDidUpdate() {
        if (this.canvas && this.props.rateCurrencyStatistic) {
            this.renderChart(this.canvas, this.props.rateCurrencyStatistic);
        }
    }

    renderChart(convas, rateCurrencyStatistic) {
        let values = _.chain(rateCurrencyStatistic)
            .map((rate) => {
                let date = new Date(rate.date);
                return {
                    date: date,
                    label: date.toDateString(),
                    curOfficialRate: rate.curOfficialRate
                }
            })
            .sortBy(x => x.date)
            .value();

        let minValue = _.min(values, (v) => v.curOfficialRate);
        let maxValue = _.max(values, (v) => v.curOfficialRate);
        let distanceValue = maxValue.curOfficialRate - minValue.curOfficialRate;
        let borderVal = 3 / 10;

        var ctx = convas.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: _.map(values, x => x.label),
                datasets: [{
                    label: 'Rates',
                    data: _.map(values, x => x.curOfficialRate),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            min: minValue.curOfficialRate - borderVal * distanceValue,
                            max: maxValue.curOfficialRate + borderVal * distanceValue
                        }
                    }]
                }
            }
        });

    }
}