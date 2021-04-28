const express = require('express');

const router = express.Router();
const { createProduct, fetchProducts, fetchProductsBySlug } = require('../controller/product');
const { requireSignin, adminMiddleware } = require('../middlewares');
const multer = require('multer');
const path = require('path');

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

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/products', fetchProducts);
router.get('/products/:slug', fetchProductsBySlug)

module.exports = (router);