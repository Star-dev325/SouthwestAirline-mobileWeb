import { combineReducers } from 'redux';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const lastSearchedFundReducer = (state = false, action = {}) => {
  switch (action.type) {
    case AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND: {
      return action.lastSearchedFund;
    }
    default:
      return state;
  }
};

export default combineReducers({
  lastSearchedFund: lastSearchedFundReducer
});
