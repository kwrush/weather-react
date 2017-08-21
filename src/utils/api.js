// sepcify "as" or "from" causes "only absolute urls are supported"
// error in the test with fetch-mock
import 'isomorphic-fetch'; 

// Based on https://github.com/cloudmu/darksky/blob/master/src/apiUtils.js
const checkResponseStatus = (response) => {
    if (!response.ok) {
        const error = new Error(response.statusText || response.status);
        error.response = response;
        throw error;
    }

    return response;
}

const callApi = async (url, config) => {
    try {
        const response = await fetch(url, config)
            .then(checkResponseStatus)
            .catch(error => {
                throw error;
            });

        return response.json();

    } catch (error) {
        const response = error.response;
        if (typeof response === 'undefined') {
            throw error;
        } else {
            error.status = response.status;
            error.statusText = response.statusText;

            const text = await response.text();
            try {
                const json = JSON.parse(text);
                error.message = json.message;
            } catch (exp) {
                error.message = text;
            }

            throw error;
        }
    } 
};

export const getWeather = async (geoInfo = {}) => {
    const {latitude, longitude} = geoInfo;
    const url = `/api/weather?latitude=${latitude}&longitude=${longitude}`;
    return await callApi(url, null);
}

export const getGeoSuggestion = async (searchQuery = '') => {
    return await callApi(`/api/autocomplete?input=${searchQuery}`, null);
}

export const getGeoLocation = async (placeId = '') => {
    console.log(placeId);
    return await callApi(`/api/geolocation?place_id=${placeId}`, null);
}