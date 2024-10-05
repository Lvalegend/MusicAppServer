const express = require('express');
const { addSongsInPlaylist } = require('../controllers/song-playlist-controller');

const songPlaylistRouter = express.Router();

songPlaylistRouter.post('/add/song-in-playlist', addSongsInPlaylist)

module.exports = songPlaylistRouter