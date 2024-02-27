import _ from 'lodash';
import { combineReducers } from 'redux';

import TravelFundsActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const { TRAVEL_FUNDS__UPDATE_SELECTED_APPLY_TAB } = TravelFundsActionTypes;

const {
  SHARED__RESET_CALCULATE_FLOW_DATA,
  SHARED__CALC_FUNDS_SUCCESS,
  SHARED__REMOVE_TRAVEL_FUND_SUCCESS,
  SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS
} = SharedActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case SHARED__CALC_FUNDS_SUCCESS:
    case SHARED__REMOVE_TRAVEL_FUND_SUCCESS:
    case SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const currentlySelectedTab = (state = 'travel-funds', action = {}) => {
  switch (action.type) {
    case TRAVEL_FUNDS__UPDATE_SELECTED_APPLY_TAB: {
      return action.selection;
    }
    default:
      return state;
  }
};

const applyTravelFundsPageReducers = combineReducers({
  response,
  currentlySelectedTab
});

export const applyTravelFunds = (state = {}, action = {}) => {
  if (action.type === SHARED__RESET_CALCULATE_FLOW_DATA) {
    return applyTravelFundsPageReducers(undefined, '@@INIT');
  }

  return applyTravelFundsPageReducers(state, action);
};
