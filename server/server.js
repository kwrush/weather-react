/**
 * This is a simple api server to proxy request to DarkSky API, 
 * which is based on https://github.com/cloudmu/darksky/blob/master/server/server.js.
 */
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var port = 3001;

// Use your own key which is free to get at
// https://darksky.net/dev/
var API_KEYS = 'f5b73cbcae95178cc4d5baa172504762';
var API_URL = 'https://api.darksky.net/forecast/' + API_KEYS + '/';

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/darksky', function (req, res) {
    try {
        console.log(req.query);
        var geoInfo = req.query.latitude + ',' + req.query.longitude;
        var exclude = req.query.exclude;
        var url = API_URL + geoInfo + '?exclude=' + exclude;
        // debug
        console.log('Fetching ' + url);

        fetch(url)
            .then(function (response) {
                if (response.status !== 200) {
                    res.status(response.status).json({
                        'Message:': 'Fail to fetch data from Dark Sky server'
                    })

                    return response.json();
                }
            })
            .then(function (payload) {
                res.status(200).json(payload);
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

server.listen(port);
// Debug
console.log('Server is listening on port ' + port);

