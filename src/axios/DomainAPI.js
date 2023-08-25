import axios from 'axios';

const VOYAGER_API = process.env.VOYAGER_API;
const ENDPOINTS = {
  GET_ALL_DOMAIN: '/domain',
  CREATE_DOMAIN: '/domain',
  GET_DOMAIN_BY_ID: '/domain/id/:id:'
};


const DomainAPI = {
  getAllDomain: () => {
    return axios.get(VOYAGER_API + ENDPOINTS.GET_ALL_DOMAIN);
  },

  getDomainById: (id) => {
    const url = VOYAGER_API + ENDPOINTS.GET_DOMAIN_BY_ID;
    return axios.get(url.replace(':id:', id));
  },

  createDomain: (data) => {
    return axios.post(VOYAGER_API + ENDPOINTS.CREATE_DOMAIN, data);
  },

  updateDomain: (data) => {
    return axios.patch(VOYAGER_API + ENDPOINTS.CREATE_DOMAIN, data);
  },
};

export default DomainAPI;