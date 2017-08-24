import React from 'react';
import { persistStore } from 'redux-persist-immutable'
import { Provider } from 'react-redux';
import { store, persistConfig } from '../store/store';
import { fetchWeatherIfNeeded } from '../store/actions';
import SearchContainer from './SearchContainer';
import CitiesContainer from './CitiesContainer';
import Loading from '../components/Loading';

export default class AppProvider extends React.Component {
    constructor () {
        super();
        this.state = {
            rehydrated: false
        };
    }

    componentWillMount() {
        persistStore(store, persistConfig, () => {
            this.setState({
                rehydrated: true
            }, () => { this.onRehydratedComplete() });
        });
    }

    onRehydratedComplete = () => {
        if (!store.getState().get('cities').isEmpty()) {
            store.getState().get('cities')
                .valueSeq().toArray().map(city => {
                    return store.dispatch(fetchWeatherIfNeeded(city.get('id')));
                });
        }
    }

    render () {
        return this.state.rehydrated ?
            <Provider store={store}>
                <div id="app">
                    <SearchContainer />
                    <CitiesContainer />
                </div>
            </Provider> :
            <Loading />
    }
}