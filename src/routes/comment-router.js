const express = require('express');
const { saveComments, getCommentData } = require('../controllers/comment-controller');
const authenticateToken = require('../middlewares/authenticate-token');

const commentRouter = express.Router();

commentRouter.post('/comment/upload', authenticateToken ,saveComments )
commentRouter.get('/get/comment-data', getCommentData )

module.exports = commentRouter