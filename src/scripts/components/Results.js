import React from 'react';
import PropTypes from 'prop-types';

const Results = (props) => {
    const {results, onClick} = props;

    if (results.size === 0) return null;

    const cities = results.map((item, index) => {
        return (
            <li className="result-city">
                <a href="" className="city-info" data-index={item.get('zmw')}>
                    {item.get('name')}
                </a>
            </li>
        );
    });

    return (
        <ul className="search-results" onClick={onClick}>
            {cities}
        </ul>
    );
}

Results.propTypes = {
    onClick: PropTypes.func.isRequired
}