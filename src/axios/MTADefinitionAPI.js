import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/mta/mta_definition/list',
  CREATE: '/mta/mta_definition/create',
  UPDATE: '/mta/mta_definition/update/:id:',
  GET_BY_ID: '/mta/mta_definition/list?id=:id:'
};


const MTADefinitionAPI = {
  getList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST);
  },

  getById: (id) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_BY_ID.replace(':id:', id));
  },

  create: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value);
  },

  update: (value, id) => {
    return axios.patch(JANUS_API + ENDPOINTS.UPDATE.replace(':id:', id), value);
  }
};

export default MTADefinitionAPI;