import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/list_definition/list?id=:id:',
  GET_LIST_TEMPLATE: '/list_definition/list_template?publisher_id=:val:',
  GET_LIST_COUNTRY_TEMPLATE: '/list_definition/list_template_country?list_template_id=:val:',
  GET_LIST_DATABASE: '/list_definition/list_database',
  UPDATE_LIST_DEFINITION: '/list_definition/:id:',
  CREATE_LIST_DEFINITION: '/list_definition/create'
};

const ListDefinitionAPI = {
  getListById: (id) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST.replace(':id:', id));
  },
  getListTemplate: (val) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST_TEMPLATE.replace(':val:', val));
  },
  getListTemplateCountry: (val) => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST_COUNTRY_TEMPLATE.replace(':val:', val));
  },
  getListDatabase: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST_DATABASE);
  },
  updateListDefinition: (id, value) => {
    return axios.patch(JANUS_API + ENDPOINTS.UPDATE_LIST_DEFINITION.replace(':id:', id), value);
  },
  createListDefinition: (value) => {
    return axios.post(JANUS_API + ENDPOINTS.CREATE_LIST_DEFINITION, value);
  }
};

export default ListDefinitionAPI;