import _ from 'lodash';
import { matchPath } from 'react-router';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { isObject } from 'src/shared/helpers/jsUtils';

export function isRefresh(routeState) {
  return _.get(routeState, 'action') === null;
}

export function isTransitionOrRefresh(routeState) {
  const action = _.lowerCase(_.get(routeState, 'action'));

  return action === 'push' || isRefresh(routeState);
}

export function isPushReplaceOrRefresh(routeState) {
  const action = _.lowerCase(_.get(routeState, 'action'));

  return action === 'push' || action === 'replace' || isRefresh(routeState);
}

export function isNotInUrlRange(flowUrlRange, prevPath) {
  return _.every(flowUrlRange, (path) => !_.startsWith(prevPath, path));
}

export function isOnEntryRoute(currentRouteName, entryRouteName) {
  return isObject(entryRouteName) ?
    Object.values(entryRouteName).some((path) => matchPath(currentRouteName, { path, exact: true })?.isExact ?? false)
    : matchPath(currentRouteName, { path: entryRouteName, exact: true })?.isExact ?? false;
}

export function isOnExitRoute(currentRouteName, exitRouteName) {
  return isObject(exitRouteName) ?
    Object.values(exitRouteName).some((path) => matchPath(currentRouteName, { path, exact: true })?.isExact ?? false)
    : matchPath(currentRouteName, { path: exitRouteName, exact: true })?.isExact ?? false;
}

export function isFuzzyMatchRoutePath(state, routePathList = []) {
  if (!state) {
    return false;
  }

  const { pathname } = state;
  const pathIndexInRoutePathList = _.findIndex(routePathList, (routePath) => matchPath(pathname, routePath));

  return pathIndexInRoutePathList !== -1;
}

export function isExactMatchRoutePath(state, routePathList = []) {
  if (!state) {
    return false;
  }

  const { pathname } = state;

  const pathIndexInRoutePathList = _.findIndex(routePathList, (routePath) =>
    matchPath(pathname, {
      path: routePath,
      exact: true
    })
  );

  return pathIndexInRoutePathList !== -1;
}

export function isBrowserBackOrForward(routeState) {
  return _.lowerCase(_.get(routeState, 'action')) === 'pop';
}

export function isPrevRouteStaySame(nextState, prevState) {
  return (
    _.get(nextState, 'pathname', 'next') === _.get(prevState, 'pathname', 'prev') &&
    _.get(nextState, 'key') === _.get(prevState, 'key')
  );
}

export function getHistoryStateByIndex(routeHistory = [], index = 0) {
  let historyIndex = index;

  if (index < 0) {
    historyIndex = routeHistory.length - Math.abs(index);
  }

  return routeHistory[historyIndex];
}

export function isRefreshAtSamePage(nextRouteState, currentRouteState) {
  return isRefresh(nextRouteState) && _.get(nextRouteState, 'pathname') === _.get(currentRouteState, 'pathname');
}

export function isBackOrForwardToTheCurrentPage(currentRouteState, nextRouteState) {
  return (
    isBrowserBackOrForward(nextRouteState) &&
    _.get(currentRouteState, 'pathname') === _.get(nextRouteState, 'pathname') &&
    _.isEmpty(_.get(nextRouteState, 'state'))
  );
}

export function isBrowserBack(nextRouteState, prevRouteState) {
  return isBrowserBackOrForward(nextRouteState) && isPrevRouteStaySame(nextRouteState, prevRouteState);
}

export function getCurrentRouteState(persistentHistory) {
  return _.cloneDeep(getHistoryStateByIndex(persistentHistory, -1));
}

export function getPrevRouteState(persistentHistory) {
  return _.cloneDeep(getHistoryStateByIndex(persistentHistory, -2));
}

export function shouldCleanFlow(routeState) {
  return transformSearchToQuery(routeState?.search).cleanFlow === 'true';
}

export function isModalOpen(routeState) {
  return !!(routeState && routeState.search && routeState.search.includes('_modal='));
}

export function isComingFromHomePage(persistentHistory) {
  let routeState;
  let index = -1;

  do {
    routeState = getHistoryStateByIndex(persistentHistory, index--);
  } while (routeState && routeState.action === 'replace');

  const redirectRouteState = getHistoryStateByIndex(persistentHistory, index);

  return !!redirectRouteState && redirectRouteState.pathname === '/';
}

export function isPopupOpen(currentRoute) {
  const currentRouteState = _.get(currentRoute, 'state', { popup: 'closed' });
  const popupState = _.get(currentRouteState, 'popup', 'closed');

  return popupState === 'open';
}

export const hasAllInState = (state, keys) => _.hasAll(state, keys);
