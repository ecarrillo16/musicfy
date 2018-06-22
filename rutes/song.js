'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var SongController = require('../controllers/song');

var api = express.Router();
var md_auth = require('../midlewares/authenticated');
var md_upload = multipart({
	uploadDir: "./assets/uploads/songs"
});

api.get('/testSong', md_auth.ensureAuth, SongController.testSong);
api.post('/saveSong', md_auth.ensureAuth, SongController.saveSong);
api.get('/getSong/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/listSongs/:albumId?', md_auth.ensureAuth, SongController.listSongs);
api.put('/updateSong/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/deleteSong/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-file-song/:id/', [md_auth.ensureAuth, md_upload], SongController.uploadFile);
api.get('/get-file-song/:songFile/', md_auth.ensureAuth, SongController.getSongFile);

module.exports = api;