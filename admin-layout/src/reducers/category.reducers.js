import { categoryConsts } from "../actions/const"

const initState = {
    categoryList: null,
    pending: false,
    created: false,
    message: ''
}

const categoryReducer = (state = initState, action) => {
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
                categoryList: action.payload.categories,
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

export default categoryReducer;