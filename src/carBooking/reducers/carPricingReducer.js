import { combineReducers } from 'redux';
import _ from 'lodash';
import CarBookingActionTypes from 'src/carBooking/actions/carBookingActionTypes';

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__FETCH_CAR_PRICING_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const selectedCar = (state = {}, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_SELECTED_CAR: {
      return _.cloneDeep(action.selectedCar);
    }
    default:
      return state;
  }
};

const carReservation = (state = {}, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_CAR_RESERVATION: {
      return _.cloneDeep(action.carReservation);
    }
    default:
      return state;
  }
};

const selectedExtras = (state = [], action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_SELECTED_EXTRAS: {
      return _.cloneDeep(action.selectedExtras);
    }
    default:
      return state;
  }
};

export default combineReducers({
  response,
  selectedCar,
  carReservation,
  selectedExtras
});
