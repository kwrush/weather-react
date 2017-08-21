import React from 'react';
import { connect } from 'react-redux';
import { performSearchIfNeeded, addCity } from '../store/actions';
import store from '../store/store';
import {fromJS} from 'immutable';

const mapStateToProps = state => {
    return {
        results: state.getIn(['searchEntities', 'results'])
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onResultClick: e => {
            const target = e.target;
            dispatch(addCity(target.dataset.index));
        },
        onKeyUp: e => {
            e.preventDefault();
            dispatch(performSearchIfNeeded(e.target.value));
        }
    };
}

const Input = ({ results, onResultClick, onKeyUp }) => {

    return (
        <div className="searchInput">
            <form action="" >
                <input type="text" onKeyUp={onKeyUp} />
            </form>
            <ul 
                className="results" 
                onClick={onResultClick}
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