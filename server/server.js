/**
 * This is a simple api server to proxy request to DarkSky API, 
 * which is based on https://github.com/cloudmu/darksky/blob/master/server/server.js.
 */
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var DarkSky = require('dark-sky');

require('es6-promise').polyfill();
require('isomorphic-fetch');

var port = 3001;

// Use your own darksky api key which is free to get at
// https://darksky.net/dev/
// The api key of google maps is also free to get at 
// https://developers.google.com/places/web-service/get-api-key
var API_KEYS = {
    weather: 'f5b73cbcae95178cc4d5baa172504762',
    geo: 'AIzaSyCTDOL1R6WTflXAU1GxV_2xw9XfLLEGb2Q'
};

var darkSky = new DarkSky(API_KEYS.weather);

var googleMapsClient = require('@google/maps').createClient({
    Promise: require('q').Promise,
    key: API_KEYS.geo
});

//var DARKSKY_URL   = 'https://api.darksky.net/forecast/' + API_KEYS.weather + '/';
var AUTO_COMPLETE_URL = 'http://autocomplete.wunderground.com/aq?query=';
//var GEODECODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?language=en&key=' + API_KEYS.geo + '&place_id=';

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/weather', function(req, res) {
    try {
        var lat = req.query.latitude;
        var lng = req.query.longitude;
        var exclude = req.query.exclude || 'minutely,hourly,alerts,flags';
        var units = req.query.units || 'si';

        darkSky
            .coordinates({lat: lat, lng: lng})
            .language('en')
            .exclude(exclude)
            .units(units)
            .get()
            .then(function (payload) {
                return res.type('application/json').status(200).json(payload);
            })
            .catch(function(err) {
                return Promise.reject(err);
            })
    } catch (err) {
        // Debug
        if (process.env.NODE_ENV !== 'production') {
            console.error('Errors occur as requesting Dark Sky API', err);
        }

        res.satus(500).json({
            'Message': 'Errors occur as requesting Dark Sky API', 
            'Error': err 
        });
    }
});



app.get('/api/autocomplete', function (req, res) {
    try {
       var input = req.query.input;
       var url = AUTO_COMPLETE_URL + input;
       // debug
       console.log('Fetching ' + url);

       fetch(url)
           .then(function (response) {
               if (response.status !== 200) {
                   res.status(response.status).json({
                       'Message': 'Fail to fetch geolocation suggestion'
                   })
               }

               return response.json();
           })
           .then(function (payload) {
               return res.type('application/json').status(200).json(payload);
           })
           .catch(function(err) {
               return Promise.reject(err);
           });
    } catch (err) {
        // Debug
        if (process.env.NODE_ENV !== 'production') {
            console.error('Errors occur as requesting geolocation suggestion', err);
        }

        res.status(500).json({
            'Message': 'Errors occur as requesting geolocation suggestion', 
            'Error': err 
        });
    }
});

server.listen(port);
// Debug
console.log('Server is listening on port ' + port);

