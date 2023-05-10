import {
  VERIFY_EMAIL,
  VERIFY_EMAIL_DONE,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_RESET
} from '../constant/verify.emai.constant';

export const VerifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_EMAIL:
      return { ...state, isLoading: true, success: false, error: false };
    case VERIFY_EMAIL_DONE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        message: action.message,
        emails: action.payload
      };
    case VERIFY_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
        success: false,
        message: action.message,
        emails: []
      };
    case VERIFY_EMAIL_RESET:
      return { ...state, isLoading: false, success: false, error: false, message: '' };
    default:
      return state;
  }
};