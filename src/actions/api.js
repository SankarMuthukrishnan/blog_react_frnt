import axios from 'axios';
import { get } from 'lodash';

var api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config)=>{
    let conf= {
        ...config,
        headers: {
            ...config.headers
        }
    }
    return conf;
})

api.interceptors.response.use(response =>{
    let data = get(response, "data");
    return {
        ...response,
        data
    }
},(error)=>{
    return Promise.reject(error)
})

export default api;