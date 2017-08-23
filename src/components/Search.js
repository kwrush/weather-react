import React from 'react';
import PropTypes from 'prop-types'
import { SEARCH_RESULTS } from '../types';
import Ionicon from 'react-ionicons';

export default class Search extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hideResults: false
        }
    }

    componentDidMount () {
        document.addEventListener('click', this.handleDocumentClick, false);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.handleDocumentClick, false);
    }

    handleDocumentClick = (evt) => {
        this.setState({
            hideResults: true
        });
    }

    handleOnSubmit = (evt) => {
        evt.preventDefault();
        this.props.onSearch(this.props.searchQuery);
    }

    handleOnKeyUp = (evt) => {
        evt.preventDefault();
        this.props.onSearch(evt.target.value);
    } 

    handleOnResultsClick = (evt) => {
        evt.nativeEvent.stopImmediatePropagation();
        this.props.onResultClick(evt.target.dataset.index);
    }

    handleOnInputClick = (evt) => {
        evt.nativeEvent.stopImmediatePropagation();
        this.setState({
            hideResults: false
        });
    }

    render () {
        const { results, searchQuery } = this.props;

        const hide = results.size === 0 || searchQuery.length < 2 || this.state.hideResults;

        return (
            <div className="search-bar">
                <form 
                    onSubmit={this.handleOnSubmit}
                    onClick={this.handleOnInputClick}
                >
                    <input
                        type="text"
                        className="search-input"
                        onKeyUp={this.handleOnKeyUp}
                    />
                    <a className="search-icon">
                        <Ionicon icon="ion-search" fontSize="20px" />
                    </a>
                </form>
                {
                    hide ? null :
                    <ul
                        className="results"
                        onClick={this.handleOnResultsClick}
                    >
                        {results.map((result, index) => (
                            <li data-index={index} className="result" key={index}>
                                {result.get('fullName')}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        );
    }
}


Search.propTypes = {
    results: SEARCH_RESULTS.isRequired,
    onResultClick: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};