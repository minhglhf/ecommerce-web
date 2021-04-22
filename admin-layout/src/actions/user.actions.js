import axios from "../helpers/axios"
import { userConsts } from "./const"


export const signup = (user) => {
    console.log(user)
    return async (dispatch) => {
        dispatch({
            type: userConsts.REGISTER_REQUEST
        })

        const res = await axios.post('/admin/signup', {
            ...user
        });

        if (res.status === 201) {
            const {  message, user } = res.data;
            dispatch({
                type: userConsts.REGISTER_SUCCESS,
                payload: {
                    user, message
                }
            })
        }

        if (res.status !== 201) {
            dispatch({
                type: userConsts.REGISTER_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }

    }
}