import axios from 'axios';

let conf = {
    baseURL: process.env.REACT_APP_SERVER_URL,
};

const client = axios.create(conf);

// client.interceptors.request.use(function (config) {
//     if(localStorage.getItem('token') !== null) {
//         config.headers.Authorization =  "Token " + localStorage.getItem('token');
//     }
//     return config;
// });

export default client;