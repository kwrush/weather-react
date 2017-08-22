import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { performSearchIfNeeded, fetchWeather, removeCity } from '../store/actions';
import store from '../store/store';
import City from '../components/City';

const mapStateToProps = state => {
    return {
        cities: state.get('cities')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateClick: id => {
            dispatch(fetchWeather(id))
        },

        onRemoveClick: id => {
            dispatch(removeCity(id))
        }
    }
}

const Cities = ({ cities, onUpdateClick, onRemoveClick }) => {

    const cityEntities = cities.valueSeq().toArray().reverse();
    
    return (
        <div className="cities-container flex-container">
            <TransitionGroup>
            {
                cityEntities
                .filter(city => typeof city.get('id') === 'string')
                .map(city => (
                    <CSSTransition 
                        key={city.get('id')}
                        classNames="fadeout"
                        timeout={0}
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
                    </CSSTransition>
                ))
            }
            </TransitionGroup>
        </div>
    );
}

const CityList = connect(mapStateToProps, mapDispatchToProps)(Cities);

export default CityList