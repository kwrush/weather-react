import React from 'react';
import PropTypes from 'prop-types';

export const UpdateButton = ({ onClick, isUpdating }) => (
    <button 
        className={`button update-button${isUpdating ? ' spin' : ''}`}
        onClick={onClick}
    >
    </button>
);

export const RemoveButton = ({ onClick }) => (
    <button 
        className="button remove-button"
        onClick={onClick}
    >
    </button>
);

UpdateButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isUpdating: PropTypes.func
}

RemoveButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

