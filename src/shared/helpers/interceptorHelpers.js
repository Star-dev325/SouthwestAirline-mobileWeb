import { LOCATION_CHANGE } from 'connected-react-router';
import _ from 'lodash';
import historyActionTypes from 'src/shared/actions/historyActionTypes';
import * as HistoryActions from 'src/shared/actions/historyActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import corporateFlowPaths from 'src/shared/constants/corporateFlowPaths';
import refreshWhiteList from 'src/shared/constants/refreshWhiteList';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  getHistoryStateByIndex,
  getPrevRouteState,
  isBrowserBackOrForward,
  isExactMatchRoutePath,
  isRefresh
} from 'src/shared/routeUtils/routeStateHelper';
import store2 from 'store2';

const { HISTORY__ADD_FORCE_REDIRECT, HISTORY__SAVE_CHANGE } = historyActionTypes;

const { SHARED__ROUTE_CHANGED } = SharedActionTypes;

const getRouteStateByRouteChange = ({ action }) => {
  if (action.type === SHARED__ROUTE_CHANGED) {
    const { location, method } = action;

    return { ...location, action: method };
  }
};

const getRouteStateByLocationChange = ({ action }) => {
  if (action.type === LOCATION_CHANGE) {
    return action.payload.location;
  }
};

const getRouteStateByHistorySaveChange = ({ action }) => {
  if (action.type === HISTORY__SAVE_CHANGE) {
    return action.payload.routeState;
  }
};

const getRouteStateByLocationOrHistoryChange = ({ action }) =>
  getRouteStateByLocationChange({ action }) || getRouteStateByHistorySaveChange({ action });

export const isRouteChange = ({ action }) => !!getRouteStateByRouteChange({ action });

export const hasCorporateFlow = pathName =>
  corporateFlowPaths.find(corporateFlowPath => _.startsWith(pathName, corporateFlowPath));

export const didLeaveCorporateFlow = ({ action, store }) => {
  let leftCorporateFlow = false;

  if (isRouteChange({ action })) {
    const prevPath = getPrevRouteState(store.getState().persistentHistory)?.pathname;
    const newPath = action.location.pathname;

    if (hasCorporateFlow(prevPath) && !hasCorporateFlow(newPath)) {
      const loginInfo = store2.get(StorageKeys.OAUTH_LOGIN_STATUS) || {};

      leftCorporateFlow = _.includes(loginInfo.scope, 'swabiz');
    }
  }

  return leftCorporateFlow;
};

export const isBrowserRefreshAndOutOfWhiteList = ({ action }) => {
  const nextRouteState = _.get(action, 'payload.routeState');
  const isOutOfRefreshWhiteList = !isExactMatchRoutePath(nextRouteState, refreshWhiteList);

  return (
    action.type === HISTORY__SAVE_CHANGE && isRefresh(_.get(action, 'payload.routeState')) && isOutOfRefreshWhiteList
  );
};

export const isTransitionWithForceRedirect = ({ action, store }) => {
  const { persistentHistory } = store.getState();
  const nextRouteState = _.get(action, 'payload');
  const prevRouteState = _.cloneDeep(getHistoryStateByIndex(persistentHistory, -1));

  return (
    action.type === LOCATION_CHANGE &&
    !_.isEmpty(_.get(prevRouteState, 'forceRedirect')) &&
    isBrowserBackOrForward(nextRouteState)
  );
};

export const isAddingForceRedirect = ({ action }) => action.type === HISTORY__ADD_FORCE_REDIRECT;

export const isFlowPath =
  (flowPath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByRouteChange({ action }), 'pathname');

      return _.startsWith(pathname, flowPath);
    };

export const isFlowPathWithToggleOn =
  (flowPath, toggleName) =>
    ({ store, action }) => {
      const pathname = _.get(getRouteStateByRouteChange({ action }), 'pathname');
      const toggleState = _.get(store.getState(), `app.toggles.${toggleName}`, true);

      return _.startsWith(pathname, flowPath) && toggleState;
    };

