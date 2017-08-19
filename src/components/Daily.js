import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Ionicon from 'react-ionicons';
import { SmallSkycon } from './SkyconsWrap';

const Daily = ({ daily }) => {

    const forecasts = daily.map((forecast, index) => {
        return (
            <li className="forecast-per-day flex-item" key={index}>
                <div className="forecast-date item-box-alt">{forecast.get('day')}</div>
                <div className="forecast-summary item-box-alt">
                    <SmallSkycon icon={forecast.get('icon')} />
                </div>
                <div className="foreact-temp-minmax item-box-alt">
                    <span className="forecast-temp-max">{forecast.get('temperatureMax')}</span>
                    <span className="forecast-temp-min">{forecast.get('temperatureMin')}</span>
                </div>
            </li>
        );
    });

    return (
        <section className="item-box">
            <ul className="daily-forecast flex-row-section">
                {forecasts.toJS()}
            </ul>
        </section>
    );
}

Daily.propTypes = {
    daily: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            precipProbability: PropTypes.number.isRequired,
            temperatureMin: PropTypes.string.isRequired,
            temperatureMax: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            day: PropTypes.string.isRequired
        })
    )
};

export default Daily;