import _ from 'lodash';
import { combineReducers } from 'redux';
import AirChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { 
  AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS,
  AIR_CHANGE__SAVE_PNR,
  AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS
} = AirChangeActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS: 
    case AIR_CHANGE__FETCH_SPLIT_PNR_RESERVATION_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.changeFlightPage', {}));
    }

    default:
      return state;
  }
};

const pnr = (state = null, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SAVE_PNR: {
      return action.pnr;
    }
    default:
      return state;
  }
};

export const changeFlightPage = combineReducers({ response, pnr });
