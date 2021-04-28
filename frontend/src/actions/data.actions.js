import axios from "../helpers/axios"
import { categoryConsts, productConsts } from "./const"


export const fetchDatas = () => {
    return async dispatch => {
        const res = await axios.get('/datas');
        // dispatch({
        //     type: categoryConsts.FETCH_REQUEST,
        // })
        // dispatch({
        //     type: productConsts.FETCH_REQUEST,
        // })
        if (res.status === 200) {
            const { categories, products } = res.data
            dispatch({
                type: categoryConsts.FETCH_CATEGORIES_SUCCESS,
                payload: {
                    categories
                }
            })
            dispatch({
                type: productConsts.FETCH_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })
        }
        // else {
        //     dispatch({
        //         type: categoryConsts.FETCH_FAILURE,
        //         payload: {
        //             error: res.data.error
        //         }
        //     })
        //     dispatch({
        //         type: productConsts.FETCH_FAILURE,
        //         payload: {
        //             error: res.data.error
        //         }
        //     })
        // }
        console.log(res)
    }
}
