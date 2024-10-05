const express = require('express');
const authenticateToken = require('../middlewares/authenticate-token');
const { relationshipUserAndAlbum } = require('../controllers/user-album-controller');

const userAlbumRouter = express.Router();

userAlbumRouter.post('/add/relationship/user-album', authenticateToken, relationshipUserAndAlbum )

module.exports = userAlbumRouter