import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Ionicon from 'react-ionicons';
import SkyconsWrap from './SkyconsWrap';

const Currently = ({ current }) => (
    <section className="outer-item-box">
        <div className="current-weather-condition inner-item-box">
            <div className="current-condition">
                <SkyconsWrap icon={current.get('icon')} size="l" />
                <span className="current-temp">
                    {current.get('temperature')}
                </span>
            </div>
            <div className="current-summary">{current.get('summary')}</div>
        </div>
        <ul className="current-weather-detail flex-section inner-item-box">
            <li className="detail-item">
                <Ionicon icon="ion-umbrella" fontSize="20px" />
                <span>{current.get('precipProbability')}</span>
            </li>
            <li className="detail-item">
                <Ionicon icon="ion-flag"  fontSize="20px" />
                <span>{`${current.get('windSpeed')}`}</span>
                <Ionicon 
                    icon="ion-arrow-right-c" 
                    fontSize="20px" 
                    style={{
                        transform: `rotate(${current.get('windDirection')}deg)`,
                        WebkitTransform: `rotate(${current.get('windDirection')}deg)`
                    }}
                />
            </li>
        </ul>
    </section>
);

Currently.propTypes = {
    current: ImmutablePropTypes.contains({
        precipProbability: PropTypes.string.isRequired,
        windSpeed: PropTypes.string.isRequired,
        windDirection: PropTypes.number.isRequired,
        temperature: PropTypes.string.isRequired,
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
        summary: PropTypes.string.isRequired
    })
};


export default Currently;