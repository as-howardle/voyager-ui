import {
  LIST_MTA_DEFINITION,
  LIST_MTA_DEFINITION_DONE,
  LIST_MTA_DEFINITION_FAIL,
  CREATE_MTA_DEFINITION,
  CREATE_MTA_DEFINITION_DONE,
  CREATE_MTA_DEFINITION_FAIL,
  CREATE_MTA_DEFINITION_RESET,
  UPDATE_MTA_DEFINITION,
  UPDATE_MTA_DEFINITION_DONE,
  UPDATE_MTA_DEFINITION_FAIL,
  UPDATE_MTA_DEFINITION_RESET,
  SET_MTA_DEFINITION_DETAIL,
  SET_MTA_DEFINITION_DETAIL_DONE,
  SET_MTA_DEFINITION_DETAIL_RESET
} from './../constant/mta.definition.constant';



export const MTADefinitionListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_MTA_DEFINITION:
      return { ...state, isLoading: true };
    case LIST_MTA_DEFINITION_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_MTA_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreateMTADefinitionReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MTA_DEFINITION:
      return { ...state, isLoading: true, success: false, error: false };
    case CREATE_MTA_DEFINITION_DONE:
      return { ...state, isLoading: false, success: true, message: action.payload, error: false };
    case CREATE_MTA_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case CREATE_MTA_DEFINITION_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const UpdateMTADefinitionReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MTA_DEFINITION:
      return { ...state, isLoading: true, success: false, error: false };
    case UPDATE_MTA_DEFINITION_DONE:
      return { ...state, isLoading: false, success: true, message: action.payload, error: false };
    case UPDATE_MTA_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case UPDATE_MTA_DEFINITION_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const SetMTADefinitionDetailReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_MTA_DEFINITION_DETAIL:
      return { ...state, isLoading: true };
    case SET_MTA_DEFINITION_DETAIL_DONE:
      return { ...state, isLoading: false, mta: action.payload };
    case SET_MTA_DEFINITION_DETAIL_RESET:
      return { ...state, isLoading: false, mta: null };
    default:
      return state;
  }
};