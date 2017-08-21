import store from '../store';
import { performSearchIfNeeded, addCity, removeCity } from '../actions';

describe('actions test', () => {

    it('should add city', () => {
        store.dispatch(performSearchIfNeeded('Lo'))
    })
});