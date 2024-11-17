const express = require('express');
const authenticateToken = require('../middlewares/authenticate-token');
const { relationshipUserAndAlbum,deleteUserAndAlbumReplationship, getUserAndAlbumsData } = require('../controllers/user-album-controller');

const userAlbumRouter = express.Router();

userAlbumRouter.post('/add/relationship/user-album', authenticateToken, relationshipUserAndAlbum )
userAlbumRouter.delete('/delete/relationship/user-album', authenticateToken,deleteUserAndAlbumReplationship )
userAlbumRouter.get('/get-data/relationship/user-album', authenticateToken, getUserAndAlbumsData )


module.exports = userAlbumRouter