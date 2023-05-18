import ListDefinitionAPI from 'src/axios/ListDefinitionAPI';
import AdminAPI from './../../axios/AdminAPI';
import {
  CREATE_LIST_DEFINITION,
  CREATE_LIST_DEFINITION_DONE,
  CREATE_LIST_DEFINITION_FAIL,
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
  UPDATE_LIST_DEFINITION_FAIL
} from './../constant/list.definition.constant';

export const setListDefinitionDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LIST_DEFINITION_DETAIL
    });
    const { data } = await ListDefinitionAPI.getListById(id);
    dispatch({
      type: SET_LIST_DEFINITION_DETAIL_DONE,
      payload: data[0]
    });
  } catch (error) {
    dispatch({
      type: SET_LIST_DEFINITION_DETAIL_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getListTemplate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_TEMPLATE
    });
    const { data } = await ListDefinitionAPI.getListTemplate(id);
    dispatch({
      type: GET_LIST_TEMPLATE_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_TEMPLATE_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getListTemplateCountry = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_TEMPLATE_COUNTRY
    });
    const { data } = await ListDefinitionAPI.getListTemplateCountry(id);
    dispatch({
      type: GET_LIST_TEMPLATE_COUNTRY_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_TEMPLATE_COUNTRY_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getListDatabase = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_DATABASE
    });
    const { data } = await ListDefinitionAPI.getListDatabase();
    dispatch({
      type: GET_LIST_DATABASE_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_DATABASE_FAIL,
      payload: error.response.data.error
    });
  }
};

export const updateListDefinition = (value) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_LIST_DEFINITION
    });
    const { data } = await AdminAPI.update(value);
    dispatch({
      type: UPDATE_LIST_DEFINITION_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const createListDefinition = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_LIST_DEFINITION
    });
    const { data } = await ListDefinitionAPI.createListDefinition(value);
    dispatch({
      type: CREATE_LIST_DEFINITION_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: CREATE_LIST_DEFINITION_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getListTemplateWithoutPublishserId = (value) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_TEMPLATE
    });
    const { data } = await AdminAPI.get(value);
    dispatch({
      type: GET_LIST_TEMPLATE_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_TEMPLATE_FAIL,
      payload: error.response.data.error
    });
  }
};