const express = require('express');
const { relationshipSongAndAlbum } = require('../controllers/song-album-controller');

const songAlbumRouter = express.Router();

songAlbumRouter.post('/add/relationship/song-album', relationshipSongAndAlbum)

module.exports = songAlbumRouter