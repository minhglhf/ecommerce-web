import { categoryConsts } from "../actions/const"

const initState = {
    categoryList: null,
    pending: false,
    created: false,
    message: ''
}

const makeNewCategories = (category, oldCategories) => {

    let newCategories = oldCategories;

    const obj = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: []
    }

    if (category.parentId === undefined) {
        newCategories.push(obj)
    }
    else {
        for (let cate of newCategories) {
            if (category.parentId === cate._id) {
                cate.children.push({
                    ...obj,
                    parentId: category.parentId
                })
            }
            else makeNewCategories(category, cate.children)

        }
    }

    return newCategories;
}

const categoryReducer = (state = initState, action) => {
    // console.log(state.categoryList)
    switch (action.type) {
        case categoryConsts.FETCH_CATEGORIES_REQUEST: {
            state = {
                ...state,
                pending: true
            }
            break;
        }
        case categoryConsts.FETCH_CATEGORIES_SUCCESS: {
            state = {
                ...state,
                categoryList: action.payload.categories,
                pending: false,
                created: true
            }
            break;
        }
        case categoryConsts.FETCH_CATEGORIES_FAILURE: {
            state = {
                ...state,
                pending: false,
                created: false,
                message: action.payload.error,
            }
            break;
        }
        case categoryConsts.ADD_CATEGORY_REQUEST: {
            state = {
                ...state,
                pending: true
            }
            break;
        }
        case categoryConsts.ADD_CATEGORY_SUCCESS: {
            const newCategories = makeNewCategories(action.payload.newCategory, state.categoryList)
            // console.log(newCategories)
            state = {
                ...state,
                pending: false,
            }
            break;
        }
        case categoryConsts.ADD_CATEGORY_FAILURE: {
            state = {
                ...state,
                pending: false,
                message: action.payload.error,
            }
            break;
        }

        default: {
            break;
        }
    }

    return state;
}

export default categoryReducer;