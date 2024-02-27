import _ from 'lodash';
import AirChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { combineReducers } from 'redux';

const { AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS } = AirChangeActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS:
      return _.cloneDeep(action.response);
    default:
      return state;
  }
};

export default combineReducers({ response });
