const express = require('express');
const { relationshipSingerAndSong } = require('../controllers/singer-song-controller');

const singerSongRouter = express.Router();

singerSongRouter.post('/add/relationship/singer-song', relationshipSingerAndSong)

module.exports = singerSongRouter