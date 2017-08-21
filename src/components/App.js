import React from 'react';
import { fromJS } from 'immutable';
import { performSearchIfNeeded, addCity } from '../store/actions';
import SearchInput from '../containers/SearchInput';
import CityList from '../containers/CityList';

const App = (props) => {
    return (
        <div id="app">
            <SearchInput />
            <CityList />
        </div>
    );
}

export default App