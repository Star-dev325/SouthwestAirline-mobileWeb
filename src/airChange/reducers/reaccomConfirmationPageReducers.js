import _ from 'lodash';
import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS, AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE } =
  airChangeActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.reaccomConfirmation', {}));
    }
    case AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE: {
      return {};
    }
    default:
      return state;
  }
};

export const reaccomConfirmationPage = combineReducers({ response });
