const express = require('express');
const {StreamFileAudio, StreamFileImage} = require('../utilities/stream-file');

const streamFileRouter = express.Router();

streamFileRouter.get('/audio/*', StreamFileAudio);
streamFileRouter.get('/image/*', StreamFileImage);

module.exports = streamFileRouter