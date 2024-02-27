import { combineReducers } from 'redux';
import _ from 'lodash';
import CarBookingActionTypes from 'src/carBooking/actions/carBookingActionTypes';

const defaultDriverInfo = null;

const driverInfo = (state = defaultDriverInfo, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_USER_ACCOUNT_DRIVER_INFO: {
      return _.cloneDeep(_.get(action, 'driverInfo', defaultDriverInfo));
    }
    default:
      return state;
  }
};

const defaultContactInfo = null;

const contactInfo = (state = defaultContactInfo, action = {}) => {
  switch (action.type) {
    case CarBookingActionTypes.CAR_BOOKING__SAVE_USER_ACCOUNT_CONTACT_INFO: {
      return _.cloneDeep(_.get(action, 'contactInfo', defaultContactInfo));
    }
    default:
      return state;
  }
};

export const userInfo = combineReducers({
  driverInfo,
  contactInfo
});
