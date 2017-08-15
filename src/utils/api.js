import fetch from 'isomorphic-fetch';

// Based on https://github.com/cloudmu/darksky/blob/master/src/apiUtils.js
const checkResponseStatus = (response) => {
    if (!response.ok) {
        const error = new Error(response.statusText || response.status);
        error.response = response;
        throw error;
    }

    return response;
}

const requestTimeout = (resolve, reject) => {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 5000, new Error('Request time out!'));
    });
};

const requestData = (url = '/api/darksky', config = {}) => {
    return fetch(url, config)
        .then(checkResponseStatus)
        .catch(error => {
            throw error;
        })
        .then(response => response.json())
        .catch(error => {
            const response = error.response;
            if (typeof response === 'undefined') {
                throw error;
            } else {
                error.status = response.status;
                error.statusText = response.statusText;
                response
                    .text()
                    .then(text => {
                        try {
                            const json = JSON.parse(text);
                            error.message = json.message;
                        } catch (exp) {
                            error.message = text;
                        }

                        throw error;
                    });
            }
        });
};

const callApi = (url = '/api/darksky', config = {}, onRequestSuccess, onRequestFailure) => {
    return new Promise()
        .race([requestTimeout, requestData])
        .then(json => onRequestSuccess(json))
        .catch(error => onRequestFailure(error));
};

export const getWeather = (geoInfo = {}) => {
    const {latitude, longitude} = geoInfo;
    const url = `/api/darksky?latitude=${latitude}&longtitude=${longitude}&exclude=minutely,alerts,flags`;

    return callApi(
        url, null, 
        (response) => {

        }, 
        (error) => {
            console.error(error.message);
            return error;
        }
    );
}

export const getGeoLocation = (address = '') => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?language=en&address=${address}`;

    return fetch(url, config)
        .then(response => {
            if (!response.ok) {
                const error = new Error(response.statusText || response.status);
                error.response = response;
                throw error;
            }

            return response;
        })
        .then(response => response.json())
        .then(json => {
            return json.results.length > 0 ? 
                createLocationData(json) :
                null;
        });
}