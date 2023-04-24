import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/mta/mta_transport/list',
  GET_TRANSPORT_TYPE: '/mta/mta_transport_type/list',
  CREATE: '/mta/mta_transport/create',
  UPDATE: '/mta/mta_transport/update/:id:',
  GET_BY_ID: '/mta/mta_transport/list?id=:id:'
};


const MTATransportAPI = {
  getList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST);
  },

  getById: (id) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_BY_ID.replace(':id:', id));
  },

  getTransportType: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_TRANSPORT_TYPE);
  },

  createTransport: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value);
  },

  updateTransport: (value, id) => {
    return axios.patch(JANUS_API + ENDPOINTS.UPDATE.replace(':id:', id), value);
  }
};

export default MTATransportAPI;