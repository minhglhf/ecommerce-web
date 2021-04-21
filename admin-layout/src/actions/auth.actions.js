import { authConsts } from "./const"

export const login = (user) => {
    console.log(user)
    return async (dispatch) => {
        dispatch({
            type: authConsts.LOGIN_REQUEST,
            payload: {
                ...user
            }
        })
    }
}