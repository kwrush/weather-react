import React from 'react';
import PropTypes from 'prop-types'
import { SEARCH_RESULTS } from '../types';
import Ionicon from 'react-ionicons';

const Search = ({ results, searchQuery, onResultClick, onSearch }) => (
    <div className="search-bar">
        <form
            onSubmit={e => {
                e.preventDefault();
                onSearch(searchQuery);
            }}
        >
            <input
                type="text"
                className="search-input"
                onKeyUp={e => {
                    e.preventDefault();
                    onSearch(e.target.value);
                }}
            />
            <a className="search-icon">
                <Ionicon icon="ion-search" fontSize="20px" />
            </a>
        </form>
        <ul
            className="results"
            style={{
                display: `${(results.size === 0 || searchQuery.length < 2) ? 'none' : 'block'}`
            }}
            onClick={e => {
                e.preventDefault();
                onResultClick(e.target.dataset.index);
            }}
        >
            {results.map((result, index) => (
                <li data-index={index} className="result" key={index}>
                    {result.get('fullName')}
                </li>
            ))}
        </ul>
    </div>
);

Search.propTypes = {
    results: SEARCH_RESULTS.isRequired,
    onResultClick: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default Search;