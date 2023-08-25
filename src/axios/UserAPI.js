import axiosWithToken from './axios';
import axios from 'axios'

const VOYAGER_API = process.env.VOYAGER_API;
const ENDPOINTS = {
  GET_ALL_USER: '/user',
  GET_USER_BY_ID: '/user/:id:',
  CREATE_USER: '/user',
  UPDATE_USER: '/user',
};


const UserAPI = {
  getAllUser: () => {
    return axios.get(VOYAGER_API + ENDPOINTS.GET_ALL_USER);
  },

  getUserById: (id) => {
    const url = VOYAGER_API + ENDPOINTS.GET_USER_BY_ID;
    return axios.get(url.replace(':id:', id));
  },

  createUser: (data) => {
    return axiosWithToken.post(VOYAGER_API + ENDPOINTS.CREATE_USER, data);
  },

  updateUser: (data) => {
    return axiosWithToken.patch(VOYAGER_API + ENDPOINTS.UPDATE_USER, data);
  },
};

export default UserAPI;