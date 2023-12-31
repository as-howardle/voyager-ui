import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import AuthAPI from './../axios/AuthAPI';
import UserStore from './../store/user.store';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAIL: 'CHANGE_PASSWORD_FAIL'
};

const initialState = {
  // isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  success: false
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            // isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      user: null
    };
  },
  [HANDLERS.CHANGE_PASSWORD]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },
  [HANDLERS.CHANGE_PASSWORD_SUCCESS]: (state) => {
    return {
      ...state,
      isLoading: false,
      success: true
    };
  },
  [HANDLERS.CHANGE_PASSWORD_FAIL]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    const user = {};
    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: user
    });
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {
    try {
      const { data } = await AuthAPI.signIn(email, password);
      const now = new Date();
      const token = {
        value: data.token,
        expiry: now.getTime() + (1000 * 3600 * 24 * 7)
      };
      UserStore.setToken(token);
      const user = {
        id: data.id,
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: data.fullname,
        email: data.email,
        isAdmin: data.is_admin
      };
      UserStore.setUser(user);

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    } catch (error) {
      const { response } = error;
      throw new Error(response.data.message);
    }
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    UserStore.removeToken();
    UserStore.removeUser();
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  const setUser = (user) => {
    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: user
    });
  };

  const changePassword = async (oldPassword, newPassword) => {
    dispatch({
      type: HANDLERS.CHANGE_PASSWORD
    });
    try {
      const data = await AuthAPI.changePassword(oldPassword, newPassword);
      dispatch({
        type: HANDLERS.CHANGE_PASSWORD_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: HANDLERS.CHANGE_PASSWORD_FAIL,
        payload: error.response.data.message
      });

    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        setUser,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