export const isFlowPathByLocationChange =
  (flowPath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByLocationChange({ action }), 'pathname');

      return _.startsWith(pathname, flowPath);
    };

export const isPagePath =
  (pagePath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByRouteChange({ action }), 'pathname');

      return pagePath === pathname;
    };

export const isPagePathByLocationChange =
  (pagePath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByLocationChange({ action }), 'pathname');

      return pagePath === pathname;
    };

export const isPagePathByLocationOrHistoryChange =
  (pagePath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByLocationOrHistoryChange({ action }), 'pathname');

      return pagePath === pathname;
    };

export const isFlowPathByLocationOrHistoryChange =
  (flowPath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByLocationOrHistoryChange({ action }), 'pathname');

      return _.startsWith(pathname, flowPath);
    };

const isBrowserRefresh = ({ action }) =>
  action.type === HISTORY__SAVE_CHANGE && isRefresh(_.get(action, 'payload.routeState'));

export const isMatchPathAndPathChanged =
  (regexPath) =>
    ({ action, store }) => {
      if (isMatchPathBeforeRouteSaved(regexPath)({ action }) || isMatchPathBeforeLocationChange(regexPath)({ action })) {
        if (isBrowserRefresh({ action })) {
          return true;
        }

        if (action.type === LOCATION_CHANGE) {
          const state = store.getState();
          const previousPath = _.get(state, 'router.location.pathname');
          const currentPath = _.get(action, 'payload.location.pathname');
          const pathChanged = previousPath !== currentPath;

          return pathChanged;
        }
      }

      return false;
    };

export const isMatchPath =
  (regexPath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByRouteChange({ action }), 'pathname');
      const regex = new RegExp(regexPath);

      return regex.test(pathname);
    };

export const isMatchSearch =
  (regexSearch) =>
    ({ action }) => {
      const search = _.get(getRouteStateByRouteChange({ action }), 'search');
      const regex = new RegExp(regexSearch);

      return regex.test(search);
    };

export const isMatchPathAndSearch = (regexPath, regexSearch) => (interceptorContext) => 
  isMatchPath(regexPath)({ ...interceptorContext }) && isMatchSearch(regexSearch)({ ...interceptorContext });

export const isMatchPathByHistory =
  (regexPath) =>
    ({ history }) => {
      const pathname = _.get(history.location, 'pathname');
      const regex = new RegExp(regexPath);

      return regex.test(pathname);
    };

export const isMatchSearchByHistory =
  (regexSearch) =>
    ({ history }) => {
      const search = _.get(history.location, 'search');
      const regex = new RegExp(regexSearch);

      return regex.test(search);
    };

export const isMatchPathAndSearchByHistory = (regexPath, regexSearch) => (interceptorContext) =>
  isMatchPathByHistory(regexPath)({ ...interceptorContext }) &&
  isMatchSearchByHistory(regexSearch)({ ...interceptorContext });

export const isMatchPathBeforeLocationChange =
  (regexPath) =>
    ({ action }) => {
      const pathname = _.get(getRouteStateByLocationChange({ action }), 'pathname');
      const regex = new RegExp(regexPath);

      return regex.test(pathname);
    };

export const isMatchPathBeforeRouteSaved =
  (regexPath) =>
    ({ action }) => {
      const currentPath = _.get(getRouteStateByHistorySaveChange({ action }), 'pathname');
      const regex = new RegExp(regexPath);

      return regex.test(currentPath);
    };

export const forceRedirectHelper = (store, history) => {
  const forceRedirect = (dispatch, routeName) => {
    dispatch(HistoryActions.addHistoryForceRedirect(routeName));

    return routeName;
  };

  const transition = (transitionTo, routeName) => transitionTo(routeName);

  const callForceRedirectAction = _.partial(forceRedirect, store.dispatch);
  const callTransition = _.partial(transition, history.push);

  return _.flowRight(callTransition, callForceRedirectAction);
};
