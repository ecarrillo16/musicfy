'use strinct'

var fs = require('fs');
var path = require('path');
var mongoosePagination = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function testArtist(req, res) {
    res.status(200).send({
        message: "Probando controlador artistas"
    });
}

function saveArtist(req, res) {
    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({
                message: "Error al agregar artista"
            });
        } else {
            res.status(200).send({
                artist: artistStored
            });
        }
    });
}

function getArtist(req, res) {
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({
                message: "Error al buscar artista"
            });
        } else {

            if (!artist) {
                res.status(404).send({
                    message: "No se encontró el artista."
                });
            } else {
                res.status(200).send({
                    artist
                });
            }

        }
    });
}

function getArtists(req, res) {
    var page = req.params.page || 1;
    // if (req.params.page) {
    //     page = req.params.page;
    // } else {
    //     page = 1;
    // }

    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500).send({
                message: "Error al buscar listado artistas"
            });
        } else {
            if (!artists) {
                res.status(404).send({
                    message: "No se encontraron artistas para la busqueda."
                });
            } else {
                return res.status(200).send({
                    total_items: total,
                    artists: artists
                });
            }
        }
    });
}

function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor."
            });
        } else {
            if (!artistUpdated) {
                res.status(404).send({
                    message: "Error al actualizar el artista."
                });
            } else {
                res.status(200).send({
                    message: "Se actualizó correctamente el usuario. " + artistUpdated.name
                })
            }
        }
    });

}

function deleteArtist(req, res) {
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, deletedArtist) => {
        if (err) {
            res.status(500).send({
                message: "Error en el servidor."
            });
        } else {
            if (!deletedArtist) {
                res.status(404).send({
                    message: "No se encontró el artista."
                });
            } else {
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
                                            artist: deletedArtist
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res) {
    var artistId = req.params.id;
    var file_name = 'Imagen no subida...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[3];

        var type = req.files.image.type;

        if (type == 'image/png' || type == 'image/gif' ||
            type == 'image/jpg') {

            Artist.findByIdAndUpdate(artistId, {
                image: file_name
            }, (err, artistUpdated) => {
                if (!artistUpdated) {
                    res.status(404).send({
                        message: "No se pudo actualizar el usuario"
                    });
                } else {
                    console.log(req.files);
                    res.status(200).send({
                        artist: artistUpdated
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
    var path_file = './assets/uploads/artists/' + imageFile;

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
    testArtist,
    saveArtist,
    getArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}