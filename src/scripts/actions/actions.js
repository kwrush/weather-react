import actionTypes from './actionTypes';
import { AUTO_COMPLTETE_API } from 'Scripts/constants';
import { fromJS } from 'immutable';
import fetch from 'isomorphic-fetch';

function fetchSearchResults (query) {
    return dispatch => {
        const queryUrl = AUTO_COMPLTETE_API + query;
        return fetch(queryUrl)
            .then(response => fromJS(JSON.parse(response).RESULTS))
            .then(results => dispatch(reciveSearchResults(results)));
    };
}

function reciveSearchResults (results) {
    return dispatch => {
        console.log(results.toString());
    };
}

export const addCity = (city) => {
    return {
        type: actionTypes.ADD_CITY,
        city
    };
}

export const removeCity = (id) => {
    return {
        type: actionTypes.REMOVE_CITY,
        id
    };
}

export const updateForecast = (id) => {
    return {
        type: actionTypes.REQUEST_UPDATE,
        id
    }
}

export const searchCities = (query) => {
    return (dispatch, getState) => {
        if (query.trim().length > 2) {
            return dispatch(fetchSearchResults(query.trim()))
        }
    }
}



