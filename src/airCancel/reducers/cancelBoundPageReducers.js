import { combineReducers } from 'redux';
import _ from 'lodash';
import airCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const {
  AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS,
  AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS
} = airCancelActionTypes;

const response = (state = null, action = {}) => {
  switch (action.type) {
    case AIR_CANCEL__FETCH_RESERVATION_FOR_CANCEL_BOUND_SUCCESS:
    case AIR_CANCEL__FETCH_SPLIT_PNR_RESERVATION_FOR_CANCEL_SUCCESS: {
      return _.get(action, 'response.viewForCancelBoundPage');
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ response });
