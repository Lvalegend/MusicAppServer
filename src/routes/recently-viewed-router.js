const express = require('express');
const { addRecentlyViewedForUser, getRecentlyViewedData } = require('../controllers/recently-viewed-controller');
const authenticateToken = require('../middlewares/authenticate-token');


const recentlyViewedRouter = express.Router();

recentlyViewedRouter.post('/recently/add', authenticateToken, addRecentlyViewedForUser)
recentlyViewedRouter.get('/get-data/recently', authenticateToken, getRecentlyViewedData)

module.exports = recentlyViewedRouter
