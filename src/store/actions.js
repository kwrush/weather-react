import actionTypes from './actionTypes';
import { getWeather, getGeoLocation } from '../utils/api';
import { formatWeatherData, formatGeoLocation } from '../utils/formatters';

export const removeCity = (id) => {
    return {
        type: actionTypes.REMOVE_CITY,
        id
    };
}

export const requestWeather = (city) => {
    return {
        type: actionTypes.REQUEST_FETCH_WEATHER,
        city
    };
}

export const requestWeatherSuccess = (data) => {
    return {
        type: actionTypes.RESOLVE_FETCH_WEATHER,
        id: data.get('id'),
        city: data
    };
}

export const requestWeatherFail = (error) => {
    return {
        type: actionTypes.REJECT_FETCH_WEATHER,
        error
    };
}

export const requestSearch = (query) => {
    return {
        meta: {
            debounce: 'requestInterval'
        },
        type: actionTypes.REQUEST_SEARCH_CITY,
        query
    };
}

export const requestSearchSuccess = (results) => {
    return {
        type: actionTypes.RESOLVE_SEARCH_CITY,
        results
    };
}

export const requestSearchFail = (error) => {
    return {
        type: actionTypes.REJECT_SEARCH_CITY,
        error
    };
}


export const formatResults = (results) => {
    return {
        type: actionTypes.FORMAT_RESULTS,
        results: formatGeoLocation(results)
    };
}

export const fetchWeather = (id) => {
    return (dispatch, getState) => {
        const cityEntity = getState().getIn(['cities', id]);
        const geoCoordinate = {
            latitude: cityEntity.get('latitude'),
            longitude: cityEntity.get('longitude')
        };
        dispatch(requestWeather(cityEntity));
        getWeather(
            geoCoordinate, 
            (data) => {
                const formattedData = cityEntity.merge(formatWeatherData(data));
                dispatch(requestWeatherSuccess(formattedData));
            }, 
            (error) => {
                return dispatch(requestWeatherFail(error));
            });
    };
}

export const performSearch = (query) => {
    return (dispatch, getState) => {
        dispatch(requestSearch(query));

        getGeoLocation(
            getState().getIn(['searchEntities', 'searchQuery']), 
            (results) => {
                dispatch(formatResults(results));
                dispatch(requestSearchSuccess(getState().getIn(['searchEntities', 'results'])));
            },
            (error) => {
                dispatch(requestSearchFail(error));
            }
        );
    }
}

// Don't do searching if query is too short
function shouldPerformSearch (searchQuery) {
    return searchQuery.trim().length > 1;
}

export function performSearchIfNeeded (query) {
    return (dispatch) => {
        if (shouldPerformSearch(query)) {
            return dispatch(performSearch(query));
        }
    };
} 

export function selectToAddCity (cityInfo) {
    return {
      type: actionTypes.ADD_CITY,
      id: cityInfo.get('id'),
      cityInfo  
    };
}

export function addCity (cityInfo) {
    return (dispatch) => {
        dispatch(selectToAddCity(cityInfo));
        dispatch(fetchWeather( cityInfo.get('id')));
    }
}