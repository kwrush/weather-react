import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {Map, List} from 'immutable';
import actionTypes from '../actionTypes';
import { weatherJson, suggestionJson } from './_mockData';
import { formatGeoSuggestion } from '../../utils/formatters';
import { performSearchIfNeeded, fetchWeatherIfNeeed, addCity, removeCity } from '../actions';

// a simple middleware returns a promise always
const promisifyMiddleware = ({dispatch, getState}) => next => action => {
    return new Promise(resolve => resolve(next(action)));
}

const mockStore = configureMockStore([promisifyMiddleware, thunk]);

describe('actions test', () => {
        
    afterEach(() => {
        fetchMock.restore();
    });

    it('[search] should request searching', () => {
        fetchMock.mock('/api/autocomplete?input=', suggestionJson);

        const store = mockStore(Map({
            searchEntities: Map({
                searchQuery: '',
                results: List(),
                isSearching: false
            })
        }));
        
        expect.assertions(2);
        return store.dispatch(performSearchIfNeeded('San'))
            .then(() => {
                expect(store.getActions()[0]).toMatchObject({
                    type: actionTypes.REQUEST_SEARCH_CITY
                });
                expect(store.getActions()[1]).toMatchObject({
                    type: actionTypes.RESOLVE_SEARCH_CITY
                });
            });
    });

    it('[click on result] should add selected city and then fetch the weather', () => {
        fetchMock.mock('/api/weather?latitude=37.779999&longitude=-122.419998', weatherJson);
        const store = mockStore(Map({
            searchEntities: Map({
                searchQuery: '',
                results: formatGeoSuggestion(suggestionJson),
                isSearching: false
            }),
            // fetchWeahter only be executed when there's any record in cities 
            cities: Map({
                "94102.1.99999": Map({
                    id: "94102.1.99999", 
                    "shortName": "San Francisco", 
                    "fullName": "San Francisco, California", 
                    "latitude": "37.779999", 
                    "longitude": "-122.419998" 
                })
            })
        }));
        expect.assertions(4);
        return store.dispatch(addCity(0))
            .then(() => {
                expect(store.getActions()[0]).toMatchObject({
                    type: actionTypes.ADD_CITY
                });
                expect(store.getActions()[1]).toMatchObject({
                    type: actionTypes.CLEAR_SEARCH_RESULTS
                });
                expect(store.getActions()[2]).toMatchObject({
                    type: actionTypes.REQUEST_FETCH_WEATHER
                });
                expect(store.getActions()[3]).toMatchObject({
                    type: actionTypes.RESOLVE_FETCH_WEATHER
                });
            });
    });
});