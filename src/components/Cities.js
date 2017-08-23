import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { TransitionGroup } from 'react-transition-group';
import FadeOut from './FadeOut';
import City from './City';

const Cities = ({ cities, onUpdateClick, onRemoveClick }) => {

    const cityEntities = cities
        .valueSeq()
        .toArray()
        .reverse()
        .filter(city => typeof city.get('id') === 'string')
        .map(city => (
            <FadeOut key={city.get('id')}>
                <City
                    cityEntity={city}
                    onUpdateClick={e => {
                        e.preventDefault();
                        onUpdateClick(city.get('id'));
                    }}
                    onRemoveClick={e => {
                        e.preventDefault();
                        onRemoveClick(city.get('id'));
                    }}
                />
            </FadeOut>
        ));

    return (
        <TransitionGroup className="cities-container flex-container">
            {cityEntities}
        </TransitionGroup>
    );
};

Cities.propTypes = {
    cities: ImmutablePropTypes.map.isRequired,
    onUpdateClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
};

export default Cities