import axios from 'axios';

const instance = axios.create({
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    if (token) {
      config.headers['Authorization'] = `${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;