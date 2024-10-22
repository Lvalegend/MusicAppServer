const express = require('express');
const { singleFile } = require('../utilities/upload-file');
const { saveSingerData, getSingerData } = require('../controllers/singer-controller');

const singerRouter = express.Router();

singerRouter.post('/singer/upload', singleFile, saveSingerData)
singerRouter.get('/get/singer-data', getSingerData)

module.exports = singerRouter