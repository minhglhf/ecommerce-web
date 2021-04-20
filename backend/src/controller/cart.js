const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) {
                res.status(400).json({
                    error: error
                })
            }
            if (cart) {
                const productExist = cart.cartItems.find(ca => {
                    return ca.product == req.body.cartItems.product
                })

                if (productExist) {
                    
                    Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": req.body.cartItems.product }, {
                        "$set": {
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity: productExist.quantity + req.body.cartItems.quantity
                            }
                        }
                    })
                        .exec((error, _cart) => {
                            if (error) {
                                res.status(400).json({
                                    error: error
                                })
                            }
                            if (_cart) {
                                res.status(200).json({
                                    cart: _cart
                                })
                            }
                        })
                } else {
                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    })
                        .exec((error, _cart) => {
                            if (error) {
                                res.status(400).json({
                                    error: error
                                })
                            }
                            if (_cart) {
                                res.status(200).json({
                                    cart: _cart
                                })
                            }
                        })
                }
            }
            else {
                const _cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });

                _cart.save((error, cart) => {
                    if (error) {
                        res.status(400).json({
                            error: error
                        })
                    }
                    if (cart) {
                        res.status(200).json({
                            cart
                        })
                    }
                })
            }
        })


}