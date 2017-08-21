import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers';
import store from './store/store';
import styles from './styles/index.css';
import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


