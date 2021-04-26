
const Product = require('../models/product')
const slugify = require('slugify')

exports.createProduct = (req, res) => {
    const { name, price,quantity, description, category, createdBy } = req.body;
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