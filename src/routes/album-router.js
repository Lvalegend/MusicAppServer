const express = require('express');
const { addAlbum } = require('../controllers/album-controller');

const albumRouter = express.Router();

albumRouter.post('/add/album', addAlbum)

module.exports = albumRouter