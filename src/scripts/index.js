import style from 'Styles/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import weatherApp from './reducers/reducers';
import App from './components/App';

let store = createStore(weatherApp);

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('app')
);