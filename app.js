'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Rutes load
var user_rutes = require('./rutes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting heads

// Rutes base
app.use('/api', user_rutes);

module.exports = app;