import {
  CREATE_LIST_DEFINITION,
  CREATE_LIST_DEFINITION_DONE,
  CREATE_LIST_DEFINITION_FAIL,
  CREATE_LIST_DEFINITION_RESET,
  GET_LIST_DATABASE,
  GET_LIST_DATABASE_DONE,
  GET_LIST_DATABASE_FAIL,
  GET_LIST_TEMPLATE,
  GET_LIST_TEMPLATE_COUNTRY,
  GET_LIST_TEMPLATE_COUNTRY_DONE,
  GET_LIST_TEMPLATE_COUNTRY_FAIL,
  GET_LIST_TEMPLATE_DONE,
  GET_LIST_TEMPLATE_FAIL,
  SET_LIST_DEFINITION_DETAIL,
  SET_LIST_DEFINITION_DETAIL_DONE,
  SET_LIST_DEFINITION_DETAIL_FAIL,
  UPDATE_LIST_DEFINITION,
  UPDATE_LIST_DEFINITION_DONE,
  UPDATE_LIST_DEFINITION_FAIL,
  UPDATE_LIST_DEFINITION_RESET
} from './../constant/list.definition.constant';

export const SetListDefinitionDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_LIST_DEFINITION_DETAIL:
      return { ...state, isLoading: true };
    case SET_LIST_DEFINITION_DETAIL_DONE:
      return { ...state, isLoading: false, def: action.payload };
    case SET_LIST_DEFINITION_DETAIL_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const ListTemplateListReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_TEMPLATE:
      return { ...state, isLoading: true };
    case GET_LIST_TEMPLATE_DONE:
      return { isLoading: false, list: action.payload };
    case GET_LIST_TEMPLATE_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const ListTemplateCountryListReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_TEMPLATE_COUNTRY:
      return { ...state, isLoading: true };
    case GET_LIST_TEMPLATE_COUNTRY_DONE:
      return { isLoading: false, list: action.payload };
    case GET_LIST_TEMPLATE_COUNTRY_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const ListDatabaseReducers = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_DATABASE:
      return { ...state, isLoading: true };
    case GET_LIST_DATABASE_DONE:
      return { isLoading: false, list: action.payload };
    case GET_LIST_DATABASE_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const UpdateListDefinitionReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LIST_DEFINITION:
      return { ...state, isLoading: true, success: false, error: false };
    case UPDATE_LIST_DEFINITION_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case UPDATE_LIST_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case UPDATE_LIST_DEFINITION_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const CreateListDefinitionReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST_DEFINITION:
      return { ...state, isLoading: true, success: false, error: false };
    case CREATE_LIST_DEFINITION_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case CREATE_LIST_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case CREATE_LIST_DEFINITION_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};
