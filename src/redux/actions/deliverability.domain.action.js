import {
  CREATE_DELIVERABILITY_DOMAIN,
  CREATE_DELIVERABILITY_DOMAIN_DONE,
  CREATE_DELIVERABILITY_DOMAIN_FAIL,
  DELETE_DELIVERABILITY_DOMAIN,
  DELETE_DELIVERABILITY_DOMAIN_DONE,
  DELETE_DELIVERABILITY_DOMAIN_FAIL,
  LIST_DELIVERABILITY_DOMAIN,
  LIST_DELIVERABILITY_DOMAIN_DONE,
  LIST_DELIVERABILITY_DOMAIN_FAIL,
  SET_DELIVERABILITY_DOMAIN_DETAIL,
  SET_DELIVERABILITY_DOMAIN_DETAIL_DONE,
  SET_DELIVERABILITY_DOMAIN_DETAIL_FAIL,
  UPDATE_DELIVERABILITY_DOMAIN,
  UPDATE_DELIVERABILITY_DOMAIN_DONE,
  UPDATE_DELIVERABILITY_DOMAIN_FAIL,
} from '../constant/deliverability.domain.constant.js';
import DeliverabilityDomainAPI from '../../axios/DeliverabilityDomainAPI';

export const getDeliverabilityDomainConfigList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_DELIVERABILITY_DOMAIN
    });
    const { data } = await DeliverabilityDomainAPI.getDeliDomainConfigList();
    dispatch({
      type: LIST_DELIVERABILITY_DOMAIN_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_DELIVERABILITY_DOMAIN_FAIL,
      payload: error.response.data.error
    });
  }
};

export const createDeliverabilityDomainConfig = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_DELIVERABILITY_DOMAIN
    });
    const { data } = await DeliverabilityDomainAPI.create(value);
    dispatch({
      type: CREATE_DELIVERABILITY_DOMAIN_DONE,
      payload: 'Create deliverability domain config successfully'
    });
  } catch (error) {
    dispatch({
      type: CREATE_DELIVERABILITY_DOMAIN_FAIL,
      payload: error.response.data.error
    });
  }
};

export const setDeliverabilityDomainConfigDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_DELIVERABILITY_DOMAIN_DETAIL
    });
    const { data } = await DeliverabilityDomainAPI.getById(id);
    dispatch({
      type: SET_DELIVERABILITY_DOMAIN_DETAIL_DONE,
      payload: data[0]
    });
  } catch (error) {
    dispatch({
      type: SET_DELIVERABILITY_DOMAIN_DETAIL_FAIL,
      payload: error.response.data.error
    });
  }
};

export const updateDeliverabilityDomainConfig = (value, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DELIVERABILITY_DOMAIN
    });
    const { data } = await DeliverabilityDomainAPI.update(id, value);
    dispatch({
      type: UPDATE_DELIVERABILITY_DOMAIN_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERABILITY_DOMAIN_FAIL,
      payload: error.response.data.error
    });
  }
};

export const deleteDeliverabilityDomainConfig = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_DELIVERABILITY_DOMAIN
    });
    const { data } = await DeliverabilityDomainAPI.delete(id);
    dispatch({
      type: DELETE_DELIVERABILITY_DOMAIN_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: DELETE_DELIVERABILITY_DOMAIN_FAIL,
      payload: error.response.data.error
    });
  }
};

