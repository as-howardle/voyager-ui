import {
  CREATE_NEW_RECORD,
  SET_VALUE_FOR_DOMAIN_SETUP,
  CREATE_NEW_RECORD_DONE,
  CREATE_NEW_RECORD_FAIL,
  ADD_DOMAIN_TO_POSTFIX,
  ADD_DOMAIN_TO_POSTFIX_DONE,
  ADD_DOMAIN_TO_POSTFIX_FAIL,
  ADD_DKIM_TO_MAILERQ,
  ADD_DKIM_TO_MAILERQ_DONE,
  ADD_DKIM_TO_MAILERQ_FAIL,
  ADD_DOMAIN_TO_LIST_DEFINITION,
  ADD_DOMAIN_TO_LIST_DEFINITION_DONE,
  ADD_DOMAIN_TO_LIST_DEFINITION_FAIL,
} from "./../constant/setup.domain.constant";
import NewDomainAPI from "./../../axios/NewDomainAPI";

export const setValueForNewDomainForm = (value) => async (dispatch) => {
  dispatch({
    type: SET_VALUE_FOR_DOMAIN_SETUP,
    payload: value,
  });
};

export const createNewRecordForDomain = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_RECORD,
    });
    await NewDomainAPI.createNewRecord(value);
    // await NewDomainAPI.addDomainToPostfixServer(domainPostfix);
    // await NewDomainAPI.addDkimToMailerQ(domainMailerQ);
    // await NewDomainAPI.addDomainToListDefinition(domainListDefinition);
    dispatch({
      type: CREATE_NEW_RECORD_DONE,
      payload: "Create new record successfully",
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_RECORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const addDomainToPostfix = (value) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DOMAIN_TO_POSTFIX,
    });
    await NewDomainAPI.addDomainToPostfixServer(value);
    // await NewDomainAPI.addDkimToMailerQ(domainMailerQ);
    // await NewDomainAPI.addDomainToListDefinition(domainListDefinition);
    dispatch({
      type: ADD_DOMAIN_TO_POSTFIX_DONE,
      payload: "Add domain to postfix server successfully",
    });

  } catch (error) {
    dispatch({
      type: ADD_DOMAIN_TO_POSTFIX_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const addDkimToMailerq = (value) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DKIM_TO_MAILERQ,
    });
    await NewDomainAPI.addDkimToMailerQ(value);
    // await NewDomainAPI.addDomainToListDefinition(domainListDefinition);
    dispatch({
      type: ADD_DKIM_TO_MAILERQ_DONE,
      payload: "Add DKIM to MailerQ server successfully",
    });

  } catch (error) {
    dispatch({
      type: ADD_DKIM_TO_MAILERQ_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const addNewDomainToListDefinition = (value) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DOMAIN_TO_LIST_DEFINITION,
    });
    await NewDomainAPI.addDomainToListDefinition(value);
    dispatch({
      type: ADD_DOMAIN_TO_LIST_DEFINITION_DONE,
      payload: "Add domain to list definition successfully",
    });

  } catch (error) {
    dispatch({
      type: ADD_DOMAIN_TO_LIST_DEFINITION_FAIL,
      payload: error.response.data.error,
    });
  }
};

