import React from 'react';
import { DAILY } from '../types';
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
    daily: DAILY
};

export default Daily;