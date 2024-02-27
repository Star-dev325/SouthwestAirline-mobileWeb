import { combineReducers } from 'redux';
import _ from 'lodash';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const { AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS } = airCancelActionTypes;

const response = (state = null, action = {}) => {
  switch (action.type) {
    case AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS: {
      return _.get(action, 'response.cancelBoundConfirmationPage');
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ response });
