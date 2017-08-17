import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Fade from './Fade';
import { UpdateButton, RemoveButton } from './Buttons';
import { SmallSkycon, NormalSkycon } from './SkyconsWrap';

const City = ({ cityEntity, onUpdateClick, onRemoveClick }) => {
    const daily = cityEntity.getIn(['weather', 'daily'])
        .map((data, index) => {
            return (
                <li className="forecast-per-day" key={index}>
                    <div className="forecast-date">{data.get('day')}</div>
                    <div className="forecast-summary">
                        <SmallSkycon icon={data.get('icon')} />
                    </div>
                    <div className="foreact-temp-minmax">
                        <span className="forecast-temp-max">{data.get('temperatureMax')}</span>
                        <span className="forecast-temp-min">{data.get('temperatureMin')}</span>
                    </div>
                </li>
            );
        })
        .toJS();  

    return (
            <div className="city-entity">
                <header className="city-header">
                    <h3 className="city-name">{cityEntity.get('shortName')}</h3>
                    <p className="city-date">{cityEntity.getIn(['weather', 'currently', 'date'])}</p>
                </header>
                <section className="city-weather">
                    <div className="current-weather">
                        <NormalSkycon icon={cityEntity.getIn(['weather', 'currently', 'icon'])} />
                        <span className="current-weather-temp">
                            {cityEntity.getIn(['weather', 'currently', 'temperature'])}
                        </span>
                    </div>
                    <div className="current-weather-detail">
                        <span className="current-precip">
                            {cityEntity.getIn(['weather', 'currently', 'precipProbability'])}
                        </span>
                        <span className="current-wind-speed">
                            {cityEntity.getIn(['weather', 'currently', 'windspeed'])}
                        </span>
                        <span className="current-wind-direct">
                        </span>
                    </div>
                </section>
                <section className="city-forecast">
                    <ul className="city-forecast-daily">
                        {daily}
                    </ul>
                </section>
                <div className="entity-buttons">
                    <UpdateButton onClick={onUpdateClick} isUpdating={cityEntity.get('isFetching')} />
                    <RemoveButton onClick={onRemoveClick} />
                </div>
            </div>
    );
};

 City.propTypes = {
    cityEntity: ImmutablePropTypes.contains({
        id: PropTypes.string.isRequired,
        shortName: PropTypes.string.isRequired,
        fullName: PropTypes.string,
        weather: ImmutablePropTypes.contains({
            updatedAt: PropTypes.number.isRequired,
            timezone: PropTypes.string.isRequired,
            currently: ImmutablePropTypes.contains({
                precipProbability: PropTypes.string.isRequired,
                windSpeed: PropTypes.string.isRequired,
                windDirection: PropTypes.number.isRequired,
                date: PropTypes.string.isRequired,
                temperature: PropTypes.string.isRequired,
                icon: PropTypes.string.isRequired,
                summary: PropTypes.string.isRequired
            }).isRequired,
            daily: ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    precipProbability: PropTypes.number.isRequired,
                    temperatureMin: PropTypes.string.isRequired,
                    temperatureMax: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired,
                    day: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired
    }).isRequired,
    onUpdateClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
}; 

export default City;