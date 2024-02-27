// @flow

import _ from 'lodash';
import AirportInfoActionTypes from 'src/airports/actions/airportInfoActionTypes';

const airportInfoReducer = (state: * = {}, action: * = {}) => {
  switch (action.type) {
    case AirportInfoActionTypes.AIRPORT_INFO__UPDATE_SELECTED_AIRPORT_INFO: {
      return _.merge({}, state, action.airportInfo);
    }
    case AirportInfoActionTypes.AIRPORT_INFO__RESET_SELECTED_AIRPORT_INFO: {
      return {};
    }
    default:
      return state;
  }
};

export default airportInfoReducer;
