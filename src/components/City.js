import React from 'react';
import PropTypes from 'prop-types';
import { CITY } from '../types';
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
    cityEntity: CITY.isRequired,
    onUpdateClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
}; 

export default City