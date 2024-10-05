const express = require('express');
const { addCategory } = require('../controllers/category-controller');

const categoryRouter = express.Router();

categoryRouter.post('/add/category', addCategory)

module.exports = categoryRouter