const slugify = require('slugify')
const Category = require('../models/category')

exports.createCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }

    if (req.body.parentId) {
        categoryObj = { ...categoryObj, parentId: req.body.parentId };
    }

    const _category = new Category(categoryObj);

    _category.save((error, category) => {
        if (error) return res.status(400).json({
            error: error
        })

        if (category) {
            return res.status(201).json({
                category: category
            })
        }
    })
}

exports.fetchCategories = (req, res) => {
    Category.find()
    .exec((error, categories) => {
        if(error) {
            return res.status(400).json({
                error: error
            })
        }
        if(categories) {
            return res.status(400).json({
                categories
            })
        }

    })
}