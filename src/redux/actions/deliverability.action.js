import {
  CREATE_DELIVERABILITY,
  CREATE_DELIVERABILITY_DONE,
  CREATE_DELIVERABILITY_FAIL,
  DELETE_DELIVERABILITY,
  DELETE_DELIVERABILITY_DONE,
  DELETE_DELIVERABILITY_FAIL,
  LIST_DEFINITION,
  LIST_DEFINITION_DONE,
  LIST_DEFINITION_FAIL,
  LIST_DELIVERABILITY,
  LIST_DELIVERABILITY_DONE,
  LIST_DELIVERABILITY_FAIL,
  SET_DELIVERABILITY_DETAIL,
  SET_DELIVERABILITY_DETAIL_DONE,
  SET_DELIVERABILITY_DETAIL_FAIL,
  UPDATE_DELIVERABILITY,
  UPDATE_DELIVERABILITY_DONE,
  UPDATE_DELIVERABILITY_FAIL
} from '../constant/deliverability.constant.js';
import DeliverabilityAPI from '../../axios/DeliverabilityAPI';

export const getDeliverabilityConfigList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_DELIVERABILITY
    });
    const { data } = await DeliverabilityAPI.getDeliConfigList();
    dispatch({
      type: LIST_DELIVERABILITY_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_DELIVERABILITY_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getDefinitionList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_DEFINITION
    });
    const { data } = await DeliverabilityAPI.getDefinitionDeliList();
    dispatch({
      type: LIST_DEFINITION_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const createDeliverabilityConfig = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_DELIVERABILITY
    });
    const { data } = await DeliverabilityAPI.create(value);
    dispatch({
      type: CREATE_DELIVERABILITY_DONE,
      payload: 'Create deliverability config successfully'
    });
  } catch (error) {
    dispatch({
      type: CREATE_DELIVERABILITY_FAIL,
      payload: error.response.data.error
    });
  }
};

export const setDeliverabilityConfigDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_DELIVERABILITY_DETAIL
    });
    const { data } = await DeliverabilityAPI.getById(id);
    dispatch({
      type: SET_DELIVERABILITY_DETAIL_DONE,
      payload: data[0]
    });
  } catch (error) {
    dispatch({
      type: SET_DELIVERABILITY_DETAIL_FAIL,
      payload: error.response.data.error
    });
  }
};

export const updateDeliverabilityConfig = (value, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DELIVERABILITY
    });
    const { data } = await DeliverabilityAPI.update(id, value);
    dispatch({
      type: UPDATE_DELIVERABILITY_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERABILITY_FAIL,
      payload: error.response.data.error
    });
  }
};

export const deleteDeliverabilityConfig = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DELIVERABILITY
    });
    const { data } = await DeliverabilityAPI.delete(id);
    dispatch({
      type: DELETE_DELIVERABILITY_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: DELETE_DELIVERABILITY_FAIL,
      payload: error.response.data.error
    });
  }
};

