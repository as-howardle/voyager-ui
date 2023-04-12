import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/publisher/list',
  CREATE: '/publisher/create',
  GET_PUB_ID: '/publisher/:id:',
  GENERATE_KEY: '/publisher/:id:/generate-credential/:type:',
  UPDATE: '/publisher/update/:id:'
};

const PublisherAPI = {
  getList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST);
  },

  create: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value);
  },

  getPublisherWithId: (id) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_PUB_ID.replace(':id:', id));
  },

  generateKey: (id, type) => {
    let url = ENDPOINTS.GENERATE_KEY.replace(':id:', id);
    url = url.replace(':type:', type);
    return axios.post(JANUS_API + url);
  },

  update: (value, id) => {
    return axios.patch(JANUS_API + ENDPOINTS.UPDATE.replace(':id:', id), value);
  }
};

export default PublisherAPI;