import { combineReducers } from 'redux';

import * as CheckInReducers from 'src/checkIn/reducers/checkInReducers';
import checkInFlowData from 'src/checkIn/reducers/checkInFlowDataReducers';
import checkInActionTypes from 'src/checkIn/actions/checkInActionTypes';

const { CHECK_IN__RESET_FLOW_DATA } = checkInActionTypes;

const checkInReducers = combineReducers({
  ...CheckInReducers,
  checkInFlowData
});

const checkIn = (state, action) => {
  if (action.type === CHECK_IN__RESET_FLOW_DATA) {
    return checkInReducers(undefined, action);
  }

  return checkInReducers(state, action);
};

export default checkIn;
