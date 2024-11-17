const express = require('express');
const authenticateToken = require('../middlewares/authenticate-token');
const { relationshipUserAndSong,deleteRelationshipUserAndSong, getUserAndSongsData } = require('../controllers/user-song-controller');

const userSongRouter = express.Router();

userSongRouter.post('/add/relationship/user-song', authenticateToken, relationshipUserAndSong )
userSongRouter.delete('/delete/relationship/user-song', authenticateToken, deleteRelationshipUserAndSong )
userSongRouter.get('/get-data/relationship/user-song', authenticateToken, getUserAndSongsData )



module.exports = userSongRouter