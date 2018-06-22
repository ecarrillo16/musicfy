'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var AlbumController = require('../controllers/album');

var api = express.Router();
var md_auth = require('../midlewares/authenticated');
var md_upload = multipart({
	uploadDir: "./assets/uploads/albums"
});

api.get('/testAlbum', md_auth.ensureAuth, AlbumController.testAlbum);
api.post('/saveAlbum', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/getAlbum/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/listAlbums/:artistId?', md_auth.ensureAuth, AlbumController.listAlbums);
api.put('/updateAlbum/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/deleteAlbum/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/upload-img-album/:id/', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/get-image-album/:imageFile/', md_auth.ensureAuth, AlbumController.getImageFile);

module.exports = api;