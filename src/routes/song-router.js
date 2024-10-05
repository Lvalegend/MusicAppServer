const express = require('express');
const { saveSongData, getSongData } = require('../controllers/song-controller');
const { muitiFile } = require('../utilities/upload-file');

const songRouter = express.Router();

songRouter.post('/song/upload', muitiFile ,saveSongData)

songRouter.get('/get/song-data', getSongData);

module.exports = songRouter