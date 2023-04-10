
import {
  LIST_MTA_ASSIGNATION,
  LIST_MTA_ASSIGNATION_DONE,
  LIST_MTA_ASSIGNATION_FAIL,
  SET_MTA_ASSIGNATION_DETAIL,
  SET_MTA_ASSIGNATION_DETAIL_DONE,
  SET_MTA_ASSIGNATION_DETAIL_RESET
} from './../constant/mta.assignation.constant';

export const MTAAssignationListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_MTA_ASSIGNATION:
      return { ...state, isLoading: true };
    case LIST_MTA_ASSIGNATION_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_MTA_ASSIGNATION_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const SetMTAAssignationDetailReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_MTA_ASSIGNATION_DETAIL:
      return { ...state, isLoading: true };
    case SET_MTA_ASSIGNATION_DETAIL_DONE:
      return { ...state, isLoading: false, mta: action.payload };
    case SET_MTA_ASSIGNATION_DETAIL_RESET:
      return { ...state, isLoading: false, mta: null };
    default:
      return state;
  }
};