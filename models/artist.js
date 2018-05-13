'use strict'

var mogoose = require('mongoose');
var Schema = mogoose.Schema;

var AartistSchema = Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Artist', ArtistSchema);