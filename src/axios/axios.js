import axios from 'axios';
import UserStore from './../store/user.store';

const instance = axios.create({
});

instance.interceptors.request.use(
  (config) => {
    const token = UserStore.getToken();
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;