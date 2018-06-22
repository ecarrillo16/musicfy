'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var multipart = require('connect-multiparty');

var api = express.Router();
var md_auth = require('../midlewares/authenticated');
var md_upload = multipart({
    uploadDir: "./assets/uploads/users"
});

api.get('/testUser', UserController.testUser);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update/:id/', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload/:id/', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image/:imageFile/', md_auth.ensureAuth, UserController.getImageFile);

module.exports = api;