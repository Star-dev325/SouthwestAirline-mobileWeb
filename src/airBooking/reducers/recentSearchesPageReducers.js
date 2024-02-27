import _ from 'lodash';
import { combineReducers } from 'redux';

import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const searches = (state = [], action = {}) => {
  switch (action.type) {
    case AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE: {
      return [];
    }
    case AirBookingActionTypes.AIR_BOOKING__FETCH_RECENT_SEARCH_PAGE_SUCCESS:
    case AirBookingActionTypes.AIR_BOOKING__DELETE_CURRENT_SEARCH_REQUEST: {
      return _.cloneDeep(action.searches);
    }
    default:
      return state;
  }
};

export default combineReducers({ searches });
