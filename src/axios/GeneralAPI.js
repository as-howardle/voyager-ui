import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_COUNTRY_LIST: '/general/country',
  GET_LANGUAGE_LIST: '/general/language',
  GET_SALE_MANAGER_LIST: '/general/representative-sales-manager'
};

const GeneralAPI = {
  getCountryList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_COUNTRY_LIST);
  },

  getLanguageList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LANGUAGE_LIST);
  },

  getSaleManagerList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_SALE_MANAGER_LIST);
  },
};

export default GeneralAPI;