import {
  LIST_MTA_TRANSPORT,
  LIST_MTA_TRANSPORT_DONE,
  LIST_MTA_TRANSPORT_FAIL,
  LIST_MTA_TRANSPORT_TYPE,
  LIST_MTA_TRANSPORT_TYPE_DONE,
  LIST_MTA_TRANSPORT_TYPE_FAIL,
  CREATE_MTA_TRANSPORT,
  CREATE_MTA_TRANSPORT_DONE,
  CREATE_MTA_TRANSPORT_FAIL,
  CREATE_MTA_TRANSPORT_RESET,
  UPDATE_MTA_TRANSPORT,
  UPDATE_MTA_TRANSPORT_DONE,
  UPDATE_MTA_TRANSPORT_FAIL,
  UPDATE_MTA_TRANSPORT_RESET
} from './../constant/mta.transport.constant';

export const MTATransportReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_MTA_TRANSPORT:
      return { ...state, isLoading: true };
    case LIST_MTA_TRANSPORT_DONE:
      return { isLoading: false, listMTATransport: action.payload };
    case LIST_MTA_TRANSPORT_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const MTATransportTypeReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_MTA_TRANSPORT_TYPE:
      return { ...state, isLoading: true };
    case LIST_MTA_TRANSPORT_TYPE_DONE:
      return { ...state, isLoading: false, mtaTransportTypeList: action.payload };
    case LIST_MTA_TRANSPORT_TYPE_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreateMTATransportReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MTA_TRANSPORT:
      return { ...state, isLoading: true };
    case CREATE_MTA_TRANSPORT_DONE:
      return { ...state, isLoading: false, success: true, message: action.payload };
    case CREATE_MTA_TRANSPORT_FAIL:
      return { ...state, isLoading: false, error: true, message: action.payload };
    case CREATE_MTA_TRANSPORT_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};

export const UpdateMTATransportReducers = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MTA_TRANSPORT:
      return { ...state, isLoading: true };
    case UPDATE_MTA_TRANSPORT_DONE:
      return { ...state, isLoading: false, success: true, message: action.payload };
    case UPDATE_MTA_TRANSPORT_FAIL:
      return { ...state, isLoading: false, error: true, message: action.payload };
    case UPDATE_MTA_TRANSPORT_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};