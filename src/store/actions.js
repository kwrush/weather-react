import { Map } from 'immutable';
import actionTypes from './actionTypes';
import { getWeather, getGeoSuggestion, getGeoLocation } from '../utils/api';
import { formatWeatherData, formatGeoSuggestion, formatGeoLocation } from '../utils/formatters';

export const requestWeather = id => {
    return {
        type: actionTypes.REQUEST_FETCH_WEATHER,
        id
    };
}

export const requestWeatherSuccess = data => {
    return {
        type: actionTypes.RESOLVE_FETCH_WEATHER,
        id: data.get('id'),
        city: data
    };
}

export const requestWeatherFail = error => {
    return {
        type: actionTypes.REJECT_FETCH_WEATHER,
        id: error.id,
        error: error.error
    };
}

export const requestSearch = query => {
    return {
        meta: {
            debounce: 'requestInterval'
        },
        type: actionTypes.REQUEST_SEARCH_CITY,
        query
    };
}

export const requestSearchSuccess = results => {
    return {
        type: actionTypes.RESOLVE_SEARCH_CITY,
        results
    };
}

export const requestSearchFail = error => {
    return {
        type: actionTypes.REJECT_SEARCH_CITY,
        error
    };
}

export const fetchWeather = id => {
    return (dispatch, getState) => {
        const cityEntity = getState().getIn(['cities', id]);

        if (cityEntity) {
            const geoCoordinates = {
                latitude: cityEntity.get('latitude'),
                longitude: cityEntity.get('longitude')
            };

            if (typeof geoCoordinates.latitude === 'undefined' || 
                typeof geoCoordinates.longitude === 'undefined') {
                return;
            } 

            dispatch(requestWeather(id));
            return getWeather(geoCoordinates)
                .then(data => {
                    const formattedData = cityEntity.merge(formatWeatherData(data));
                    dispatch(requestWeatherSuccess(formattedData));
                }) 
                .catch(error => {
                    dispatch(requestWeatherFail({
                        id: id, 
                        error: error
                    }));
                });  
        }
    };
}

export const performSearch = (query) => {
    return (dispatch, getState) => {
        dispatch(requestSearch(query));
        getGeoSuggestion(
            getState().getIn(['searchEntities', 'searchQuery'])
        )
        .then(results => {
            const formattedResults = formatGeoSuggestion(results);
            dispatch(requestSearchSuccess(formattedResults));
        })
        .catch(error => dispatch(requestSearchFail(error)));
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

export const selectToAddCity = cityInfo => {
    return {
        type: actionTypes.ADD_CITY,
        id: cityInfo.get('id'),
        cityInfo
    };
}

export const addCity = index => {
    return (dispatch, getState) => {
        const result = getState().getIn(['searchEntities', 'results', index]);
        dispatch(selectToAddCity(result));
        dispatch(fetchWeather(result.get('id')));
    }
}

export const removeCity = id => {
    return {
        type: actionTypes.REMOVE_CITY,
        id
    };
}