import { userConsts } from "../actions/const"

const initState = {
    user: null,
    pending: false,
    created: false,
    message: ''
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userConsts.REGISTER_REQUEST: {
            state = {
                ...state,
                pending: true
            }
            break;
        }
        case userConsts.REGISTER_SUCCESS: {
            state = {
                ...state,
                user: action.payload.user,
                pending: false,
                created: true
            }
            break;
        }
        case userConsts.REGISTER_FAILURE: {
            state = {
                ...state,
                pending: false,
                created: false,
                message: action.payload.message,
            }
            break;
        }

        default: {
            break;
        }
    }

    return state;
}

export default userReducer;