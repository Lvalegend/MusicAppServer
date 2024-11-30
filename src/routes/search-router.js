const express = require('express');
const {getSearchResult, getSpeechToTextData} = require('../controllers/search-controller');
const changeFileFormat = require('../utilities/change-file-format');
const { singleFileRecord } = require('../utilities/upload-file');

const searchRouter = express.Router();

searchRouter.get('/search/data', getSearchResult)
searchRouter.post('/search/speech-to-text/data', singleFileRecord, changeFileFormat, getSpeechToTextData)


module.exports = searchRouter
