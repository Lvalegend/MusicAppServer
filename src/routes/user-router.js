const express = require('express');
const { registerAccount, loginAccount, getUserData, updateProfile } = require('../controllers/user-controller');
const authenticateToken = require('../middlewares/authenticate-token');
const findInfoUser = require('../middlewares/find-info-user');
const checkAdminPermissions = require('../middlewares/check-admin-permissions');
const { singleFile } = require('../utilities/upload-file');

const userRouter = express.Router();

userRouter.post('/register', registerAccount)
userRouter.post('/login', loginAccount)
userRouter.put('/update-profile',authenticateToken, singleFile ,updateProfile)

userRouter.get('/get-all-user', authenticateToken, findInfoUser, checkAdminPermissions, getUserData)

module.exports = userRouter