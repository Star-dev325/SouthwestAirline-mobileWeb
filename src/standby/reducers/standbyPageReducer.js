import { combineReducers } from 'redux';
import _ from 'lodash';
import standbyActionTypes from 'src/standby/actions/standbyActionTypes';

const { STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS } = standbyActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

export const standbyPageReducers = combineReducers({
  response
});

export default standbyPageReducers;
