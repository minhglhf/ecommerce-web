
import axios from "../helpers/axios"
import { authConsts } from "./const"

export const login = (user) => {

    return async (dispatch) => {
        dispatch({
            type: authConsts.LOGIN_REQUEST
        })

        const res = await axios.post('/admin/signin', {
            ...user
        });

        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: authConsts.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }

        if (res.status !== 200) {
            dispatch({
                type: authConsts.LOGIN_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}

export const isLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            dispatch({
                type: authConsts.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }
        else {
            dispatch({
                type: authConsts.LOGIN_FAILURE,
                payload: {
                    error: "fail to login"
                }
            })
        }
    }
}