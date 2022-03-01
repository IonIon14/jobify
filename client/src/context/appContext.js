import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  AUTH_USER_BEGIN,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './actions';
import reducer from './reducer';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const location = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: location || '',
  jobLocation: location || '',
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Axios - Setup Instance

  axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR!');
      }
      return Promise.reject(error);
    }
  );

  const displayErrorAlert = () => {
    dispatch({ type: DISPLAY_ALERT.failed });
    clearAlert();
  };

  const displaySuccessAlert = () => {
    dispatch({ type: DISPLAY_ALERT.success });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const authUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: AUTH_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });

      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: AUTH_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser, alertText) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayErrorAlert,
        displaySuccessAlert,
        authUser,
        logoutUser,
        toggleSidebar,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
