import GeneralAPI from '../../axios/GeneralAPI';
import {
  LIST_COUNTRY,
  LIST_COUNTRY_DONE,
  LIST_COUNTRY_FAIL,
  LIST_LANGUAGE,
  LIST_LANGUAGE_DONE,
  LIST_LANGUAGE_FAIL,
  LIST_PROVIDER,
  LIST_PROVIDER_DOMAIN,
  LIST_PROVIDER_DOMAIN_DONE,
  LIST_PROVIDER_DOMAIN_FAIL,
  LIST_PROVIDER_DONE,
  LIST_PROVIDER_FAIL,
  LIST_SALE_MANAGER,
  LIST_SALE_MANAGER_DONE,
  LIST_SALE_MANAGER_FAIL
} from '../constant/general.constants';

export const getCountryList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_COUNTRY
    });
    const { data } = await GeneralAPI.getCountryList();
    dispatch({
      type: LIST_COUNTRY_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_COUNTRY_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getLanguageList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_LANGUAGE
    });
    const { data } = await GeneralAPI.getLanguageList();
    dispatch({
      type: LIST_LANGUAGE_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_LANGUAGE_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getSaleManagerList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_SALE_MANAGER
    });
    const { data } = await GeneralAPI.getSaleManagerList();
    dispatch({
      type: LIST_SALE_MANAGER_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_SALE_MANAGER_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getProviderList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_PROVIDER
    });
    const { data } = await GeneralAPI.getProviderList();
    dispatch({
      type: LIST_PROVIDER_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_PROVIDER_FAIL,
      payload: error.response.data.error
    });
  }
};

export const getProviderDomainList = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_PROVIDER_DOMAIN
    });
    const { data } = await GeneralAPI.getProviderDomainList();
    dispatch({
      type: LIST_PROVIDER_DOMAIN_DONE,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_PROVIDER_DOMAIN_FAIL,
      payload: error.response.data.error
    });
  }
};