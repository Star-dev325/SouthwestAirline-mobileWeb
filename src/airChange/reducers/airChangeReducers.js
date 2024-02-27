import _ from 'lodash';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import sharedActionTypes from 'src/shared/actions/sharedActionTypes';

const {
  AIR_CHANGE__SAVE_CONTACT_INFORMATION,
  AIR_CHANGE__UPDATE_CONTACT_METHOD,
  AIR_CHANGE__SAVE_PAYMENT_INFO,
  AIR_CHANGE__RESET_PAYMENT_INFO,
  AIR_CHANGE__FETCH_PAYMENT_OPTIONS_SUCCESS,
  AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS,
  AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD,
  AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS
} = airChangeActionTypes;

const {
  SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS,
  SHARED__CALC_FUNDS_SUCCESS,
  SHARED__REMOVE_TRAVEL_FUND_SUCCESS,
  SHARED__RESET_CALCULATE_FLOW_DATA
} = sharedActionTypes;

export const contactMethodInfo = (state, action) => {
  state = state || {};

  switch (action.type) {
    case AIR_CHANGE__UPDATE_CONTACT_METHOD:
    case AIR_CHANGE__SAVE_CONTACT_INFORMATION:
      return action.contactMethodInfo;
    default:
      return state;
  }
};

export const paymentInfo = (state, action) => {
  state = state || {};

  switch (action.type) {
    case AIR_CHANGE__FETCH_PAYMENT_OPTIONS_SUCCESS: {
      return {};
    }
    case AIR_CHANGE__SAVE_PAYMENT_INFO: {
      return action.paymentInfo;
    }
    case AIR_CHANGE__RESET_PAYMENT_INFO: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const accountInfo = (state, action) => {
  state = state || {};

  switch (action.type) {
    case AIR_CHANGE__FETCH_PASSENGER_INFO_SUCCESS: {
      return action.response;
    }
    default:
      return state;
  }
};

export const shouldForbidForward = (state, action) => {
  state = state || false;

  switch (action.type) {
    case AIR_CHANGE__UPDATE_SHOULD_FORBID_FORWARD: {
      return action.shouldForbidForward;
    }
    default:
      return state;
  }
};

export const fundsAppliedToken = (state, action) => {
  state = state || null;

  switch (action.type) {
    case SHARED__RESET_CALCULATE_FLOW_DATA:
      return null;
    case SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS:
    case SHARED__CALC_FUNDS_SUCCESS:
    case SHARED__REMOVE_TRAVEL_FUND_SUCCESS:
      return action.response.fundsAppliedToken;
    case AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS: {
      return _.get(action, 'response.changePricingPage._links.calculateFunds.body.fundsAppliedToken', null);
    }
    default:
      return state;
  }
};
