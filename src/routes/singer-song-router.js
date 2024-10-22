const express = require('express');
const { relationshipSingerAndSong, getSingersAndSongsData } = require('../controllers/singer-song-controller');

const singerSongRouter = express.Router();

singerSongRouter.post('/add/relationship/singer-song', relationshipSingerAndSong)
singerSongRouter.get('/get-data/relationship/singer-song', getSingersAndSongsData)


module.exports = singerSongRouter