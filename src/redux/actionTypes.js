import { generateActions } from '../utils/generateActions';

const actionTypes = [
    'REQUEST_SEARCH_CITY',
    'RESOLVE_SEARCH_CITY',
    'REJECT_SEARCH_CITY',
    'ADD_CITY',
    'UPDATE_CITY',
    'REMOVE_CITY',
    'REQUEST_FETCH_WEATHER',
    'RESOLVE_FETCH_WEATHER',
    'REJECT_FETCH_WEATHER'
];

export default generateActions(actionTypes);