import _ from 'lodash';
import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS, AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN } =
  airChangeActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.changePricingPage', {}));
    }
    default:
      return state;
  }
};

const resumeAfterLogin = (state = false, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN:
      return _.get(action, 'shouldResume');
    default:
      return state;
  }
};

export default combineReducers({ response, resumeAfterLogin });
