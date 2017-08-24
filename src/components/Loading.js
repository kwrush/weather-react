import React from 'react';
import { List } from 'immutable';
import Search from './Search';

const Loading = () => (
    <div id="app">
        <Search
            results={List()}
            onResultClick={() => { }}
            onSearch={() => { }}
        />
        <div className="loading">
            <ul className="loading-spots">
                <li className="spot"></li>
                <li className="spot"></li>
                <li className="spot"></li>
                <li className="spot"></li>
                <li className="spot"></li>
            </ul>
        </div>
    </div>
);

export default Loading