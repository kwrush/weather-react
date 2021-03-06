import { List } from 'immutable';
import actionTypes from './actionTypes';
import { getWeather, getGeoSuggestion } from '../utils/api';
import { formatWeatherData, formatGeoSuggestion } from '../utils/formatters';
import { shouldPerformSearch, shouldUpdateWeather } from '../utils/helpers';

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
                throw new Error('ERROR:Unknown location.');
            } 

            dispatch(requestWeather(id));
            return getWeather(geoCoordinates)
                .then(data => {
                    const formattedData = cityEntity.merge(formatWeatherData(data));
                    dispatch(requestWeatherSuccess(formattedData));
                }) 
                .catch(error => dispatch(requestWeatherFail({
                    id: id, 
                    error: error
                })));  
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

export const performSearch = (query) => {
    return (dispatch, getState) => {
        dispatch(requestSearch(query));
        return getGeoSuggestion(
            getState().getIn(['searchEntities', 'searchQuery'])
        )
        .then(results => {
            const formattedResults = formatGeoSuggestion(results);
            dispatch(requestSearchSuccess(formattedResults));
        })
        .catch(error => dispatch(requestSearchFail(error)));
    }
}

export const clearSearchResults = () => ({
    type: actionTypes.CLEAR_SEARCH_RESULTS,
    results: List()
});

export function performSearchIfNeeded (query) {
    const q = query.trim();
    return dispatch => {
        if (shouldPerformSearch(q)) {
            return dispatch(performSearch(q));
        } else {
            // just updating searchQuery 
            dispatch(requestSearch(q));
        }
    };
} 

export function fetchWeatherIfNeeded (id) {
    return (dispatch, getState) => {
        const cityEntity = getState().getIn(['cities', id]);
        if (cityEntity) {
            const updatedAt = cityEntity.getIn(['weather', 'updatedAt']);
            if (typeof updatedAt === 'number') {
                const currentTime = Date.now() / 1000;
                if (shouldUpdateWeather(updatedAt, currentTime)) 
                   dispatch(fetchWeather(id));
            } else {
                dispatch(fetchWeather(id));
            }
        } 
    };
}

export const addCity = index => {
    return (dispatch, getState) => {
        const result = getState().getIn(['searchEntities', 'results', index]);
        const id = result.get('id');
        // If the city has been added, only clear search results
        if (getState().getIn(['cities', id])) {
            dispatch(clearSearchResults())
        } else {
            dispatch(selectToAddCity(result));
            dispatch(clearSearchResults())
        }
        dispatch(fetchWeatherIfNeeded(id));
    }
}

export const removeCity = id => {
    return {
        type: actionTypes.REMOVE_CITY,
        id
    };
}