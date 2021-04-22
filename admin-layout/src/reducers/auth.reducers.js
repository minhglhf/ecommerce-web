import { authConsts } from "../actions/const"

const initState = {
    token: null,
    user: null,
    authenticate: false,
    pending: false,
    logoutLoading: false,
    logoutError: ''
}

const authReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case authConsts.LOGIN_REQUEST: {
            state = {
                ...state,
                pending: true
            }
            break;
        }
        case authConsts.LOGIN_SUCCESS: {
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                pending: false,
                authenticate: true
            }
            break;
        }
        case authConsts.LOGIN_FAILURE: {
            state = {
                ...state,
                pending: true,
                authenticate: false
            }
            break;
        }
        case authConsts.LOGOUT_REQUEST: {
            state = {
                ...initState,
                logoutLoading: true
            }
            break;
        }
        case authConsts.LOGOUT_SUCCESS: {
            state = { ...initState }
            break;
        }
        case authConsts.LOGOUT_FAILURE: {
            state = {
                ...state,
                logoutError: action.payload.error,
                logoutLoading: false
            }
            break;
        }
        default: {
            break;
        }
    }

    return state;
}

export default authReducer;