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

const callApi = async (url, config, onRequestSuccess, onRequestFailure) => {
    try {
        const json = await fetch(url, config)
            .then(checkResponseStatus)
            .catch(error => {
                throw error;
            })
            .then(response => response.json());

        onRequestSuccess(json);

    } catch (error) {
        const response = error.response;
        if (typeof response === 'undefined') {
            onRequestFailure(error);
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

            onRequestFailure(error);
        }
    } 
};

export const getWeather = (geoInfo = {}, onSuccess = () => {}, onFailure = () => {}) => {
    const {latitude, longitude} = geoInfo;
    const url = `/api/darksky?latitude=${latitude}&longtitude=${longitude}&exclude=minutely,alerts,flags`;
    callApi(url, null, onSuccess, onFailure);
}

export const getGeoLocation = (address = '', onSuccess = () => {}, onFailure = () => {}) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${address}`;
    callApi(url, null, onSuccess, onFailure);
}