const express = require('express');
const { relationshipSongAndCategory } = require('../controllers/song-category-controller');

const songCategoryRouter = express.Router();

songCategoryRouter.post('/add/relationship/song-category', relationshipSongAndCategory)

module.exports = songCategoryRouter