import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/publisher/list',
  CREATE: '/publisher/create'
};

const PublisherAPI = {
  getList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST);
  },

  create: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value);
  }

  // updateTransport: (value, id) => {
  //   return axios.patch(JANUS_API + ENDPOINTS.UPDATE.replace(':id:', id), value);
  // }
};

export default PublisherAPI;