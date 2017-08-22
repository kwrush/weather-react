import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import { fetchWeatherIfNeeded, removeCity } from '../store/actions';
import FadeOut from '../components/FadeOut';
import City from '../components/City';

const mapStateToProps = state => {
    return {
        cities: state.get('cities')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateClick: id => {
            dispatch(fetchWeatherIfNeeded(id))
        },

        onRemoveClick: id => {
            dispatch(removeCity(id))
        }
    }
}

const Cities = ({ cities, onUpdateClick, onRemoveClick }) => {

    const cityEntities = cities
        .valueSeq()
        .toArray()
        .reverse()
        .filter(city => typeof city.get('id') === 'string')
        .map(city => (
            <FadeOut 
                key={city.get('id')}
                mountOnEnter={true} 
                unmountOnExit={true}
            >
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
}

const CityList = connect(mapStateToProps, mapDispatchToProps)(Cities);

export default CityList