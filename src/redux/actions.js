import actionTypes from './actionTypes';

export const selectCityToAdd = (cityGeoInfo) => {
    return {
        type: actionTypes.ADD_CITY,
        cityGeoInfo
    };
}