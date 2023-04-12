import {
  LIST_MTA_ASSIGNATION,
  LIST_MTA_ASSIGNATION_DONE,
  LIST_MTA_ASSIGNATION_FAIL,
  SET_MTA_ASSIGNATION_DETAIL,
  SET_MTA_ASSIGNATION_DETAIL_DONE
} from './../constant/mta.assignation.constant';
import MTAAssignationAPI from './../../axios/MTAAssignationAPI';

export const listMTAAssignation = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MTA_ASSIGNATION
    });
    const { data } = await MTAAssignationAPI.getList();
    dispatch({
      type: LIST_MTA_ASSIGNATION_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_MTA_ASSIGNATION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const setMTAAssignationDetail = (value) => (dispatch) => {
  dispatch({
    type: SET_MTA_ASSIGNATION_DETAIL
  });
  dispatch({
    type: SET_MTA_ASSIGNATION_DETAIL_DONE,
    payload: value
  });
};