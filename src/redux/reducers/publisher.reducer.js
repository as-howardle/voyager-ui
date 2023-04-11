import {
  CREATE_PUBLISHER,
  CREATE_PUBLISHER_DONE,
  CREATE_PUBLISHER_FAIL,
  CREATE_PUBLISHER_RESET,
  LIST_PUBLISHER,
  LIST_PUBLISHER_DONE,
  LIST_PUBLISHER_FAIL
} from './../constant/publisher.constant';

export const PublisherListReducers = (state = {}, action) => {
  switch (action.type) {
    case LIST_PUBLISHER:
      return { ...state, isLoading: true };
    case LIST_PUBLISHER_DONE:
      return { isLoading: false, list: action.payload };
    case LIST_PUBLISHER_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const CreatePublisherReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PUBLISHER:
      return { ...state, isLoading: true, success: false, error: false };
    case CREATE_PUBLISHER_DONE:
      return { ...state, isLoading: false, success: true, message: action.payload, error: false };
    case CREATE_PUBLISHER_FAIL:
      return { ...state, isLoading: false, error: true, success: false, message: action.payload };
    case CREATE_PUBLISHER_RESET:
      return { isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};