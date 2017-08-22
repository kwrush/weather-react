import React from 'react';
import { connect } from 'react-redux';
import { performSearchIfNeeded, addCity } from '../store/actions';
import store from '../store/store';
import Ionicon from 'react-ionicons';
import {fromJS} from 'immutable';

const mapStateToProps = state => {
    return {
        results: state.getIn(['searchEntities', 'results'])
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onResultClick: index => {
            dispatch(addCity(index));
        },
        onSearch: query => {
            dispatch(performSearchIfNeeded(query));
        }
    };
}

const Input = ({ results, onResultClick, onSearch }) => {

    return (
        <div className="search-bar">
            <form  
                onSubmit={e => {
                    e.preventDefault();
                    onSearch(e.target.value);
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
                <div className="search-icon">
                    <Ionicon icon="ion-search" fontSize="20px" />
                </div>
            </form>
            <ul 
                className="results" 
                style={{
                    display: `${results.size > 0 ? 'block' : 'none'}` 
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
}

const SearchInput = connect(mapStateToProps, mapDispatchToProps)(Input);

export default SearchInput