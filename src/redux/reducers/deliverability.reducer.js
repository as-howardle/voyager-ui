import {
  CREATE_DELIVERABILITY_FAIL,
  CREATE_DELIVERABILITY_RESET,
  DELETE_DELIVERABILITY,
  DELETE_DELIVERABILITY_DONE,
  DELETE_DELIVERABILITY_FAIL,
  DELETE_DELIVERABILITY_RESET,
  LIST_DEFINITION,
  LIST_DEFINITION_DONE,
  LIST_DEFINITION_FAIL,
  LIST_DELIVERABILITY,
  LIST_DELIVERABILITY_DONE,
  LIST_DELIVERABILITY_FAIL,
  SET_DELIVERABILITY_DETAIL,
  SET_DELIVERABILITY_DETAIL_DONE,
  SET_DELIVERABILITY_DETAIL_RESET,
  UPDATE_DELIVERABILITY,
  UPDATE_DELIVERABILITY_DONE,
  UPDATE_DELIVERABILITY_FAIL,
  UPDATE_DELIVERABILITY_RESET
} from '../constant/deliverability.constant';

export const DeliverabilityListReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_DELIVERABILITY:
      return { ...state, isLoading: true };
    case LIST_DELIVERABILITY_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_DELIVERABILITY_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const DefinitionListReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_DEFINITION:
      return { ...state, isLoading: true };
    case LIST_DEFINITION_DONE:
      return { isLoading: false, listDefinition: action.payload };
    case LIST_DEFINITION_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreateDeliverabilityConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DELIVERABILITY:
      return { ...state, isLoading: true, success: false, error: false };
    case CREATE_DELIVERABILITY_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case CREATE_DELIVERABILITY_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case CREATE_DELIVERABILITY_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const UpdateDeliverabilityConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DELIVERABILITY:
      return { ...state, isLoading: true, success: false, error: false };
    case UPDATE_DELIVERABILITY_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case UPDATE_DELIVERABILITY_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case UPDATE_DELIVERABILITY_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const SetDeliverabilityConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_DELIVERABILITY_DETAIL:
      return { ...state, isLoading: true };
    case SET_DELIVERABILITY_DETAIL_DONE:
      return { ...state, isLoading: false, config: action.payload };
    case SET_DELIVERABILITY_DETAIL_RESET:
      return { ...state, isLoading: false, config: null };
    default:
      return state;
  }
};

export const DeleteDeliverabilityConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DELIVERABILITY:
      return { ...state, isLoading: true, success: false, error: false };
    case DELETE_DELIVERABILITY_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case DELETE_DELIVERABILITY_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case DELETE_DELIVERABILITY_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};
