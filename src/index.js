/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';  */
import {getWeather, getGeoLocation} from './utils/api';

getGeoLocation('Los Angelos', data => {
    console.log(data);
}, error => {
    console.log(error);
})


/* ReactDOM.render(
    <App />,
    document.getElementById('root')
);   */


