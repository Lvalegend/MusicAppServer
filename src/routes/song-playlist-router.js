const express = require('express');
const { addSongsInPlaylist ,deleteSongsAndPlaylistReplationship, getSongsAndPlaylistData} = require('../controllers/song-playlist-controller');

const songPlaylistRouter = express.Router();

songPlaylistRouter.post('/add/song-in-playlist', addSongsInPlaylist)
songPlaylistRouter.delete('/add/song-in-playlist', deleteSongsAndPlaylistReplationship)
songPlaylistRouter.get('/get-data/relationship/song-playlist', getSongsAndPlaylistData)

module.exports = songPlaylistRouter
