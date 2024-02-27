import { combineReducers } from 'redux';
import _ from 'lodash';
import CarBookingActionTypes from 'src/carBooking/actions/carBookingActionTypes';

const searchRequest = (state = null, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_FETCH_CARS_REQUEST: {
      return _.cloneDeep(action.request);
    }
    default:
      return state;
  }
};

const carResults = (state = null, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_CAR_RESULTS: {
      return _.cloneDeep(action.carResults);
    }
    default:
      return state;
  }
};

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__FETCH_CARS_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const findCarsReducer = combineReducers({
  searchRequest,
  carResults,
  response
});

export default findCarsReducer;
