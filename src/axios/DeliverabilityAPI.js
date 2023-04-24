import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_DELI_CONFIG_LIST: '/mta/deliverability_config/list'
};

const DeliverabilityAPI = {
  getDeliConfigList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_DELI_CONFIG_LIST);
  }
};

export default DeliverabilityAPI;