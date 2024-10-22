const express = require('express');
const { createPlaylist, getUserPlaylistData } = require('../controllers/playlist-controller');
const authenticateToken = require('../middlewares/authenticate-token');

const playlistRouter = express.Router();

playlistRouter.post('/create/playlist', authenticateToken, createPlaylist)
playlistRouter.get('/get/user-playlist-data', authenticateToken, getUserPlaylistData)

module.exports = playlistRouter