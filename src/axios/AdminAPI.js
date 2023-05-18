import axios from './axios';

const JANUS_NEW_DOMAIN_API = process.env.JANUS_NEW_DOMAIN_API;
const ENDPOINTS = {
  UPDATE: '/admin/patch',
  GET: '/admin/view'
};

const AdminAPI = {
  update: (value) => {
    return axios.patch(JANUS_NEW_DOMAIN_API + ENDPOINTS.UPDATE, value);
  },
  get: (value) => {
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.GET, value);
  }
};

export default AdminAPI;