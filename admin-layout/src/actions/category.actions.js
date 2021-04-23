import axios from "../helpers/axios"
import { categoryConsts } from "./const"

export const fetchCategories = () => {
    return async dispatch => {
        const res = await axios.get('/category');
        dispatch({
            type: categoryConsts.FETCH_REQUEST,
        })
        if (res.status === 200) {
            const { categoryList } = res.data
            dispatch({
                type: categoryConsts.FETCH_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        }
        else {
            dispatch({
                type: categoryConsts.FETCH_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}