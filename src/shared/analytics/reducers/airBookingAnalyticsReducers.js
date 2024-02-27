import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';

const defaultSortBy = {
  outbound: 'departureTime',
  inbound: 'departureTime'
};

const sortByReducer = (state = defaultSortBy, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY: {
      const { direction, sortBy } = action;

      return {
        ...state,
        [direction]: sortBy
      };
    }
    case AirBookingActionTypes.AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE: {
      return defaultSortBy;
    }
    default:
      return state;
  }
};

const isChaseBannerShownReducer = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS: {
      const isEligibleForDisplayingChaseBanner = _.get(action, 'response.isEligibleForDisplayingChaseBanner', false);

      const {
        response: { results }
      } = action;

      return isEligibleForDisplayingChaseBanner && !!results;
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED: {
      return false;
    }
    default:
      return state;
  }
};

const isChaseFlowCompletedReducer = (state = false, action = {}) => {
  switch (action.type) {
    case ChaseActionTypes.CHASE__UPDATE_CHASE_FLOW_COMPLETED: {
      return action.isChaseFlowCompleted;
    }
    default:
      return state;
  }
};

const isCalendarStripReducer = (state = false, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__CALENDAR_STRIP: {
      return  action.isCalendarStrip;
    }
    default:
      return state;
  }
};

export default combineReducers({
  sortBy: sortByReducer,
  isChaseBannerShown: isChaseBannerShownReducer,
  isChaseFlowCompleted: isChaseFlowCompletedReducer,
  isCalendarStrip: isCalendarStripReducer
});
