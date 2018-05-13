'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({
        message: "Probando primer controlador"
    });
};

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = "ROLE_USER";
    user.image = "null";

    if (params.password) {
        // Encriptar contraseña
        bcrypt.hash(params.password, 'null', 'null', function (err, hash) {
            user.password = hash;

            if (user.name != null && user.surname != null && user.email != null) {
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: "Error interno del servidor"
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: "No se encontró el campo en la BD"
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: "Rellena todos los campos"
                });
            }
        });

    } else {
        res.status(200).send({
            message: "Introduce la contraseña"
        });
    }

};

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;



    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: "El usuario no existe"
                });
            } else {
                // Comprobar la contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        // Devolver datos de Usuario
                        if (params.gethash) {
                            // Devolver token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: "El usuario no ha podido logear"
                        });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error al actualizar el usuario"
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: "No se pudo actualizar el usuario"
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });

}

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No subida...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[3];

        var type = req.files.image.type;

        if (type == 'image/png' || type == 'image/gif' ||
            type == 'image/jpg') {

            User.findByIdAndUpdate(userId, {
                image: file_name
            }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({
                        message: "No se pudo actualizar el usuario"
                    });
                } else {
                    console.log(req.files);
                    res.status(200).send({
                        user: userUpdated
                    });
                }
            });
        } else {
            res.status(200).send({
                message: "El archivo no es una imagen o tiene un formato no valido."
            });
        }

    } else {
        res.status(200).send({
            message: "Imagen no subida."
        });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './assets/uploads/user/' + imageFile;
    fs.exists(path_file, function (exist) {
        if (exist) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: "No existe la imagen."
            });
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};