import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT.failed) {
    return {
      ...state,
      showAlert: true,
      alertText: 'Please provide all values!',
      alertType: 'danger',
    };
  }

  if (action.type === DISPLAY_ALERT.success) {
    return {
      ...state,
      showAlert: true,
      alertText: 'Login Successfull!',
      alertType: 'success',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    };
  }

  throw new Error(`no such action:${action.type}`);
};

export default reducer;
