'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Rutes load
var user_rutes = require('./rutes/user');
var artist_rutes = require('./rutes/artist');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Setting heads

// Rutes base
app.use('/api', user_rutes);
app.use('/api', artist_rutes);

module.exports = app;