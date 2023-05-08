import axios from './axios';

const JANUS_NEW_DOMAIN_API = process.env.JANUS_NEW_DOMAIN_API;
const ENDPOINTS = {
  CREATE_NEW_RECORD: '/admin/domain/add_record_aws',
  ADD_DOMAIN_TO_POSTFIX_SERVER: '/admin/domain/add_domains_to_postfix_server',
  ADD_DKIM_TO_MAILERQ: '/admin/domain/add_dkim_to_mailq_mysql',
  ADD_DOMAIN_TO_LIST_DEFINITION: '/admin/domain/add_domain_to_list_definition'
};


const NewDomainAPI = {
  createNewRecord: (value) => {
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.CREATE_NEW_RECORD, value);
  },
  addDomainToPostfixServer: (domain) => {
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.ADD_DOMAIN_TO_POSTFIX_SERVER, domain);
  },
  addDkimToMailerQ: (domain) => {
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.ADD_DKIM_TO_MAILERQ, domain);
  },
  addDomainToListDefinition: (domain) => {
    return axios.post(JANUS_NEW_DOMAIN_API + ENDPOINTS.ADD_DOMAIN_TO_LIST_DEFINITION, domain);
  }
};

export default NewDomainAPI;