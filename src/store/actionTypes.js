import { generateActions } from '../utils/generateActions';

const actionTypes = [
    'REQUEST_SEARCH_CITY',
    'RESOLVE_SEARCH_CITY',
    'REJECT_SEARCH_CITY',
    'REQUEST_FETCH_GEO',
    'RESOLVE_FETCH_GEO',
    'REJECT_FETCH_GEO',
    'REQUEST_FETCH_WEATHER',
    'RESOLVE_FETCH_WEATHER',
    'REJECT_FETCH_WEATHER',
    'ADD_CITY',
    'REMOVE_CITY',
];

export default generateActions(actionTypes);