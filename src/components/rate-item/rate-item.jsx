import React from 'react';
import './rate-item.less';
import * as _ from 'underscore';

export default class RateItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='rate-item' onClick={this.props.onSelect}>
                <div className='rate-item__block'>
                    <div className='rate-item__element rate-item__abbreviation'>
                        {this.props.rate.curAbbreviation}
                    </div>
                    <div className='rate-item__element rate-item__current-scale'>
                        {this.props.rate.curScale > 1 ? this.props.rate.curScale : ''}
                    </div>
                    <div className='rate-item__element rate-item__rate'>
                        {this.props.rate.curOfficialRate}
                    </div>
                    <div className={`rate-item__element rate-item__difference ${this.props.rate.curDifference < 0 ? 'rate-item__difference--plus' : 'rate-item__difference--minus'}`}>
                        {this.formatCurrencyDiff(this.props.rate.curDifference)}
                    </div>
                    <div className={`rate-item__background ${this.props.isSelected ? 'rate-item__selected' : ''}`}></div>
                </div>
            </div>
        )
    }

    formatCurrencyDiff(currency) {
        let formatedPresicion = currency.toFixed(4);
        return currency > 0 ? `+${formatedPresicion}` : formatedPresicion;
    }
}