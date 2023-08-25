import axios from 'axios';
import UserStore from './../store/user.store';

const VOYAGER_API = process.env.VOYAGER_API;
const ENDPOINTS = {
  SIGNIN: '/user/token',
  CHANGE_PASSWORD: '/user/change-password'
};


const AuthAPI = {
  signIn: (email, password) => {
    return axios.post(VOYAGER_API + ENDPOINTS.SIGNIN, { email, password });
  },
  changePassword: (oldPassword, newPassword) => {
    const token = UserStore.getToken();
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };
    return axios.post(VOYAGER_API + ENDPOINTS.CHANGE_PASSWORD, { oldPassword, newPassword }, config);
  }
};

export default AuthAPI;