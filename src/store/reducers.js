import { combineReducers } from 'redux-immutable';
import actionTypes from './actionTypes';
import { List, Map, OrderedMap } from 'immutable';

function searchEntities (
    state = Map({
        isSearching: false,
        searchQuery: '',
        results: List()
    }),
    action
) {
    switch (action.type) {
        case actionTypes.RESOLVE_SEARCH_CITY:
        case actionTypes.REQUEST_SEARCH_CITY:
        case actionTypes.REJECT_SEARCH_CITY:
            return state.merge(search(state, action));
        case actionTypes.FORMAT_RESULTS:
        case actionTypes.CLEAR_SEARCH_RESULTS:
            return state.set('results', action.results);
        default:
            return state;
    }
}

function search (
    state = Map({
        isSearching: false,
        results: List()
    }), 
    action
) {
    switch (action.type) {
        case actionTypes.REQUEST_SEARCH_CITY:
            return state.merge(Map({
                isSearching: true,
                searchQuery: action.query
            }));
        case actionTypes.RESOLVE_SEARCH_CITY:
            return state.merge(Map({
                isSearching: false,
                results: action.results
            }));
        case actionTypes.REJECT_SEARCH_CITY:
            return state.merge(Map({
                isSearching: false,
                results: List(),
            }));
        default:
            return state;
    }
}

function fetchWeather (
    state = Map({
        isFetching: false
    }), 
    action
) {
    switch (action.type) {
        case actionTypes.REQUEST_FETCH_WEATHER:
            return state.set('isFetching', true);
        case actionTypes.RESOLVE_FETCH_WEATHER:
            return state
                .set('isFetching', false)
                .merge(action.city);
        case actionTypes.REJECT_FETCH_WEATHER:
            return state.set('isFetching', false);
        default:
            return state;
    }
}

function cities (state = OrderedMap(), action) {
    switch (action.type) {
        case actionTypes.ADD_CITY:
            return (typeof action.id === 'string') ? 
                state.set(action.id, action.cityInfo) : state;
        case actionTypes.REMOVE_CITY:
            return state.remove(action.id);
        case actionTypes.REQUEST_FETCH_WEATHER:
        case actionTypes.RESOLVE_FETCH_WEATHER:
        case actionTypes.REJECT_FETCH_WEATHER:
            const cityState = state.get(action.id);
            return cityState ? state.set(
                action.id,
                cityState.merge(fetchWeather(action.city, action))
            ) : state;
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    searchEntities,
    cities
});

export default rootReducer
