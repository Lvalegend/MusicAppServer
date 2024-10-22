const express = require('express');
const { relationshipSongAndAlbum, getSongsAndAlbumsData } = require('../controllers/song-album-controller');

const songAlbumRouter = express.Router();

songAlbumRouter.post('/add/relationship/song-album', relationshipSongAndAlbum)
songAlbumRouter.get('/get-data/relationship/song-album', getSongsAndAlbumsData)

module.exports = songAlbumRouter