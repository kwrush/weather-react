import React from 'react';
import { connect } from 'react-redux';
import { performSearchIfNeeded, addCity } from '../store/actions';
import store from '../store/store';
import City from '../components/City';

const mapStateToProps = state => {
    return {
        cities: state.get('cities')
    }
};

const Cities = ({ cities }) => {

    const cityEntities = cities.valueSeq().toArray();
    
    return (
        <div className="flex-container">
            {cityEntities.map(city => (
                <City
                    key={city.get('id')}
                    cityEntity={city}
                    onUpdateClick={() => { }}
                    onRemoveClick={() => { }}
                />
            ))}
        </div>
    );
}

const CityList = connect(mapStateToProps, null)(Cities);

export default CityList