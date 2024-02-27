import _ from 'lodash';
import flightStatusActionTypes from 'src/flightStatus/actions/flightStatusActionTypes';

const { FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST } = flightStatusActionTypes;

export const selectedRecentSearchRequest = (state = null, action = {}) => {
  switch (action.type) {
    case FLIGHT_STATUS__SAVE_SELECTED_RECENT_SEARCH_REQUEST: {
      return _.cloneDeep(_.get(action, 'selectedRecentSearchRequest'));
    }
    default:
      return state;
  }
};
