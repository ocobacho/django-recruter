import axios from 'axios';

let conf = {
    baseURL: "http://127.0.0.1:8000/",
};

const client = axios.create(conf);

// client.interceptors.request.use(function (config) {
//     if(localStorage.getItem('token') !== null) {
//         config.headers.Authorization =  "Token " + localStorage.getItem('token');
//     }
//     return config;
// });

export default client;