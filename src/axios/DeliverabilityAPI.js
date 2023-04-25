import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_DELI_CONFIG_LIST: '/mta/deliverability_config/list',
  GET_DEFINITION_LIST: '/list_definition/list',
  CREATE: '/mta/deliverability_config/create',
  GET_BY_ID: '/mta/deliverability_config/list?id=:id:',
  UPDATE: '/mta/deliverability_config/update/:id:',
  DELETE: '/mta/deliverability_config/delete/:id:'
};

const DeliverabilityAPI = {
  getDeliConfigList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_DELI_CONFIG_LIST);
  },
  getDefinitionDeliList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_DEFINITION_LIST);
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

export default DeliverabilityAPI;