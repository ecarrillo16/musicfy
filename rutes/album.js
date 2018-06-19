'use strict'

var express = require('express');
var multipart = require('connect-multiparty');

var AlbumController = require('../controllers/album');

var api = express.Router();
var md_auth = require('../midlewares/authenticated');

api.get('/testAlbum', md_auth.ensureAuth, AlbumController.testAlbum);
api.post('/saveAlbum', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/getAlbum/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/listAlbums/:artistId?', md_auth.ensureAuth, AlbumController.listAlbums);
api.get('/updateAlbum/:id', md_auth.ensureAuth, AlbumController.updateAlbum);

module.exports = api;