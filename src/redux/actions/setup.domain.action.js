import {
  ADD_DKIM_TO_MAILERQ,
  ADD_DKIM_TO_MAILERQ_DONE,
  ADD_DKIM_TO_MAILERQ_FAIL,
  ADD_DOMAIN_TO_LIST_DEFINITION,
  ADD_DOMAIN_TO_LIST_DEFINITION_DONE,
  ADD_DOMAIN_TO_LIST_DEFINITION_FAIL,
  ADD_DOMAIN_TO_POSTFIX,
  ADD_DOMAIN_TO_POSTFIX_DONE,
  ADD_DOMAIN_TO_POSTFIX_FAIL,
  CREATE_NEW_RECORD,
  CREATE_NEW_RECORD_DONE,
  CREATE_NEW_RECORD_FAIL,
  SET_VALUE_FOR_DOMAIN_SETUP
} from './../constant/setup.domain.constant';
import NewDomainAPI from './../../axios/NewDomainAPI';

export const setValueForNewDomainForm = (value) => async (dispatch) => {
  dispatch({
    type: SET_VALUE_FOR_DOMAIN_SETUP,
    payload: value
  });
};

export const createNewRecordForDomain = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_RECORD
    });
    const { data } = await NewDomainAPI.createNewRecord(value);
    dispatch({
      type: CREATE_NEW_RECORD_DONE,
      payload: JSON.stringify(data, null, 2)
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_RECORD_FAIL,
      payload: error.response.data.error
    });
  }
};

export const addDomainToPostfix = (value) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DOMAIN_TO_POSTFIX
    });
    await NewDomainAPI.addDomainToPostfixServer(value);
    // await NewDomainAPI.addDkimToMailerQ(domainMailerQ);
    // await NewDomainAPI.addDomainToListDefinition(domainListDefinition);
    dispatch({
      type: ADD_DOMAIN_TO_POSTFIX_DONE,
      payload: 'Add domain to postfix server successfully'
    });

  } catch (error) {
    dispatch({
      type: ADD_DOMAIN_TO_POSTFIX_FAIL,
      payload: error.response.data.error
    });
  }
};

export const addDkimToMailerq = (value) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DKIM_TO_MAILERQ
    });
    await NewDomainAPI.addDkimToMailerQ(value);
    // await NewDomainAPI.addDomainToListDefinition(domainListDefinition);
    dispatch({
      type: ADD_DKIM_TO_MAILERQ_DONE,
      payload: 'Add DKIM to MailerQ server successfully'
    });

  } catch (error) {
    dispatch({
      type: ADD_DKIM_TO_MAILERQ_FAIL,
      payload: error.response.data.error
    });
  }
};

export const addNewDomainToListDefinition = (value) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DOMAIN_TO_LIST_DEFINITION
    });
    await NewDomainAPI.addDomainToListDefinition(value);
    dispatch({
      type: ADD_DOMAIN_TO_LIST_DEFINITION_DONE,
      payload: 'Add domain to list definition successfully'
    });

  } catch (error) {
    dispatch({
      type: ADD_DOMAIN_TO_LIST_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

