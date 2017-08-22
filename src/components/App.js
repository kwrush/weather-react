import React from 'react';
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