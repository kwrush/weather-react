import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App'; 
import {getWeather} from './utils/api';

getWeather({latitude: 37.8267, longitude: -122.4233}, data => {
    console.log(data);
})

ReactDOM.render(
    <App />,
    document.getElementById('root')
);  


