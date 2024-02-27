import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE: {
      return {};
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const flightConfirmationPageReducers = combineReducers({ response });

export default flightConfirmationPageReducers;
