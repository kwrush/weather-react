import thunkMiddleware from 'redux-thunk';
import createDebounce from 'redux-debounce';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Map, List } from 'immutable';

// Set minimal time interval between search requests
const debounceMiddleware = createDebounce({
    requestInterval: 400
})

let middlewares = [
    thunkMiddleware,
    debounceMiddleware,
];

// Disable logger in production build
if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middlewares = [...middlewares, loggerMiddleware];
}

const initialState = Map({
    searchEntities: Map({
        isSearching: false,
        searchQuery: '',
        results: List()
    }),
    cities: Map()
});

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
);

export default store;