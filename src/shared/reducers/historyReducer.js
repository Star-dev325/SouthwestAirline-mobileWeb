import _ from 'lodash';
import historyActionTypes from 'src/shared/actions/historyActionTypes';
import { getUpdatedRouteState, updateHistory } from 'src/shared/helpers/historyHelper';
import { LOCATION_CHANGE } from 'connected-react-router';
import store2 from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const {
  HISTORY__SAVE_CHANGE,
  HISTORY__CLEAR_ALL,
  HISTORY__UPDATE_ALL,
  HISTORY__ADD_FORCE_REDIRECT,
  HISTORY__ADD_BACK_HOME
} = historyActionTypes;

export const persistentHistory = (state = [], action = {}) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { location, action: payloadAction } = action.payload;
      const nextRouteState = _.merge({}, location, { action: _.lowerCase(payloadAction) });
      const routeState = getUpdatedRouteState(state, nextRouteState);
      const updatedHistory = updateHistory(state, routeState);

      store2.session(StorageKeys.PERSISTENT_HISTORY_KEY, updatedHistory);

      return updatedHistory;
    }
    case HISTORY__SAVE_CHANGE:
      return updateHistory(state, action.payload.routeState);
    case HISTORY__UPDATE_ALL:
      return _.cloneDeep(action.payload.persistentHistory);
    case HISTORY__ADD_FORCE_REDIRECT: {
      const currentRouteState = getCurrentRouteState(state);

      _.set(currentRouteState, 'forceRedirect', action.payload.pathname);

      return _.chain(state).dropRight().concat(currentRouteState).value();
    }
    case HISTORY__ADD_BACK_HOME: {
      const currentRouteState = getCurrentRouteState(state);

      _.set(currentRouteState, 'forceBackToHome', action.payload.forceBackToHome);

      return _.chain(state).dropRight().concat(currentRouteState).value();
    }
    case HISTORY__CLEAR_ALL:
      return [];
    default:
      return state;
  }
};
