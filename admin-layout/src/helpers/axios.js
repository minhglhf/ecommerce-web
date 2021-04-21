import axios from 'axios';
import { api } from '../config'
const axiosIntance = axios.create({
    baseURL: api,
    // headers: {
    //     'Authorization' : 'Bearer token'
    // }
})

export default axiosIntance;