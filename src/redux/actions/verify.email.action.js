import {
  VERIFY_EMAIL,
  VERIFY_EMAIL_DONE,
  VERIFY_EMAIL_FAIL
} from '../constant/verify.emai.constant';
import VerifyEmailAPI from '../../axios/VerifyEmailAPI';

export const verifyEmailAction = (value) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_EMAIL
    });
    const { data } = await VerifyEmailAPI.verify(value);
    dispatch({
      type: VERIFY_EMAIL_DONE,
      payload: data,
      message: 'Verify email successfully'
    });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAIL,
      message: error.response.data?.error || error.message || 'Error'
    });
  }
};