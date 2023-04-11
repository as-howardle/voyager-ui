import PublisherAPI from './../../axios/PublisherAPI';
import {
  CREATE_PUBLISHER,
  CREATE_PUBLISHER_DONE,
  CREATE_PUBLISHER_FAIL,
  LIST_PUBLISHER,
  LIST_PUBLISHER_DONE,
  LIST_PUBLISHER_FAIL
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
      payload: data.message
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
    console.log(error);
    dispatch({
      type: CREATE_PUBLISHER_FAIL,
      payload: error.response.data.error
    });
  }
};