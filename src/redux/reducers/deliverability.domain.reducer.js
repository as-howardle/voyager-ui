import {
  CREATE_DELIVERABILITY_DOMAIN,
  CREATE_DELIVERABILITY_DOMAIN_DONE,
  CREATE_DELIVERABILITY_DOMAIN_FAIL,
  CREATE_DELIVERABILITY_DOMAIN_RESET,
  DELETE_DELIVERABILITY_DOMAIN,
  DELETE_DELIVERABILITY_DOMAIN_DONE,
  DELETE_DELIVERABILITY_DOMAIN_FAIL,
  DELETE_DELIVERABILITY_DOMAIN_RESET,
  LIST_DELIVERABILITY_DOMAIN,
  LIST_DELIVERABILITY_DOMAIN_DONE,
  LIST_DELIVERABILITY_DOMAIN_FAIL,
  SET_DELIVERABILITY_DOMAIN_DETAIL,
  SET_DELIVERABILITY_DOMAIN_DETAIL_DONE,
  SET_DELIVERABILITY_DOMAIN_DETAIL_FAIL,
  UPDATE_DELIVERABILITY_DOMAIN,
  UPDATE_DELIVERABILITY_DOMAIN_DONE,
  UPDATE_DELIVERABILITY_DOMAIN_FAIL,
  UPDATE_DELIVERABILITY_DOMAIN_RESET
} from '../constant/deliverability.domain.constant';

export const DeliverabilityDomainListReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_DELIVERABILITY_DOMAIN:
      return { ...state, isLoading: true };
    case LIST_DELIVERABILITY_DOMAIN_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_DELIVERABILITY_DOMAIN_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreateDeliverabilityDomainConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DELIVERABILITY_DOMAIN:
      return { ...state, isLoading: true, success: false, error: false };
    case CREATE_DELIVERABILITY_DOMAIN_DONE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: action.payload
      };
    case CREATE_DELIVERABILITY_DOMAIN_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case CREATE_DELIVERABILITY_DOMAIN_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const SetDeliverabilityDomainConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_DELIVERABILITY_DOMAIN_DETAIL:
      return { ...state, isLoading: true };
    case SET_DELIVERABILITY_DOMAIN_DETAIL_DONE:
      return { ...state, isLoading: false, config: action.payload };
    case SET_DELIVERABILITY_DOMAIN_DETAIL_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const UpdateDeliverabilityDomainConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DELIVERABILITY_DOMAIN:
      return { ...state, isLoading: true, success: false, error: false };
    case UPDATE_DELIVERABILITY_DOMAIN_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case UPDATE_DELIVERABILITY_DOMAIN_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case UPDATE_DELIVERABILITY_DOMAIN_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const DeleteDeliverabilityDomainConfigReducers = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DELIVERABILITY_DOMAIN:
      return { ...state, isLoading: true, success: false, error: false };
    case DELETE_DELIVERABILITY_DOMAIN_DONE:
      return { ...state, isLoading: false, success: true, error: false, message: action.payload };
    case DELETE_DELIVERABILITY_DOMAIN_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case DELETE_DELIVERABILITY_DOMAIN_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};
