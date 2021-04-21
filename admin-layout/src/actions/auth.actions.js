
import axios from "../helpers/axios"
import { authConsts } from "./const"

export const login = (user) => {
    console.log(user)
    return async (dispatch) => {
        dispatch({
            type: authConsts.LOGIN_REQUEST
        })

        const res = await axios.post('/admin/signin', {
            ...user
        });

        if(res.status === 200){
            const {token ,user} = res.data;
            localStorage.setItem('token', token);
            dispatch({
                type: authConsts.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }

        if(res.status !== 200){
            dispatch({
                type: authConsts.LOGIN_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}