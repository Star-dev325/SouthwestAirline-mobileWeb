import { combineReducers } from 'redux';
import _ from 'lodash';
import CarBookingActionTypes from 'src/carBooking/actions/carBookingActionTypes';
import findCarsReducer from 'src/carBooking/reducers/findCarsReducer';
import carPricing from 'src/carBooking/reducers/carPricingReducer';
import { userInfo } from 'src/carBooking/reducers/userAccountInfo';

const {
  CAR_BOOKING__RESET_FLOW_DATA,
  CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS,
  CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS,
  CAR_BOOKING__BOOK_CAR_SUCCESS,
  CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST,
  CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS,
  CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS_SUCCESS
} = CarBookingActionTypes;

const carLocations = (state = [], action = {}) => {
  switch (action.type) {
    case CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS: {
      const { locations = [] } = action.response || {};

      return _.cloneDeep(locations);
    }
    default:
      return state;
  }
};

const carVendors = (state = [], action = {}) => {
  switch (action.type) {
    case CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.vendors', []));
    }
    default:
      return state;
  }
};

const confirmationResponse = (state = {}, action = {}) => {
  switch (action.type) {
    case CAR_BOOKING__BOOK_CAR_SUCCESS: {
      return { response: _.cloneDeep(_.get(action, 'response')) };
    }
    default:
      return state;
  }
};

const selectedSearchRequest = (state = null, action = {}) => {
  switch (action.type) {
    case CAR_BOOKING__SAVE_SELECTED_RECENT_SEARCH_REQUEST: {
      return _.cloneDeep(_.get(action, 'searchRequest'));
    }
    default:
      return state;
  }
};

const recentSearchRequests = (state = [], action = {}) => {
  switch (action.type) {
    case CAR_BOOKING__SAVE_RECENT_SEARCH_REQUESTS: {
      return _.cloneDeep(_.get(action, 'searchRequests'));
    }
    default:
      return state;
  }
};

const carVendorTermsAndConditions = (state = [], action = {}) => {
  switch (action.type) {
    case CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response'));
    }
    default:
      return state;
  }
};

const carBookingReducers = combineReducers({
  carLocations,
  carVendors,
  userInfo,
  carShoppingResultsPage: findCarsReducer,
  carPricingPage: carPricing,
  carBookingConfirmationPage: confirmationResponse,
  selectedSearchRequest,
  recentSearchRequests,
  carVendorTermsAndConditions
});

const _matchesRecentSearches = (key) => key === 'recentSearchRequests';

const resetAllStateExcept = (state) =>
  _.mapValues(state, (value, key) => (_matchesRecentSearches(key) ? value : undefined));

const carBooking = (state = {}, action = {}) => {
  if (action.type === CAR_BOOKING__RESET_FLOW_DATA) {
    return carBookingReducers(resetAllStateExcept(state), action);
  }

  return carBookingReducers(state, action);
};

export default carBooking;
