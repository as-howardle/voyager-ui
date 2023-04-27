import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_DELI_DOMAIN_CONFIG_LIST: '/mta/deliverability_domain_config/list',
  CREATE: '/mta/deliverability_domain_config/create',
  GET_BY_ID: '/mta/deliverability_domain_config/list?id=:id:',
  UPDATE: '/mta/deliverability_domain_config/update/:id:',
  DELETE: '/mta/deliverability_domain_config/delete/:id:'
};

const DeliverabilityDomainAPI = {
  getDeliDomainConfigList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_DELI_DOMAIN_CONFIG_LIST);
  },
  create: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE, value);
  },
  getById: (id) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_BY_ID.replace(':id:', id));
  },
  update: (id, value) => {
    return axios.patch(JANUS_API + ENDPOINTS.UPDATE.replace(':id:', id), value);
  },
  delete: (id) => {
    return axios.delete(JANUS_API + ENDPOINTS.DELETE.replace(':id:', id));
  }
};

export default DeliverabilityDomainAPI;