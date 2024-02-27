import _ from 'lodash';
import { combineReducers } from 'redux';

import TravelAdvisoryActionTypes from 'src/travelAdvisory/actions/travelAdvisoryActionTypes';

const messageTravelAdvisory = (state = null, action = {}) => {
  switch (action.type) {
    case TravelAdvisoryActionTypes.TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES_SUCCESS: {
      return _.cloneDeep(action.response.messageTravelAdvisory);
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  messageTravelAdvisory
});
