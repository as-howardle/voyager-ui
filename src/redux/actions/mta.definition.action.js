import {
  CREATE_MTA_DEFINITION,
  CREATE_MTA_DEFINITION_DONE,
  CREATE_MTA_DEFINITION_FAIL,
  LIST_MTA_DEFINITION,
  LIST_MTA_DEFINITION_DONE,
  LIST_MTA_DEFINITION_FAIL,
  SET_MTA_DEFINITION_DETAIL,
  SET_MTA_DEFINITION_DETAIL_DONE,
  SET_MTA_DEFINITION_DETAIL_FAIL,
  UPDATE_MTA_DEFINITION,
  UPDATE_MTA_DEFINITION_DONE,
  UPDATE_MTA_DEFINITION_FAIL
} from './../constant/mta.definition.constant';
import MTADefinitionAPI from './../../axios/MTADefinitionAPI';

export const listMTADefinition = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MTA_DEFINITION
    });
    const { data } = await MTADefinitionAPI.getList();
    dispatch({
      type: LIST_MTA_DEFINITION_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_MTA_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const createMTADefinition = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MTA_DEFINITION
    });
    const { data } = await MTADefinitionAPI.create(value);
    dispatch({
      type: CREATE_MTA_DEFINITION_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: CREATE_MTA_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const updateMTADefinition = (value, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MTA_DEFINITION
    });
    const { data } = await MTADefinitionAPI.update(value, id);
    dispatch({
      type: UPDATE_MTA_DEFINITION_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MTA_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const setMTADefinitionDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MTA_DEFINITION_DETAIL
    });
    const { data } = await MTADefinitionAPI.getById(id);
    dispatch({
      type: SET_MTA_DEFINITION_DETAIL_DONE,
      payload: data[0]
    });
  } catch (error) {
    dispatch({
      type: SET_MTA_DEFINITION_DETAIL_FAIL,
      payload: error.response.data.error
    });
  }
};