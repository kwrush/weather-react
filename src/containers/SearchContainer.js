import { connect } from 'react-redux';
import { performSearchIfNeeded, addCity } from '../store/actions';
import Search from '../components/Search';


const mapStateToProps = state => {
    return {
        results: state.getIn(['searchEntities', 'results']),
        searchQuery: state.getIn(['searchEntities', 'searchQuery']).trim()
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

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer