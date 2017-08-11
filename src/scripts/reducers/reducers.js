import { Map, List } from 'immutable';
import { combineReducers } from 'redux';
import actionTypes from 'Scripts/actions/actionTypes';

const initialState = Map({
    results: List(),
    cities: List()
});

const results = (state = List(), action) => {
    switch (action.type) {
        default:
            return state
    }
}

const cities = (state = List(), action) => {
    switch (action.type) {
        default:
            return state
    }
}

const weatherApp = combineReducers({
    results, cities
})

export default weatherApp
