import { combineReducers } from 'redux';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

const specialAssistanceSelectionReducer = (state = false, action = {}) => {
  switch (action.type) {
    case AnalyticsActionTypes.SPECIAL_ASSISTANCE_SELECTED: {
      return action.selected;
    }
    default:
      return state;
  }
};

export default combineReducers({
  selectionMade: specialAssistanceSelectionReducer
});
