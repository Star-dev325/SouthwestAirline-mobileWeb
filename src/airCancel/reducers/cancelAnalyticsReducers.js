import { combineReducers } from 'redux';
import _ from 'lodash';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const {
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS,
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS
} = airCancelActionTypes;

const data = (state = null, action = {}) => {
  switch (action.type) {
    case AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_SUCCESS: {
      return _.get(action, 'response.viewCancelReservationPage.viewForCancelAnalytics', null);
    }
    case AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS: {
      return _.get(action, 'response.viewForCancelBoundPage._analytics', null);
    }
    case AIR_CANCEL__FETCH_REFUND_QUOTE_FOR_CANCEL_BOUND_SUCCESS: {
      return _.get(action, 'response.cancelRefundQuotePage._analytics', null);
    }
    case AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS: {
      return _.get(action, 'response.cancelBoundConfirmationPage._analytics', null);
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ data });
