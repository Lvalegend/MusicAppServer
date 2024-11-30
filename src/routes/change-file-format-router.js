const express = require('express');
const { singleFileRecord } = require('../utilities/upload-file');
const changeFileFormat = require('../utilities/change-file-format');

const changeFileFormatRouter = express.Router();
changeFileFormatRouter.post('/convert', singleFileRecord, changeFileFormat)

module.exports = changeFileFormatRouter