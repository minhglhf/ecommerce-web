
const Product = require('../models/product')
const slugify = require('slugify')
const Category = require('../models/category')
exports.createProduct = (req, res) => {
    const { name, price, quantity, description, category, createdBy } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const productObj = {
        name,
        quantity,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    }

    const _product = new Product(productObj);

    _product.save((error, product) => {
        if (error) {
            res.status(400).json({
                error: error
            })
        }
        if (product) {
            res.status(201).json({
                product: product
            })
        }
    })
};


exports.fetchProducts = async (req, res) => {
    const products = await
        Product.find()
            .select("_id name productPictures price quantity description slug category")
            .populate('category')
            .exec(); //select("_ic name category")

    res.status(200).json({
        products
    })
}

exports.fetchProductsBySlug = async (req, res) => {
    const { slug } = req.params

    Category.findOne({ slug: slug })
        .exec((error, category) => {
            if (error) {
                res.status(400).json({
                    error: error
                })
            }
            if (category) {
                // const products = await
                Product.find({ category: category._id })
                    .select("_id name productPictures price quantity description slug category")
                    .populate('category')
                    .exec((err, products) => {
                        if (err) {
                            res.status(400).json({
                                error: err
                            })
                        }
                        if (products) {
                            res.status(200).json({
                                products,
                                // productsByPrice: {
                                    
                                // }
                            })
                        }
                    });
            }
        });

    // res.status(200).json({
    //     products
    // })
}