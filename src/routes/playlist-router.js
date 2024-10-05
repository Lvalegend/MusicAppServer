const express = require('express');
const { createPlaylist } = require('../controllers/playlist-controller');
const authenticateToken = require('../middlewares/authenticate-token');

const playlistRouter = express.Router();

playlistRouter.post('/create/playlist', authenticateToken, createPlaylist)

module.exports = playlistRouter