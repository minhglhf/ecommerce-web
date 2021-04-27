import { productConsts } from "../actions/const"

const initState = {
    products: null,
    pending: false,
    created: false,
    message: ''
}


const productReducer = (state = initState, action) => {
    // console.log(state.categoryList)
    switch (action.type) {
        case productConsts.FETCH_PRODUCTS_REQUEST: {
            state = {
                ...state,
                pending: true
            }
            break;
        }
        case productConsts.FETCH_PRODUCTS_SUCCESS: {
            state = {
                ...state,
                products: action.payload.products,
                pending: false,
                created: true
            }
            break;
        }
        case productConsts.FETCH_PRODUCTS_FAILURE: {
            state = {
                ...state,
                pending: false,
                created: false,
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

export default productReducer;