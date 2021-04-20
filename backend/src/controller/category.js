const slugify = require('slugify')
const Category = require('../models/category')

exports.createCategory = (req, res) => {
    let categoryObj = {
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
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            if (categories) {

                const categoryList = createCategoriesList(categories)

                return res.status(400).json({

                    categoryList
                })
            }

        })
}

const createCategoriesList = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId === null) {
        category = categories.filter(cate => cate.parentId == undefined)
    }
    else {
        category = categories.filter(cate => cate.parentId == parentId)
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategoriesList(categories, cate._id)
        });
    }

    return categoryList;
}