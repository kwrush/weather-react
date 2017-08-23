import { Map, List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { createStore } from 'redux';
import store from '../store';
import rootReducer from '../reducers';
import actionTypes from '../actionTypes';
import { suggestionJson } from './_mockData';
import { formatWeatherData, formatGeoSuggestion } from '../../utils/formatters';
import * as actions from '../actions';


describe('reducer tests', () => {
    
    beforeEach(function () {
        jest.addMatchers(matchers);
    });

    it('should return an immutable state with required fields', () => {
        const initialState = Map({
            cities: Map({}),
            searchEntities: Map({
                results: List(),
                isSearching: false,
                searchQuery: ''
            })
        });
        const store = createStore(rootReducer, initialState);
        expect(store.getState()).toEqualImmutable(initialState);
    });

    it('should handle autocomplete actions', () => {
        const initialState = Map({
            cities: Map({}),
            searchEntities: Map({
                results: List(),
                isSearching: false,
                searchQuery: ''
            })
        });
        const store = createStore(rootReducer, initialState);

        store.dispatch(actions.requestSearch('query'));
        const search = store.getState().get('searchEntities');
        expect(search.get('searchQuery')).toBe('query');
        expect(search.get('isSearching')).toBeTruthy();

        const fakeResults = formatGeoSuggestion(suggestionJson);
        store.dispatch(actions.requestSearchSuccess(fakeResults));
        const results = store.getState().getIn(['searchEntities', 'results']);
        expect(results).toEqualImmutable(fakeResults);

        store.dispatch(actions.requestSearch('query'));
        store.dispatch(actions.requestSearchFail('error'));
        const state = store.getState().get('searchEntities');
        expect(state.get('results')).toEqualImmutable(List());
        expect(state.get('isSearching')).toBeFalsy();
    });

    it('should handle fetch weather', () => {
        const state = Map({
            cities: Map({
                'city_id': Map({
                    isFetching: false,
                    shortName: 'Amsterdam',
                    latitude: '30',
                    longitude: '40',
                    weather: Map()
                }),
                'city_id2': Map({
                    isFetching: false,
                    shortName: 'Utrecht',
                    latitude: '20',
                    longitude: '10',
                    weather: Map()
                })
            }),
            searchEntities: Map({
                results: List(),
                isSearching: false,
                searchQuery: ''
            })
        });

        const store = createStore(rootReducer, state);

        store.dispatch(actions.requestWeather('city_id'));
        let city = store.getState().getIn(['cities', 'city_id']);
        expect(city.get('isFetching')).toBeTruthy();

        const fakeWeather = Map({
            id: 'city_id',
            weather: Map({
                currenty: Map({
                    temperature: 20,
                    summary: 'sunny'
                }),
                daily: List([
                    Map({
                        temperature: 21,
                        day: 'Mon'
                    }),
                    Map({
                        temperature: 20,
                        day: 'Tue'
                    })
                ])
            }),
        });

        store.dispatch(actions.requestWeatherSuccess(fakeWeather));
        
        city = store.getState().getIn(['cities', 'city_id']);
        expect(city.get('isFetching')).toBeFalsy();
        expect(city.get('weather')).toEqualImmutable(fakeWeather.get('weather'));

        store.dispatch(actions.requestWeather('city_id'));
        store.dispatch(actions.requestWeatherFail({id: 'city_id', error: 'error'}));

        city = store.getState().getIn(['cities', 'city_id']);
        expect(city.get('isFetching')).toBeFalsy();
    });
});