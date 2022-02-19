import React, { useState, useReducer, useContext } from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';
import reducer from './reducer';
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayErrorAlert = () => {
    dispatch({ type: DISPLAY_ALERT.failed });
    clearAlert();
  };

  const displaySuccessAlert = () => {
    dispatch({ type: DISPLAY_ALERT.success });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 2000);
  };

  return (
    <AppContext.Provider
      value={{ ...state, displayErrorAlert, displaySuccessAlert }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
//shortcut to make reusable app context on each component multiple times

export { AppProvider, useAppContext, initialState };
