import { combineReducers } from 'redux';
import GlobalHeaderActionTypes from 'src/shared/actions/globalHeaderActionTypes';
import {
  EDIT_SHOW_EDIT_TEXT,
  EDIT_SHOW_CANCEL_TEXT,
  LOGIN_SHOW_SHORT_TEXT,
  LOGIN_SHOW_LONG_TEXT,
  HIDDEN
} from 'src/shared/constants/globalHeaderButtonStates';

const {
  GLOBAL_HEADER__SHOW_EDIT_BUTTON,
  GLOBAL_HEADER__SHOW_CANCEL_BUTTON,
  GLOBAL_HEADER__CLICK_EDIT_BUTTON,
  GLOBAL_HEADER__CLICK_CANCEL_BUTTON,
  GLOBAL_HEADER__HIDE_GLOBAL_HEADER,
  GLOBAL_HEADER__SHOW_ONLY_LOGIN,
  GLOBAL_HEADER__HIDE_BUTTON,
  GLOBAL_HEADER__RESET_GLOBAL_HEADER
} = GlobalHeaderActionTypes;

const buttonState = (state = LOGIN_SHOW_LONG_TEXT, action = {}) => {
  switch (action.type) {
    case GLOBAL_HEADER__SHOW_EDIT_BUTTON:
    case GLOBAL_HEADER__CLICK_CANCEL_BUTTON:
      return EDIT_SHOW_EDIT_TEXT;
    case GLOBAL_HEADER__SHOW_CANCEL_BUTTON:
    case GLOBAL_HEADER__CLICK_EDIT_BUTTON:
      return EDIT_SHOW_CANCEL_TEXT;
    case GLOBAL_HEADER__HIDE_BUTTON:
      return HIDDEN;
    case GLOBAL_HEADER__SHOW_ONLY_LOGIN:
      return LOGIN_SHOW_SHORT_TEXT;
    case GLOBAL_HEADER__RESET_GLOBAL_HEADER:
      return LOGIN_SHOW_LONG_TEXT;
    default:
      return state;
  }
};

const showGlobalHeader = (state = true, action = {}) => {
  switch (action.type) {
    case GLOBAL_HEADER__HIDE_GLOBAL_HEADER:
      return false;
    case GLOBAL_HEADER__RESET_GLOBAL_HEADER:
      return true;
    default:
      return state;
  }
};

const editMode = (state = false, action = {}) => {
  switch (action.type) {
    case GLOBAL_HEADER__CLICK_EDIT_BUTTON:
    case GLOBAL_HEADER__SHOW_CANCEL_BUTTON:
      return true;
    case GLOBAL_HEADER__CLICK_CANCEL_BUTTON:
    case GLOBAL_HEADER__SHOW_EDIT_BUTTON:
    case GLOBAL_HEADER__HIDE_BUTTON:
    case GLOBAL_HEADER__RESET_GLOBAL_HEADER:
      return false;
    default:
      return state;
  }
};

const globalHeaderReducer = combineReducers({
  buttonState,
  showGlobalHeader,
  editMode
});

export default globalHeaderReducer;
