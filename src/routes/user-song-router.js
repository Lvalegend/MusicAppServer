const express = require('express');
const authenticateToken = require('../middlewares/authenticate-token');
const { relationshipUserAndSong } = require('../controllers/user-song-controller');

const userSongRouter = express.Router();

userSongRouter.post('/add/relationship/user-song', authenticateToken, relationshipUserAndSong )

module.exports = userSongRouter