import { authConsts } from "../actions/const"

const initState = {
    name: 'fuck'
}

const authReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case authConsts.LOGIN_REQUEST: {
            state = {
                ...state,
                ...action.payload
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