import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Ionicon from 'react-ionicons';
import { NormalSkycon } from './SkyconsWrap';

const Currently = ({ current }) => (
    <section className="item-box">
        <div className="current-weather-condition item-box-alt">
            <NormalSkycon icon={current.get('icon')} />
            <span className="current-temp">
                {current.get('temperature')}
            </span>
        </div>
        <div className="current-weather-summary">
            {current.get('summary')}
        </div>
        <ul className="current-weather-detail flex-row-section item-box-alt">
            <li className="detail-item current-precip">
                <Ionicon icon="ion-umbrella" fontSize="20px" className="wobble"/>
                <span>{current.get('precipProbability')}</span>
            </li>
            <li className="detail-item current-wind-speed">
                <Ionicon 
                    icon="ion-asterisk"
                    fontSize="20px"
                    rotate={true}
                />
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
        icon: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired
    })
};


export default Currently;