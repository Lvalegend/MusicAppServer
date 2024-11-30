const express = require('express');
const authenticateToken = require('../middlewares/authenticate-token');
const { relationshipUserAndSinger, getUserAndSingersData, deleteUserSingerRelationship } = require('../controllers/user-singer-controller');

const userSingerRouter = express.Router();

userSingerRouter.post('/add/relationship/user-singer', authenticateToken, relationshipUserAndSinger )
userSingerRouter.delete('/delete/relationship/user-singer', authenticateToken, deleteUserSingerRelationship )
userSingerRouter.get('/get-data/relationship/user-singer', authenticateToken, getUserAndSingersData )

module.exports = userSingerRouter