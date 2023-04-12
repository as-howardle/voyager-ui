import PublisherAPI from './../../axios/PublisherAPI';
import {
  CREATE_PUBLISHER,
  CREATE_PUBLISHER_DONE,
  CREATE_PUBLISHER_FAIL,
  LIST_PUBLISHER,
  LIST_PUBLISHER_DONE,
  LIST_PUBLISHER_FAIL,
  SET_PUBLISHER_DETAIL,
  SET_PUBLISHER_DETAIL_DONE,
  SET_PUBLISHER_DETAIL_FAIL,
  UPDATE_PUBLISHER,
  UPDATE_PUBLISHER_DONE,
  UPDATE_PUBLISHER_FAIL
} from './../constant/publisher.constant';

export const getPublisherList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_PUBLISHER
    });
    const { data } = await PublisherAPI.getList();
    dispatch({
      type: LIST_PUBLISHER_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_PUBLISHER_FAIL,
      payload: error.response.data.error
    });
  }
};

export const createPublisher = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PUBLISHER
    });
    const { data } = await PublisherAPI.create(value);
    dispatch({
      type: CREATE_PUBLISHER_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: CREATE_PUBLISHER_FAIL,
      payload: error.response.data.error
    });
  }
};

export const setPublisherDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_PUBLISHER_DETAIL
    });
    const { data } = await PublisherAPI.getPublisherWithId(id);
    dispatch({
      type: SET_PUBLISHER_DETAIL_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SET_PUBLISHER_DETAIL_FAIL,
      payload: error.response.data.error
    });
  }
};

export const updatePublisher = (value, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PUBLISHER
    });
    const { data } = await PublisherAPI.update(value, id);
    dispatch({
      type: UPDATE_PUBLISHER_DONE,
      payload: data.message
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PUBLISHER_FAIL,
      payload: error.response.data.error
    });
  }
};
