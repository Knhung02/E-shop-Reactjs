import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost/laravel8/public/api',
    headers: {
        'Content-Type': 'application/json',
    }
});
export default axiosClient