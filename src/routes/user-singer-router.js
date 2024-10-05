const express = require('express');
const authenticateToken = require('../middlewares/authenticate-token');
const { relationshipUserAndSinger } = require('../controllers/user-singer-controller');

const userSingerRouter = express.Router();

userSingerRouter.post('/add/relationship/user-singer', authenticateToken, relationshipUserAndSinger )

module.exports = userSingerRouter