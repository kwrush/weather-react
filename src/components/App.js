import React from 'react';
import SearchContainer from '../containers/SearchContainer';
import CitiesContainer from '../containers/CitiesContainer';

const App = (props) => {
    return (
        <div id="app">
            <SearchContainer />
            <CitiesContainer />
        </div>
    );
}

export default App