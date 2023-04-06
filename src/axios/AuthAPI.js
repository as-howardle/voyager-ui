import axios from 'axios';
import UserStore from './../store/user.store';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  SIGNIN: '/user/token',
  CHANGE_PASSWORD: '/user/change-password'
};


const AuthAPI = {
  signIn: (username, password) => {
    return axios.post(JANUS_API + ENDPOINTS.SIGNIN, { username, password });
  },
  changePassword: (oldPassword, newPassword) => {
    const token = UserStore.getToken();
    const config = {
      headers: {
        Authorization: `${token}`,
      }
    };
    return axios.post(JANUS_API + ENDPOINTS.CHANGE_PASSWORD, { oldPassword, newPassword }, config);
  }
};

export default AuthAPI;