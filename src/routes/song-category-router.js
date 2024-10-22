const express = require('express');
const { relationshipSongAndCategory, getSongsAndCategoriesData } = require('../controllers/song-category-controller');

const songCategoryRouter = express.Router();

songCategoryRouter.post('/add/relationship/song-category', relationshipSongAndCategory)
songCategoryRouter.get('/get-data/relationship/song-category', getSongsAndCategoriesData)

module.exports = songCategoryRouter