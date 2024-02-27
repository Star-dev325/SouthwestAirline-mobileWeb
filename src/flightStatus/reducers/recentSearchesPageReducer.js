import { combineReducers } from 'redux';
import _ from 'lodash';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';

const { FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS } = flightStatusActionTypes;

const searches = (state = [], action = {}) => {
  switch (action.type) {
    case FLIGHT_STATUS__SAVE_RECENT_SEARCH_REQUESTS: {
      return _.cloneDeep(action.searches);
    }
    default:
      return state;
  }
};

export default combineReducers({ searches });
