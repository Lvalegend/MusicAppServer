const express = require('express');
const downloadFile = require('../utilities/download-file');

const downloadFileRouter = express.Router();

downloadFileRouter.get('/download/file', downloadFile)

module.exports = downloadFileRouter