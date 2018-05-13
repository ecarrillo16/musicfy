'use strict'

var mogoose = require('mongoose');
var Schema = mogoose.Schema;

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Schema.ObjectId,
        ref: "Artist"
    }
});

module.exports = mongoose.model('Album', AlbumSchema);