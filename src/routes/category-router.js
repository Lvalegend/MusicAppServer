const express = require('express');
const { addCategory, getCategoryData } = require('../controllers/category-controller');

const categoryRouter = express.Router();

categoryRouter.post('/add/category', addCategory)
categoryRouter.get('/get/category-data', getCategoryData)

module.exports = categoryRouter