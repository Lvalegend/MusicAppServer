const express = require('express');
const {getSearchResult} = require('../controllers/search-controller');

const searchRouter = express.Router();

searchRouter.get('/search/data', getSearchResult)


module.exports = searchRouter
