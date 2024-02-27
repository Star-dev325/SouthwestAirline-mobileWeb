import { combineReducers } from 'redux';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';
import flightSchedulesPageReducer from 'src/flightStatus/reducers/flightSchedulesPageReducer';
import flightStatusDetailsPageReducer from 'src/flightStatus/reducers/flightStatusDetailsPageReducer';
import flightStatusRecentSearchesPageReducer from 'src/flightStatus/reducers/recentSearchesPageReducer';
import { selectedRecentSearchRequest } from 'src/flightStatus/reducers/selectedRecentSearchRequestReducer';
import _ from 'lodash';

const { FLIGHT_STATUS__RESET_FLOW_DATA } = flightStatusActionTypes;

const flightStatusReducers = combineReducers({
  flightSchedulesPage: flightSchedulesPageReducer,
  flightStatusDetailsPage: flightStatusDetailsPageReducer,
  flightStatusRecentPage: flightStatusRecentSearchesPageReducer,
  selectedRecentSearchRequest
});

const _matchesRecentSearches = (key) => key === 'flightStatusRecentPage';

const resetAllStateExcept = (state) =>
  _.mapValues(state, (value, key) => (_matchesRecentSearches(key) ? value : undefined));

const flightStatus = (state, action) => {
  if (action.type === FLIGHT_STATUS__RESET_FLOW_DATA) {
    return flightStatusReducers(resetAllStateExcept(state), action);
  }

  return flightStatusReducers(state, action);
};

export default flightStatus;
