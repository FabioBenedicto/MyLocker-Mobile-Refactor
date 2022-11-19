import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mylocker-api.herokuapp.com/',
    // baseURL: 'http://192.168.0.114:3333/',
});

export default api;
