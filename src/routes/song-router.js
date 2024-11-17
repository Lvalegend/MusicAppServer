const express = require('express');
const { saveSongData, getSongData, deleteSong, editSong, updateSongView} = require('../controllers/song-controller');
const { muitiFile } = require('../utilities/upload-file');

const songRouter = express.Router();

songRouter.post('/song/upload', muitiFile, saveSongData)

songRouter.get('/get/song-data', getSongData);

songRouter.delete('/delete/song', deleteSong)

songRouter.put('/edit/song', editSong)

songRouter.put('/update/song-view', updateSongView)

module.exports = songRouter