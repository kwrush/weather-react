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

const callApi = async (url, config, onSuccess, onFailure) => {
    try {
        const response = await fetch(url, config)
            .then(checkResponseStatus)
            .catch(error => {
                throw error;
            });

        const json = await response.json();  
        onSuccess(json);

    } catch (error) {
        const response = error.response;
        if (typeof response === 'undefined') {
            onFailure(error);
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

            onFailure(error);
        }
    } 
};

export const getWeather = (geoInfo = {}, onRequestSuccess = () => {}, onRequestFailure = () => {}) => {
    const {latitude, longitude} = geoInfo;
    const url = `/api/darksky?latitude=${latitude}&longitude=${longitude}&exclude=minutely,alerts,flags&units=auto`;
    callApi(url, null, onRequestSuccess, onRequestFailure);
}

export const getGeoLocation = (address = '', onRequestSuccess = () => {}, onRequestFailure = () => {}) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${address}`;
    callApi(url, null, onRequestSuccess, onRequestFailure);
}