'use strict'

var mogoose = require('mongoose');
var Schema = mogoose.Schema;

var SongSchema = Schema({
    number: Number,
    name: string,
    duration: String,
    file: String,
    album: {
        type: Schema.ObjectId,
        ref: "Album"
    }
});

module.exports = mongoose.model('Song', SongSchema);