import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import createDebounce from 'redux-debounce';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
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

const stateReconciler = (state, inboundState) => {
    return state.merge(inboundState)
};

const enhancers = compose(
    applyMiddleware(...middlewares),
    autoRehydrate({ log: true, stateReconciler })
);

const initialState = Map({
    searchEntities: Map({
        isSearching: false,
        searchQuery: '',
        results: List()
    }),
    cities: Map()
});


export const store = createStore(
    rootReducer,
    initialState,
    enhancers
);

export const persistConfig = {
    keyPrefix: 'react-weather:',
    whitelist: ['cities']
};

export default store;