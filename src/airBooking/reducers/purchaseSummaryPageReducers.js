import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import {
  generatePassengers,
  generatePriceTotal,
  getReviewMessages,
  generateTripSummary
} from 'src/airBooking/helpers/purchaseSummaryPageHelper';

const tripSummary = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE: {
      return generateTripSummary(action.flightPricingPageResponse);
    }
    default:
      return state;
  }
};

const passengers = (state = [], action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE: {
      return generatePassengers(action.passengerInfos);
    }
    default:
      return state;
  }
};

const priceTotal = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE: {
      return generatePriceTotal(action.flightPricingPageResponse);
    }
    default:
      return state;
  }
};

const reviewMessages = (state = {}, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE: {
      return getReviewMessages(action.flightPricingPageResponse);
    }
    default:
      return state;
  }
};

const earlyBirdEligibility = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO: {
      return null;
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS: {
      return _.cloneDeep(action.response.earlyBirdEligibility);
    }
    default:
      return state;
  }
};

const travelFundsAddress = (state = null, action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__SAVE_TRAVEL_FUNDS_ADDRESS: {
      return _.cloneDeep(action.travelFundsAddress);
    }
    default:
      return state;
  }
};

const purchaseSummaryPageReducers = combineReducers({
  earlyBirdEligibility,
  passengers,
  priceTotal,
  reviewMessages,
  travelFundsAddress,
  tripSummary
});

export default purchaseSummaryPageReducers;
