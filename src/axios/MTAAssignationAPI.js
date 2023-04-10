import axios from './axios';

const JANUS_API = process.env.JANUS_API;
const ENDPOINTS = {
  GET_LIST: '/mta/mta_definition_assigment/list'
};


const MTAAssignationAPI = {
  getList: () => {
    return axios.get(JANUS_API + ENDPOINTS.GET_LIST);
  }
};

export default MTAAssignationAPI;