import axios from 'axios';

const VOYAGER_API = process.env.VOYAGER_API;
const ENDPOINTS = {
  GET_ALL_TEMPLATE: '/template',
  CREATE_TEMPLATE: '/template',
  UPDATE_TEMPLATE: '/template/:id:',
  GET_TEMPLATE_BY_ID: '/template/id/:id:',
};


const TemplateAPI = {
  getAllTemplate: () => {
    return axios.get(VOYAGER_API + ENDPOINTS.GET_ALL_TEMPLATE);
  },

  createTemplate: (data) => {
    return axios.post(VOYAGER_API + ENDPOINTS.CREATE_TEMPLATE, data);
  },

  getTemplateById: (id) => {
    const url = VOYAGER_API + ENDPOINTS.GET_TEMPLATE_BY_ID;
    return axios.get(url.replace(':id:', id));
  },

  updateTemplate: (id, data) => {
    const url = VOYAGER_API + ENDPOINTS.UPDATE_TEMPLATE;
    return axios.patch(url.replace(':id:', id), data);
  },
};

export default TemplateAPI;