'use strict'

var path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function testSong(req, res) {
	res.status(200).send({
		message: "Controlador para canciones"
	});
}

function getSong(req, res) {
	var songId = req.params.id;

	Song.findById(songId).populate({
		path: 'album'
	}).exec((err, song) => {
		if (err) {
			res.status(500).send({
				message: "Error en el servidor"
			});
		} else {
			if (!song) {
				res.status(404).send({
					message: "No se encontró la canción"
				});
			} else {
				res.status(200).send({
					song
				});
			}
		}
	});
}

function saveSong(req, res) {
	var song = new Song();
	var params = req.body;

	song.number = params.number;
	song.name = params.name;
	song.duration = params.duration;
	song.file = 'null';
	song.album = params.album;

	song.save((err, songStored) => {
		if (err) {
			res.status(500).send({
				message: "Error en el servidor"
			});
		} else {
			if (!song) {
				res.status(404).send({
					message: "No se pudo guardar la canción"
				});
			} else {
				res.status(200).send({
					song: songStored
				});
			}
		}
	});
}

function listSongs(req, res) {
	var albumId = req.params.id;

	if (!albumId) {
		var find = Song.find({}).sort('name');
	} else {
		var find = Song.find({
			album: albumId
		}).sort('number');
	}

	find.populate({
		path: 'album',
		populate: {
			path: 'artist'
		}
	}).exec((err, songs) => {
		if (err) {
			res.status(500).send({
				message: "Error al buscar listado artistas"
			});
		} else {
			if (!songs) {
				res.status(404).send({
					message: "No se encontraron canciones para la busqueda."
				});
			} else {
				return res.status(200).send({
					total_items: total,
					songs: songs
				});
			}
		}
	});
}

function updateSong(req, res) {
	var songId = req.params.id;
	var update = req.body;

	Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
		if (err) {
			res.status(500).send({
				message: "Error en el servidor."
			});
		} else {
			if (!artistUpdated) {
				res.status(404).send({
					message: "Error al actualizar el song."
				});
			} else {
				res.status(200).send({
					message: "Se actualizó correctamente el song. " + songUpdated.name
				});
			}
		}
	});
}

function deleteSong(req, res) {
	var songId = req.params.id;

	Song.findByIdAndRemove(songId, (err, deletedSong) => {
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
					song: deletedSong
				});
			}
		}
	});
}

function uploadFile(req, res) {
	var songId = req.params.id;
	var file_name = 'Canción no subida...';

	if (req.files) {
		var file_path = req.files.file.path;
		var file_split = file_path.split('/');
		var file_name = file_split[3];

		var type = req.files.file.type;

		if (type == 'audio/mp3' || type == 'audio/ogg') {
			Artist.findByIdAndUpdate(songId, {
				file: file_name
			}, (err, songUpdated) => {
				if (!songUpdated) {
					res.status(404).send({
						message: "No se pudo actualizar la cancion"
					});
				} else {
					res.status(200).send({
						artist: songUpdated
					});
				}
			});
		} else {
			res.status(200).send({
				message: "El archivo no es una cancion o tiene un formato no valido."
			});
		}

	} else {
		res.status(200).send({
			message: "Imagen no subida."
		});
	}
}

function getSongFile(req, res) {
	var songFile = req.params.songFile;
	var path_file = './assets/uploads/songs/' + songFile;

	fs.exists(path_file, function (exist) {
		if (exist) {
			res.sendFile(path.resolve(path_file));
		} else {
			res.status(200).send({
				message: "No existe la canción."
			});
		}
	});
}

module.exports = {
	testSong,
	getSong,
	saveSong,
	listSongs,
	updateSong,
	deleteSong,
	uploadFile,
	getSongFile
};