import React from 'react';
import ReactDOM from 'react-dom';
// test
import { performSearchIfNeeded, addCity } from './store/actions';
import store from './store/store';

ReactDOM.render(
    <input type="text" onKeyUp={e => {
        e.preventDefault();
        store.dispatch(performSearchIfNeeded(e.target.value));
        const q = store.getState().getIn(['searchEntities', 'searchQuery']);
        const results = store.getState().getIn(['searchEntities', 'results']);
        if (q.length === 9 && results.size === 1) {
            // add city(amsterdam) and fetch weather
            store.dispatch(addCity(results.get(0)));
        }
    }} />,
    document.getElementById('root')
);


