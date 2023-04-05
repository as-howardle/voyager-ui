import axios from 'axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/mta/mta_transport/list',
  GET_TRANSPORT_TYPE: '/mta/mta_transport_type/list',
  CREATE: '/mta/mta_transport/create',
  UPDATE: '/mta/mta_transport/update/:id:'
};


const MTATransportAPI = {
  getList: () => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const config = {
      headers: {
        Authorization: `${token.value}`,
      }
    };
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST, config);
  },

  getTransportType: () => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const config = {
      headers: {
        Authorization: `${token.value}`,
      }
    };
    return axios.get(JANUS_API + ENDPOINTS.GET_TRANSPORT_TYPE, config);
  },

  createTransport: (value) => {
    const token = JSON.parse(window.localStorage.getItem('token'));
    const config = {
      headers: {
        Authorization: `${token.value}`,
      }
    };
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value, config);
  },

  updateTransport: (value, id) => {
    console.log(id);
    const token = JSON.parse(window.localStorage.getItem('token'));
    const config = {
      headers: {
        Authorization: `${token.value}`,
      }
    };
    return axios.patch(JANUS_API + ENDPOINTS.UPDATE.replace(':id:', id), value, config);
  }
};

export default MTATransportAPI;