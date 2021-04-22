import axios from 'axios';
import { api } from '../config'


const token = window.localStorage.getItem('token')
const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : null

    }
})
export default axiosIntance;