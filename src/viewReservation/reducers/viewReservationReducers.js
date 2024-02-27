import _ from 'lodash';

import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import CarCancelActionTypes from 'src/carCancel/actions/carCancelActionTypes';

export const recentTripSearches = (state = [], action = {}) => {
  switch (action.type) {
    case SharedActionTypes.SHARED__FETCH_RECENT_TRIP_SEARCHES_SUCCESS: {
      const {
        payload: { featureName, recentTripSearches: recentTripSearchesFromAction }
      } = action;

      return featureName === 'viewReservation' ? _.cloneDeep(recentTripSearchesFromAction) : state;
    }
    default: {
      return state;
    }
  }
};

export const carReservation = (state = {}, action = {}) => {
  switch (action.type) {
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case ViewReservationActionTypes.VIEW_RESERVATION__SAVE_CAR_RESERVATION: {
      return _.cloneDeep(action.reservation);
    }
    default: {
      return state;
    }
  }
};

export const flightReservation = (state = {}, action = {}) => {
  switch (action.type) {
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    case ViewReservationActionTypes.VIEW_RESERVATION__CLEAR_FLIGHT_RESERVATION: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const dayOfTravelContactInfo = (state = {}, action = {}) => {
  switch (action.type) {
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO: {
      return {};
    }
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_DAY_OF_TRAVEL_CONTACT_INFO_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default: {
      return state;
    }
  }
};

export const searchRequest = (state = {}, action = {}) => {
  switch (action.type) {
    case ViewReservationActionTypes.VIEW_RESERVATION__SAVE_SEARCH_REQUEST: {
      return _.cloneDeep(action.searchRequest);
    }
    default: {
      return state;
    }
  }
};

export const carCanceled = (state = false, action = {}) => {
  switch (action.type) {
    case CarCancelActionTypes.CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION_SUCCESS: {
      return true;
    }
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_CAR_RESERVATION_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export const viewForSameDayPage = (state = {}, action = {}) => {
  switch (action.type) {
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO: {
      return {};
    }
    case ViewReservationActionTypes.VIEW_RESERVATION__FETCH_SAME_DAY_BOUND_INFO_SUCCESS: {
      return action.response;
    }
    default: {
      return state;
    }
  }
};
