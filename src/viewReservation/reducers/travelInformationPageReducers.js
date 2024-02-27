import { combineReducers } from 'redux';
import _ from 'lodash';

import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import MyAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const {
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION,
  VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION,
  VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS,
  VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS,
  VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS
} = ViewReservationActionTypes;
const { MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS } = MyAccountActionTypes;
const { VIEW_TAB } = AnalyticsActionTypes;

const response = (state, action) => {
  state = state || null;

  switch (action.type) {
    case VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION: {
      return null;
    }
    case VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default: {
      return state;
    }
  }
};

const saveTravelInformationRequest = (state, action) => {
  state = state || {};

  switch (action.type) {
    case VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS: {
      return action.saveTravelInformationRequest ? _.cloneDeep(action.saveTravelInformationRequest) : {};
    }
    default: {
      return state;
    }
  }
};

const isInternational = (state, action) => {
  state = state || false;

  switch (action.type) {
    case VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION: {
      return false;
    }
    case VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS: {
      return _.get(action, 'response.isInternational', false);
    }
    default: {
      return state;
    }
  }
};

const isCheckedIn = (state, action) => {
  state = state || false;

  switch (action.type) {
    case VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION: {
      return false;
    }
    case VIEW_RESERVATION__FETCH_FLIGHT_RESERVATION_SUCCESS: {
      return _.get(action, 'response.isCheckedIn', false);
    }
    default: {
      return state;
    }
  }
};

export const ANALYTICS_DEFAULT = {
  origName: null,
  changedName: null
};
const getNameFields = (names) => _.pick(names, ['firstName', 'middleName', 'lastName']);

const analytics = (state, action) => {
  state = state || ANALYTICS_DEFAULT;

  switch (action.type) {
    case VIEW_RESERVATION__FETCH_TRAVEL_INFORMATION_SUCCESS: {
      return {
        ...ANALYTICS_DEFAULT,
        origName: _.cloneDeep(getNameFields(_.get(action, 'response.editPNRPassengerPage.passengerDetails.name')))
      };
    }
    case VIEW_RESERVATION__UPDATE_TRAVEL_INFORMATION_SUCCESS: {
      const changedName = _.cloneDeep(_.get(action, 'response.newName'));
      const newState = changedName
        ? {
          ...state,
          changedName
        }
        : state;

      return newState;
    }
    case MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS:
    case VIEW_TAB: {
      return ANALYTICS_DEFAULT;
    }
    default: {
      if (_.endsWith(action.type, 'RESET_FLOW_DATA')) {
        return ANALYTICS_DEFAULT;
      }

      return state;
    }
  }
};

const travelInformationPageReducers = combineReducers({
  response,
  isInternational,
  isCheckedIn,
  saveTravelInformationRequest,
  analytics
});

export default travelInformationPageReducers;
