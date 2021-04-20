const express = require('express');

const router = express.Router();
const { createCategory, fetchCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../middlewares');

router.post('/category/create',requireSignin, adminMiddleware ,createCategory);
router.get('/category', fetchCategories);

module.exports = (router);