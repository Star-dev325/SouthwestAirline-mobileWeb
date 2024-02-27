import _ from 'lodash';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import { combineReducers } from 'redux';

const { FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS, FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS } =
  flightStatusActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_DETAILS_SUCCESS:
    case FLIGHT_STATUS__LOOKUP_FLIGHT_DETAILS_SUCCESS: {
      return _.cloneDeep(action.response.flightStatusDetailsPage);
    }
    default:
      return state;
  }
};

export default combineReducers({ response });
