import { categoryConsts } from "../actions/const"

const initState = {
    products: null,
    categories: null,
    pending: false,
    created: false,
    message: ''
}


const dataReducer = (state = initState, action) => {
    // console.log(state.categoryList)
    switch (action.type) {
        case categoryConsts.FETCH_REQUEST: {
            state = {
                ...state,
                pending: true
            }
            break;
        }
        case categoryConsts.FETCH_SUCCESS: {
            state = {
                ...state,
                products: action.payload.products,
                pending: false,
                created: true
            }
            break;
        }
        case categoryConsts.FETCH_FAILURE: {
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