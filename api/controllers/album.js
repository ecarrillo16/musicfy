'use strict'

var fs = require('fs');
var path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function testAlbum(req, res) {
    res.status(200).send({
        message: "Probando controlador album"
    });
}

function saveAlbum(req, res) {
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    artist.save((err, albumStored) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        } else {
            if (!saveAlbum) {
                res.status(404).send({
                    message: "No se encontró el album"
                });
            } else {
                res.status(200).send({
                    album: albumStored
                });
            }
        }
    });
}

function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({
        path: 'artist'
    }).exec((err, album) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor"
            });
        } else {
            if (!album) {
                res.status(404).send({
                    message: "No se encontró el album"
                });
            } else {
                res.status(200).send({
                    album
                });
            }
        }
    });
}

function listAlbums(req, res) {
    var artistId = req.params.id;

    if (!artistId) {
        var find = Album.find({}).sort('title');
    } else {
        var find = Album.find({
            artist: artistId
        }).sort('year');
    }

    find.populate({
        path: 'artist'
    }).exec((err, albums) => {
        if (err) {
            res.status(500).send({
                message: "Error al buscar listado artistas"
            });
        } else {
            if (!albums) {
                res.status(404).send({
                    message: "No se encontraron albums para la busqueda."
                });
            } else {
                return res.status(200).send({
                    total_items: total,
                    albums: albums
                });
            }
        }
    });
}

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor."
            });
        } else {
            if (!artistUpdated) {
                res.status(404).send({
                    message: "Error al actualizar el album."
                });
            } else {
                res.status(200).send({
                    message: "Se actualizó correctamente el album. " + albumUpdated.name
                });
            }
        }
    });
}

function deleteAlbum(req, res) {
    var albumId = req.params.id;

    Album.find({
        artist: deletedArtist._id
    }).remove((err, deletedAlbum) => {
        if (err) {
            res.status(500).send({
                message: "Error al eliminar el album "
            });
        } else {
            if (!deletedAlbum) {
                res.status(404).send({
                    message: "No se encontró el album"
                })
            } else {
                Song.find({
                    album: deletedAlbum._id
                }).remove((err, deletedSong) => {
                    if (err) {
                        res.status(500).send({
                            message: "Error al eliminar la canción"
                        });
                    } else {
                        if (!deletedSong) {
                            res.status(404).send({
                                message: "No se encontró la canción"
                            });
                        } else {
                            res.status(200).send({
                                album: deletedAlbum
                            });
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res) {
    var albumId = req.params.id;
    var file_name = 'Imagen no subida...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[3];

        var type = req.files.image.type;

        if (type == 'image/png' || type == 'image/gif' ||
            type == 'image/jpg') {

            Artist.findByIdAndUpdate(albumId, {
                image: file_name
            }, (err, albumUpdated) => {
                if (!albumUpdated) {
                    res.status(404).send({
                        message: "No se pudo actualizar el album"
                    });
                } else {
                    res.status(200).send({
                        artist: albumUpdated
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
    var path_file = './assets/uploads/albums/' + imageFile;

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
    testAlbum,
    saveAlbum,
    getAlbum,
    listAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};