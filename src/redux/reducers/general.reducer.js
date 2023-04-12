import {
  LIST_COUNTRY,
  LIST_COUNTRY_DONE,
  LIST_COUNTRY_FAIL,
  LIST_LANGUAGE,
  LIST_LANGUAGE_DONE,
  LIST_LANGUAGE_FAIL,
  LIST_SALE_MANAGER,
  LIST_SALE_MANAGER_DONE,
  LIST_SALE_MANAGER_FAIL
} from '../constant/general.constants';

export const CountryListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_COUNTRY:
      return { ...state, isLoading: true };
    case LIST_COUNTRY_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_COUNTRY_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const LanguageListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_LANGUAGE:
      return { ...state, isLoading: true };
    case LIST_LANGUAGE_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_LANGUAGE_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const SaleManagerListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_SALE_MANAGER:
      return { ...state, isLoading: true };
    case LIST_SALE_MANAGER_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_SALE_MANAGER_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};