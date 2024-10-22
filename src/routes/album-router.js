const express = require('express');
const { addAlbum, getAlbumData } = require('../controllers/album-controller');
const { singleFile } = require('../utilities/upload-file');

const albumRouter = express.Router();

albumRouter.post('/add/album', singleFile, addAlbum)
albumRouter.get('/get/album-data', getAlbumData)

module.exports = albumRouter