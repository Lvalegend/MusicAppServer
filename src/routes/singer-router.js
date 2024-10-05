const express = require('express');
const { singleFile } = require('../utilities/upload-file');
const { saveSingerData } = require('../controllers/singer-controller');

const singerRouter = express.Router();

singerRouter.post('/singer/upload', singleFile, saveSingerData)

module.exports = singerRouter