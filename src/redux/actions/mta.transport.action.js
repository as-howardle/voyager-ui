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
  UPDATE_MTA_TRANSPORT,
  UPDATE_MTA_TRANSPORT_DONE,
  UPDATE_MTA_TRANSPORT_FAIL
} from './../constant/mta.transport.constant';
import MTATransportAPI from './../../axios/MTATransportAPI';

export const listMTATranport = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MTA_TRANSPORT
    });
    const { data } = await MTATransportAPI.getList();
    dispatch({
      type: LIST_MTA_TRANSPORT_DONE,
      payload: data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LIST_MTA_TRANSPORT_FAIL,
      payload: 'error'
    });
  }
};

export const listMTATransportType = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MTA_TRANSPORT_TYPE
    });
    const { data } = await MTATransportAPI.getTransportType();
    dispatch({
      type: LIST_MTA_TRANSPORT_TYPE_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_MTA_TRANSPORT_TYPE_FAIL,
      payload: 'error'
    });
  }
};

export const createMTATransport = (value) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MTA_TRANSPORT
    });
    const { data } = await MTATransportAPI.createTransport(value);
    dispatch({
      type: CREATE_MTA_TRANSPORT_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CREATE_MTA_TRANSPORT_FAIL,
      payload: 'error'
    });
  }
};

export const updateMTATransport = (value, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MTA_TRANSPORT
    });
    const { data } = await MTATransportAPI.updateTransport(value, id);
    dispatch({
      type: UPDATE_MTA_TRANSPORT_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MTA_TRANSPORT_FAIL,
      payload: 'error'
    });
  }
};