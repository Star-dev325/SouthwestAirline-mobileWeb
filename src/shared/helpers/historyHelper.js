// @flow
import _ from 'lodash';
import BrowserObject from 'src/shared/helpers/browserObject';
import { history } from 'src/appHistory';
import {
  getHistoryStateByIndex,
  isRefreshAtSamePage,
  isBrowserBack,
  isBackOrForwardToTheCurrentPage,
  getPrevRouteState,
  getCurrentRouteState
} from 'src/shared/routeUtils/routeStateHelper';
import RouterStore from 'src/shared/stores/routerStore';

const { window } = BrowserObject;

const MAXIMUM_HISTORY_LENGTH = 50;
let forceForward;

function _forceBack(conditionFn: (*) => boolean) {
  return function forceBack() {
    if (conditionFn()) {
      history.goBack();
    }
  };
}

export const addForbidUserClickBrowserForward = (conditionFn: (*) => boolean) => {
  const forceBack = _forceBack(conditionFn);

  window.addEventListener('popstate', forceBack);

  return forceBack;
};

export const removeForbidUserClickBrowserForward = (forceBack: () => void) => {
  window.removeEventListener('popstate', forceBack);
};

export const addForbidUserClickBrowserBack = (conditionFn: (*) => boolean) => {
  forceForward = () => conditionFn() && history.goForward();

  window.addEventListener('popstate', forceForward);

  return forceForward;
};

export const removeForbidUserClickBrowserBack = () => {
  window.removeEventListener('popstate', forceForward);
};

export const updateHistory = (persistentHistory: Array<*>, nextRouteState: *) => {
  let updatedHistory = [];
  const prevRouteState = getHistoryStateByIndex(persistentHistory, -2);
  const currentRouteState = getHistoryStateByIndex(persistentHistory, -1);

  if (isBrowserBack(nextRouteState, prevRouteState)) {
    const stateWithRedirectLocation = _.merge(nextRouteState, {
      forceRedirect: _.get(prevRouteState, 'forceRedirect'),
      forceBackToHome: _.get(prevRouteState, 'forceBackToHome')
    });

    updatedHistory = _.chain(persistentHistory).dropRight(2).concat(stateWithRedirectLocation).value();
  } else if (isRefreshAtSamePage(nextRouteState, currentRouteState)) {
    updatedHistory = _.chain(persistentHistory)
      .dropRight()
      .concat(
        _.merge({}, currentRouteState, {
          action: null
        })
      )
      .value();
  } else if (isBackOrForwardToTheCurrentPage(currentRouteState, nextRouteState)) {
    return persistentHistory;
  } else {
    updatedHistory = _.concat(persistentHistory, nextRouteState);
  }

  return _.slice(updatedHistory, -MAXIMUM_HISTORY_LENGTH);
};

export const getUpdatedRouteState = (persistentHistoryState: Array<*>, nextRouteState: *) => {
  const prevRouteState = getPrevRouteState(persistentHistoryState);
  const currentRouteState = getCurrentRouteState(persistentHistoryState);
  const isBack = isBrowserBack(nextRouteState, prevRouteState);

  RouterStore.setIsBrowserBack(isBack);
  RouterStore.setLastPopedState(_.last(persistentHistoryState));

  return isBack
    ? _.merge({}, nextRouteState, { backFrom: { pathname: _.get(currentRouteState, 'pathname') } })
    : nextRouteState;
};
