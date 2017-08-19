import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

export const UpdateButton = ({ onClick, isUpdating }) => (
    <button 
        className="button refresh-button"
        onClick={onClick}
    >
        <Ionicon 
            icon="ion-refresh" 
            className={`${!!isUpdating ? 'spin' : ''}`} 
            fontSize="20px"
        />
    </button>
);

export const RemoveButton = ({ onClick }) => (
    <button className="button remove-button" onClick={onClick}>
        <Ionicon icon="ion-close-circled" fontSize="20px"/>
    </button>
);

UpdateButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool
}

RemoveButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

