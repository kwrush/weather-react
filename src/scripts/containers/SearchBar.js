import React from 'react';
import { connect } from 'react-redux';
import { addCity } from 'Scripts/actions/actions';
import Results from 'Scripts/components/Results';

const mapStateToProps = (state) => {
    const results = state.results;
    const cities = results.map(item => {
        return item.get('name');
    });

    return {
        cities: cities
    }
}

let SearchBar = (props) => {
    const {dispatch, cities} = props;
    let input = null;

    return (
        <div className="search-bar">
            <form
                onSubmit={evt => {
                    evt.preventDefault();
                    dispatch(searchCities(input.value));
                }}
            >
                <input 
                    type="text" 
                    ref={elm => input = elm} 
                    onKeyUp={evt => {
                        evt.preventDefault();
                        dispatch(searchCities(input.value));
                    }}
                />
            </form>
            <Results results={cities} />
        </div>
    );
}

SearchBar = connect(mapStateToProps)(SearchBar);

export default SearchBar;
