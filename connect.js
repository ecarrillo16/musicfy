'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 4800;

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/musicfy', (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log("Succesfull connection");

        app.listen(port, function(){
            console.log("Started server");
        });
    }
});