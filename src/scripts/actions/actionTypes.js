import { generateActions } from 'Scripts/utils/generateActions';

const actionTypes = [
    'ADD_CITY',
    'REMOVE_CITY',
    'REQUEST_SEARCH',
    'RECEIVE_RESULTS',
    'SELECT_CITY',
    'REQUEST_UPDATE',
    'RECEIVE_UPDATE'
];

export default generateActions(actionTypes);