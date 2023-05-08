import {
  CREATE_NEW_RECORD,
  SET_VALUE_FOR_DOMAIN_SETUP,
  CREATE_NEW_RECORD_DONE,
  CREATE_NEW_RECORD_FAIL,
  CREATE_NEW_RECORD_RESET,
  ADD_DOMAIN_TO_POSTFIX,
  ADD_DOMAIN_TO_POSTFIX_DONE,
  ADD_DOMAIN_TO_POSTFIX_FAIL,
  ADD_DOMAIN_TO_POSTFIX_RESET,
  ADD_DKIM_TO_MAILERQ,
  ADD_DKIM_TO_MAILERQ_DONE,
  ADD_DKIM_TO_MAILERQ_FAIL,
  ADD_DKIM_TO_MAILERQ_RESET,
  ADD_DOMAIN_TO_LIST_DEFINITION,
  ADD_DOMAIN_TO_LIST_DEFINITION_DONE,
  ADD_DOMAIN_TO_LIST_DEFINITION_FAIL,
  ADD_DOMAIN_TO_LIST_DEFINITION_RESET
} from "./../constant/setup.domain.constant";

export const NewDomainFormValueReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_VALUE_FOR_DOMAIN_SETUP:
      return { value: action.payload };
    default:
      return state;
  }
};

export const CreateRecordForDomainReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_RECORD:
      return { ...state, isLoading: true, success: false, error: false };
    case CREATE_NEW_RECORD_DONE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case CREATE_NEW_RECORD_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case CREATE_NEW_RECORD_RESET:
      return { isLoading: false, success: false, error: false, message: "" };
    default:
      return state;
  }
};

export const AddDomainToPostfixReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DOMAIN_TO_POSTFIX:
      return { ...state, isLoading: true, success: false, error: false };
    case ADD_DOMAIN_TO_POSTFIX_DONE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case ADD_DOMAIN_TO_POSTFIX_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case ADD_DOMAIN_TO_POSTFIX_RESET:
      return { isLoading: false, success: false, error: false, message: "" };
    default:
      return state;
  }
};

export const AddDkimToMailerQReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DKIM_TO_MAILERQ:
      return { ...state, isLoading: true, success: false, error: false };
    case ADD_DKIM_TO_MAILERQ_DONE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case ADD_DKIM_TO_MAILERQ_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case ADD_DKIM_TO_MAILERQ_RESET:
      return { isLoading: false, success: false, error: false, message: "" };
    default:
      return state;
  }
};

export const AddNewDomainToListDefinitionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DOMAIN_TO_LIST_DEFINITION:
      return { ...state, isLoading: true, success: false, error: false };
    case ADD_DOMAIN_TO_LIST_DEFINITION_DONE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: action.payload,
      };
    case ADD_DOMAIN_TO_LIST_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case ADD_DOMAIN_TO_LIST_DEFINITION_RESET:
      return { isLoading: false, success: false, error: false, message: "" };
    default:
      return state;
  }
};
