'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var ArtistController = require('../controllers/artist');

var api = express.Router();
var md_auth = require('../midlewares/authenticated');
var md_upload = multipart({
	uploadDir: "./assets/uploads/artists"
});

api.get('/testArtist', md_auth.ensureAuth, ArtistController.testArtist);
api.post('/saveArtist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/getArtist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.get('/listArtists/:page?', md_auth.ensureAuth, ArtistController.listArtists);
api.put('/updateArtist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/deleteArtist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/upload-img-artist/:id/', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile/', ArtistController.getImageFile);

module.exports = api;