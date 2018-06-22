'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Rutes load
var user_rutes = require('./rutes/user');
var artist_rutes = require('./rutes/artist');
var album_rutes = require('./rutes/album');
var song_rutes = require('./rutes/song');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Setting heads
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Authorization, X-API-KEY, Origin, X-Requested-Whit, Content-Type, Accept, Access-Controll-Allow-Request-Method');
    res.header('Access-Control-Allow-Origin', 'GET, POST, OPTION, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');

    next();
});

// Rutes base
app.use('/api', user_rutes);
app.use('/api', artist_rutes);
app.use('/api', album_rutes);
app.use('/api', song_rutes);

module.exports = app;