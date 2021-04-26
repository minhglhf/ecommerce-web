import axios from "../helpers/axios"
import { productConsts } from "./const"


export const addProduct = form => {
    return async dispatch => {
        const res = await axios.post('/product/create', form)
        console.log(res)
    }
}

export const fetchProducts = () => {
    return async dispatch => {
        const res = await axios.get('/products');
        dispatch({
            type: productConsts.FETCH_PRODUCTS_REQUEST,
        })
        if (res.status === 200) {
            const { products } = res.data
            dispatch({
                type: productConsts.FETCH_PRODUCTS_SUCCESS,
                payload: {
                    products
                }
            })
        }
        else {
            dispatch({
                type: productConsts.FETCH_PRODUCTS_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}