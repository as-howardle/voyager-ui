import axios from './axios';

const JANUS_NEW_DOMAIN_API = process.env.JANUS_NEW_DOMAIN_API;
const ENDPOINTS = {
  VERIFY: '/admin/blacklist/verify',
  VERIFY_LIST: '/admin/email/verify/list'
};

const VerifyEmailAPI = {
  verify: (value) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.VERIFY, value, config);
  },
  verifyList: (value) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.VERIFY_LIST, value, config);
  }
};

export default VerifyEmailAPI;