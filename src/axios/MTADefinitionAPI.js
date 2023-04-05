import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/mta/mta_definition/list',
  CREATE: '/mta/mta_definition/create'
};


const MTADefinitionAPI = {
  getList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST);
  },

  create: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value);
  }
};

export default MTADefinitionAPI;