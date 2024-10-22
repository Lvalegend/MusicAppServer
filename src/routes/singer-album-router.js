const express = require('express');
const { relationshipSingerAndAlbum, getSingersAndAlbumsData } = require('../controllers/singer-album-controller');

const singerAlbumRouter = express.Router();

singerAlbumRouter.post('/add/relationship/singer-album', relationshipSingerAndAlbum)
singerAlbumRouter.get('/get-data/relationship/singer-album', getSingersAndAlbumsData)


module.exports = singerAlbumRouter