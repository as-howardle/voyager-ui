import axios from './axios';

const JANUS_NEW_DOMAIN_API = process.env.JANUS_NEW_DOMAIN_API;
const ENDPOINTS = {
  UPDATE: '/admin/patch',
};

const AdminAPI = {
  update: (value) => {
    return axios.patch(JANUS_NEW_DOMAIN_API + ENDPOINTS.UPDATE, value);
  },
};

export default AdminAPI;