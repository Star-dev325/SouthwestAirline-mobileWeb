import { combineReducers } from 'redux';
import _ from 'lodash';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const { AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS } = airCancelActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS: {
      return _.get(action, 'response.cancelRefundQuotePage');
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ response });
