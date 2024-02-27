import _ from 'lodash';
import { combineReducers } from 'redux';

import { applyTravelFunds } from 'src/shared/reducers/applyTravelFundsReducers';

import CompanionActionTypes from 'src/companion/actions/companionActionTypes';
import * as contactMethodPageHelper from 'src/shared/helpers/contactMethodPageHelper';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';

const {
  COMPANION__FETCH_PAYMENT_PAGE_SUCCESS,
  COMPANION__FETCH_PRICING_PAGE_SUCCESS,
  COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS,
  COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
  COMPANION__PREFILL_PASSENGER_INFO,
  COMPANION__UPDATE_PASSENGER_INFO,
  COMPANION__UPDATE_CONTACT_METHOD,
  COMPANION__RESET_CONTACT_METHOD,
  COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__RESET_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
  COMPANION__UPDATE_SPECIAL_ASSISTANCE,
  COMPANION__RESET_SPECIAL_ASSISTANCE,
  COMPANION__SAVE_TRAVEL_FUNDS_ADDRESS
} = CompanionActionTypes;

export const flightPricingPage = (state = null, action = {}) => {
  switch (action.type) {
    case COMPANION__FETCH_PRICING_PAGE_SUCCESS: {
      return action.response;
    }
    default:
      return state;
  }
};

export const companionPassengerPage = (state = {}, action = {}) => {
  switch (action.type) {
    case COMPANION__FETCH_COMPANION_INFORMATION_SUCCESS: {
      const formData = _.pick(action.response.companionDetailsPage, [
        'emailReceiptTo',
        'knownTravelerNumber',
        'redressNumber'
      ]);

      return { ...state, formData, response: action.response };
    }
    case COMPANION__UPDATE_PASSENGER_INFO: {
      return { ...state, formData: action.formData };
    }
    default:
      return state;
  }
};

export const companionConfirmationPage = (state = null, action = {}) => {
  switch (action.type) {
    case COMPANION__FETCH_CONFIRMATION_PAGE_SUCCESS: {
      return {
        ...action.response.flightConfirmationPage
      };
    }
    default:
      return state;
  }
};

export const isInternationalBooking = (state = false, action = {}) => {
  switch (action.type) {
    case COMPANION__SET_INTERNATIONAL_BOOKING_FLAG: {
      return contactMethodPageHelper.isInternationalBookingHelper(action);
    }
    default:
      return state;
  }
};

export const companionPaymentPage = (state = null, action = {}) => {
  switch (action.type) {
    case COMPANION__FETCH_PAYMENT_PAGE_SUCCESS: {
      return action.response;
    }
    default:
      return state;
  }
};

export const contactMethodInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case COMPANION__UPDATE_CONTACT_METHOD:
      return action.info;
    case COMPANION__PREFILL_PASSENGER_INFO: {
      const {
        response: { companionDetailsPage },
        isInternationalBooking: getIsInternationalBooking
      } = action;

      return contactMethodPageHelper.prefillPassengerInfoHelper(companionDetailsPage, getIsInternationalBooking);
    }
    case COMPANION__RESET_CONTACT_METHOD: {
      return {};
    }
    default:
      return state;
  }
};

export const paymentInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case COMPANION__SAVE_PAYMENT_INFO: {
      return _.cloneDeep(action.paymentInfo);
    }
    case CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS:
    case CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS:
    case COMPANION__RESET_PAYMENT_INFO: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const earlyBirdEligibility = (state = null, action = {}) => {
  switch (action.type) {
    case COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO: {
      return null;
    }
    case COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS: {
      return { ...action.response.earlyBirdEligibility };
    }
    default:
      return state;
  }
};

export const specialAssistance = (state = null, action = {}) => {
  switch (action.type) {
    case COMPANION__UPDATE_SPECIAL_ASSISTANCE: {
      return _.cloneDeep(action.specialAssistanceFormData);
    }
    case COMPANION__RESET_SPECIAL_ASSISTANCE: {
      return null;
    }
    default:
      return state;
  }
};

export const travelFundsAddress = (state = {}, action = {}) => {
  switch (action.type) {
    case COMPANION__SAVE_TRAVEL_FUNDS_ADDRESS: {
      return _.cloneDeep(action.travelFundsAddress);
    }
    default: {
      return state;
    }
  }
};

const companionReducers = combineReducers({
  flightPricingPage,
  companionPassengerPage,
  isInternationalBooking,
  contactMethodInfo,
  companionPaymentPage,
  paymentInfo,
  earlyBirdEligibility,
  companionConfirmationPage,
  specialAssistance,
  applyTravelFundsPage: applyTravelFunds,
  travelFundsAddress
});

export default companionReducers;
