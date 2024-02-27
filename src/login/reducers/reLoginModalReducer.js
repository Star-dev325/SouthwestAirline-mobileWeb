import ReLoginActionTypes from 'src/login/actions/reLoginActionTypes';
import { combineReducers } from 'redux';

export const isActive = (state = false, action = {}) => {
  switch (action.type) {
    case ReLoginActionTypes.SHOW_RE_LOGIN_MODAL: {
      return true;
    }
    case ReLoginActionTypes.HIDE_RE_LOGIN_MODAL: {
      return false;
    }
    default:
      return state;
  }
};

export const isReLoginPointsBooking = (state = false, action = {}) => {
  switch (action.type) {
    case ReLoginActionTypes.IS_RE_LOGIN_POINTS_BOOKING: {
      return true;
    }
    default:
      return state;
  }
};

export const reLoginCallbackFunctions = (state = {}, action = {}) => {
  switch (action.type) {
    case ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS: {
      return action.reLoginCallbackFunctions || state;
    }
    default:
      return state;
  }
};

export const reLoginModalOptions = (state = {}, action = {}) => {
  switch (action.type) {
    case ReLoginActionTypes.SHOW_RE_LOGIN_MODAL: {
      return action.reLoginModalOptions || state;
    }
    default:
      return state;
  }
};

export const reLoginLocation = (state = '', action = {}) => {
  switch (action.type) {
    case ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS: {
      return action.reLoginLocation;
    }
    default:
      return state;
  }
};

export const retryFunctions = (state = [], action = {}) => {
  switch (action.type) {
    case ReLoginActionTypes.RETRY_FUNCTIONS:
    case ReLoginActionTypes.SHOW_RE_LOGIN_MODAL: {
      return action.retryFunction ? [...state, action.retryFunction] : [];
    }
    default:
      return state;
  }
};

const reLoginModalReducers = combineReducers({
  isActive,
  isReLoginPointsBooking,
  reLoginCallbackFunctions,
  reLoginModalOptions,
  reLoginLocation,
  retryFunctions
});

export default reLoginModalReducers;
