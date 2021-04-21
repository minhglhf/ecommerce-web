const express = require('express');

const router = express.Router();
const { createCategory, fetchCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../middlewares');
const path = require('path');
const multer = require('multer');
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), createCategory);
router.get('/category', fetchCategories);

module.exports = (router);