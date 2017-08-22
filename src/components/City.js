import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Currently from './Currently';
import Daily from './Daily';
import { UpdateButton, RemoveButton } from './Buttons';

const City = ({ cityEntity, onUpdateClick, onRemoveClick }) => {

    return (
        <div className="city-entity card">
            <header className="city-header">
                <h3 className="city-name">{cityEntity.get('shortName')}</h3>
                <p className="city-date">{cityEntity.getIn(['weather', 'currently', 'date'])}</p>
            </header>
            <Currently current={cityEntity.getIn(['weather', 'currently'])} />
            <Daily daily={cityEntity.getIn(['weather', 'daily'])} />
            <div className="ctrl-buttons">
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
        latitude: PropTypes.string,
        longitude: PropTypes.string,
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
        })
    }).isRequired,
    onUpdateClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
}; 

export default City;