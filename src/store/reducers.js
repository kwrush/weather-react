import { combineReducers } from 'redux-immutable';
import actionTypes from './actionTypes';
import { List, Map } from 'immutable';

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

function addCity (
    state = Map({
        id: undefined,
        fullName: '',
        shortName: '',
        latitude: undefined,
        longitude: undefined
    }), 
    action
) {
    if (action.type === actionTypes.ADD_CITY) {
        return state.merge(action.cityInfo);
    } else {
        return state;
    }
}

function fetchWeather (
    state = Map({
        isFetching: false,
        weather: Map()
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

function fetchGeoCoordinates (
    state = Map({
        isFetching: false,
        latitude: undefined,
        longitude: undefined
    }), 
    action
) {
    switch (action.type) {
        case actionTypes.REQUEST_FETCH_GEO:
            return state.set('isFetching', true);
        case actionTypes.RESOLVE_FETCH_GEO:
            return state
                .set('isFetching', false)
                .merge(action.city);
        case actionTypes.REJECT_FETCH_GEO:
            return state.set('isFetching', false);
        default:
            return state;
    }
}

function cities (state = Map(), action) {
    switch (action.type) {
        case actionTypes.ADD_CITY:
            return state.set(action.id, action.cityInfo);
        case actionTypes.REMOVE_CITY:
            return state.remove(action.id);
        case actionTypes.REQUEST_FETCH_GEO:
        case actionTypes.RESOLVE_FETCH_GEO:
        case actionTypes.REJECT_FETCH_GEO:
            return state.set(action.id, fetchGeoCoordinates(action.city, action));
        case actionTypes.REQUEST_FETCH_WEATHER:
        case actionTypes.RESOLVE_FETCH_WEATHER:
        case actionTypes.REJECT_FETCH_WEATHER:
            return state.set(action.id, fetchWeather(action.city, action));
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    searchEntities,
    cities
});

export default rootReducer
