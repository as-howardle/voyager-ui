import axios from 'axios';

const VOYAGER_API = process.env.VOYAGER_API;
const ENDPOINTS = {
  GET_ALL_TEMPLATE: '/template'
};


const TemplateAPI = {
  getAllTemplate: () => {
    return axios.get(VOYAGER_API + ENDPOINTS.GET_ALL_TEMPLATE);
  }
};

export default TemplateAPI;