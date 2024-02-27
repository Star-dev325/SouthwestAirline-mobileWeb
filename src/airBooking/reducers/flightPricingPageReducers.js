import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE: {
      return action.request ? state : {};
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case ChaseActionTypes.CHASE__RESET_CHASE_TEMPORARY_CARD: {
      return _.merge({}, state, {
        flightPricingPage: {
          _meta: {
            chase: null
          }
        }
      });
    }
    default:
      return state;
  }
};

const resumeAfterLogin = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_RESUME_AFTER_LOGIN:
      return action.shouldResume;
    default:
      return state;
  }
};

const hasUpsellError = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FLIGHT_PRICING_SET_HAS_UPSELL_ERROR:
      return action.hasUpsellError;
    default:
      return state;
  }
};

const flightPricingPageReducers = combineReducers({ response, resumeAfterLogin, hasUpsellError });

export default flightPricingPageReducers;
