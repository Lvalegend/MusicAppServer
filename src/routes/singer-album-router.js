const express = require('express');
const { relationshipSingerAndAlbum } = require('../controllers/singer-album-controller');

const singerAlbumRouter = express.Router();

singerAlbumRouter.post('/add/relationship/singer-album', relationshipSingerAndAlbum)

module.exports = singerAlbumRouter