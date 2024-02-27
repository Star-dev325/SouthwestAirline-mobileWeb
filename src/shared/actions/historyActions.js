import store2 from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';
import historyActionTypes from 'src/shared/actions/historyActionTypes';
import {
  getCurrentRouteState,
  isRefresh,
  isBrowserBackOrForward,
  isExactMatchRoutePath
} from 'src/shared/routeUtils/routeStateHelper';
import refreshWhiteList from 'src/shared/constants/refreshWhiteList';
import { getUpdatedRouteState } from 'src/shared/helpers/historyHelper';

const { PERSISTENT_HISTORY_KEY } = StorageKeys;
const {
  HISTORY__SAVE_CHANGE,
  HISTORY__CLEAR_ALL,
  HISTORY__UPDATE_ALL,
  HISTORY__ADD_FORCE_REDIRECT,
  HISTORY__ADD_BACK_HOME
} = historyActionTypes;

export const saveHistoryChange = (nextRouteState) => (dispatch, getState) => {
  const currentRouteState = getCurrentRouteState(getState().persistentHistory);
  const routeState = getUpdatedRouteState(getState().persistentHistory, nextRouteState);

  dispatch({
    type: HISTORY__SAVE_CHANGE,
    payload: {
      routeState
    }
  });

  store2.session(PERSISTENT_HISTORY_KEY, getState().persistentHistory);

  const isOutOfRefreshWhiteList = !isExactMatchRoutePath(nextRouteState, refreshWhiteList);

  if (isRefresh(currentRouteState) && isBrowserBackOrForward(nextRouteState) && isOutOfRefreshWhiteList) {
    dispatch(addHistoryForceRedirect(currentRouteState.pathname));
  }
};

export const addHistoryForceRedirect = (pathname) => (dispatch, getState) => {
  dispatch({
    type: HISTORY__ADD_FORCE_REDIRECT,
    payload: {
      pathname
    }
  });

  store2.session(PERSISTENT_HISTORY_KEY, getState().persistentHistory);
};

export const addHistoryBackToHome = (forceBackToHome) => (dispatch, getState) => {
  dispatch({
    type: HISTORY__ADD_BACK_HOME,
    payload: {
      forceBackToHome
    }
  });

  store2.session(PERSISTENT_HISTORY_KEY, getState().persistentHistory);
};

export const updateAllHistory = (persistentHistory) => {
  store2.session(PERSISTENT_HISTORY_KEY, persistentHistory);

  return {
    type: HISTORY__UPDATE_ALL,
    payload: {
      persistentHistory
    }
  };
};

export const cleanAllHistory = () => {
  store2.session(PERSISTENT_HISTORY_KEY, []);

  return {
    type: HISTORY__CLEAR_ALL
  };
};
