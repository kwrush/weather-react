import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Ionicon from 'react-ionicons';
import SkyconsWrap from './SkyconsWrap';

const Daily = ({ daily }) => {

    const forecasts = daily ? daily.map((forecast, index) => {
        return (
            <li className="flex-item" key={index}>
                <div className="forecast-date inner-item-box">{forecast.get('day')}</div>
                <div className="inner-item-box">
                    <SkyconsWrap icon={forecast.get('icon')} size="m" />
                </div>
                <div className="forecast-temp-minmax">
                    <span className="temp-max">{forecast.get('temperatureMax')}</span>
                    <span className="temp-min">{forecast.get('temperatureMin')}</span>
                </div>
            </li>
        );
    }) : [];

    return (
        <section className="outer-item-box">
            <ul className="flex-section">
                {forecasts}
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
            icon: PropTypes.oneOf([
                'CLEAR_DAY',
                'CLEAR_NIGHT',
                'PARTLY_CLOUDY_DAY',
                'PARTLY_CLOUDY_NIGHT',
                'CLOUDY',
                'RAIN',
                'SLEET',
                'SNOW',
                'WIND',
                'FOG'
            ]),
            day: PropTypes.string.isRequired
        })
    )
};

export default Daily;