const express = require('express');

const router = express.Router();
const { addItemToCart } = require('../controller/cart');
const { requireSignin, userMiddleware} = require('../middlewares');

router.post('/user/cart/addToCart', requireSignin, userMiddleware, addItemToCart);


module.exports = (router);