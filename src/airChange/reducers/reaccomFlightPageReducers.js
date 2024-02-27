import _ from 'lodash';
import { combineReducers } from 'redux';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS, AIR_CHANGE__SAVE_REACCOM_PNR } = airChangeActionTypes;

const response = (state = {}, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS: {
      return _.cloneDeep(_.get(action, 'response.reaccomFlightPage', {}));
    }
    default:
      return state;
  }
};

const pnr = (state = null, action = {}) => {
  switch (action.type) {
    case AIR_CHANGE__SAVE_REACCOM_PNR: {
      return _.cloneDeep(action.pnr);
    }
    default:
      return state;
  }
};

export default combineReducers({ response, pnr });
