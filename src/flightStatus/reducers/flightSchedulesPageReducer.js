import _ from 'lodash';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import { combineReducers } from 'redux';

const { FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS } = flightStatusActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case FLIGHT_STATUS__FETCH_SEARCH_FLIGHT_STATUS_SUCCESS: {
      return _.cloneDeep(action.response.flightSchedulesPage);
    }
    default:
      return state;
  }
};

export default combineReducers({ response });
