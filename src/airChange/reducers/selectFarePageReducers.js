import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { getUpdatedSelectedFlightDetails } from 'src/shared/helpers/flightSegmentHelper';

const { AIR_CHANGE__SAVE_SELECTED_FLIGHT } = airChangeActionTypes;

export const selectedFlight = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SAVE_SELECTED_FLIGHT: {
      return getUpdatedSelectedFlightDetails(action.selectedFlight, state);
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  selectedFlight
});
