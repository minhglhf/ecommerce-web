const Product = require('../models/product')
const Category = require('../models/category')

exports.fetchDatas = async (req, res) => {
    const categories = await
        Category.find()
            .exec(); //select("_ic name category")
    const products = await
        Product.find()
            .select("_id name productPicture price quantity description slug category")
            .populate('category')
            .exec(); //select("_ic name category")



    if (categories, products) {
        const categoryList = createCategoriesList(categories)
        return res.status(200).json({
            products,
            categories: categoryList
        })
    }
    else return res.status(400).json({
        error: error
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
            parentId: cate.parentId,
            children: createCategoriesList(categories, cate._id)
        });
    }

    return categoryList;
}