import _ from 'lodash';
import upgradedFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import { combineReducers } from 'redux';

const { AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN, AIR_UPGRADE__SEARCH_REQUEST } = upgradedFareActionTypes;

export const resumeAfterLogin = (state = false, action = {}) => {
  switch (action.type) {
    case AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN:
      return _.get(action, 'shouldResume', false);
    default:
      return state;
  }
};
export const searchRequest = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_UPGRADE__SEARCH_REQUEST:
      return action.searchRequest;
    default:
      return state;
  }
};
export default combineReducers({ resumeAfterLogin, searchRequest });