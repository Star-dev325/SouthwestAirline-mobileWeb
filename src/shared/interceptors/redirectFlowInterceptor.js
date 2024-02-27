import _ from 'lodash';
import * as HistoryActions from 'src/shared/actions/historyActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { setIsRedirectingPath } from 'src/shared/actions/sharedActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { initialRouteIndex } from 'src/shared/constants/routeFlow';
import { isObject } from 'src/shared/helpers/jsUtils';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import {
  getCurrentRouteState,
  isFuzzyMatchRoutePath,
  isOnEntryRoute,
  isOnExitRoute
} from 'src/shared/routeUtils/routeStateHelper';

const { COMPLETED, IN_PROGRESS, INITIAL } = STATUS;
const homeRoutePath = '/';

const forceRedirect = (dispatch, routeName) => {
  dispatch(HistoryActions.addHistoryForceRedirect(routeName));

  return routeName;
};

const transition = (transitionTo, routeName) => transitionTo(routeName);

const redirectFlowInterceptor = (interceptorContext) => {  
  const { flowConfig, history, store } = interceptorContext;

  if (_.isEmpty(flowConfig)) {
    return;
  }
  const state = _.cloneDeep(store.getState());

  const { persistentHistory } = state;
  const isWebView = _.get(state, 'app.webView.isWebView', false);
  const { entry: entryRouteName, exit: exitRouteName, flowStatusGetter } = flowConfig;
  const flowStatus = flowStatusGetter();
  const currentState = getCurrentRouteState(persistentHistory);
  const currentRouteName = currentState.pathname;
  const { pickUpLocation, searchToken } = transformSearchToQuery(currentState?.search);
  const onExitRoute = isOnExitRoute(currentRouteName, exitRouteName);
  const onEntryRoute = isOnEntryRoute(currentRouteName, entryRouteName);

  const callForceRedirectAction = _.partial(forceRedirect, store.dispatch);
  const callTransition = _.partial(transition, history.push);

  const redirect = _.flowRight(callTransition, callForceRedirectAction);
  const isEntryFlowMatch = isObject(entryRouteName) ?
    Object.values(entryRouteName).some((currentPath) => currentPath === currentState.pathname)
    : entryRouteName === currentState.pathname;
  const isInitialPage = isEntryFlowMatch || isFuzzyMatchRoutePath(currentState, flowConfig.includedInitialPages);

  let redirectPath;

  switch (flowStatus) {
    case INITIAL:
      !isInitialPage && (redirectPath = entryRouteName);
      break;
    case IN_PROGRESS:
      onExitRoute && (redirectPath = homeRoutePath);
      break;
    case COMPLETED:
      !onEntryRoute && !onExitRoute && (redirectPath = homeRoutePath);
      break;
    default:
      onExitRoute ? (redirectPath = homeRoutePath) : !onEntryRoute && (redirectPath = entryRouteName);
      break;
  }

  redirectPath = isObject(redirectPath) ?
    redirectPath?.canonicalPath ?? redirectPath[Object.keys(redirectPath)[initialRouteIndex]]
    : redirectPath;

  !searchToken && !pickUpLocation && redirectPath && !isWebView && store.dispatch(setIsRedirectingPath(true));

  return (
    !searchToken && !pickUpLocation && redirectPath && {
      interceptor() {
        if (isWebView) {
          store.dispatch(WebViewActions.exitWebView());
        } else {
          redirect(redirectPath);
        }
      },
      ...interceptorContext
    }
  );
};

export default redirectFlowInterceptor;
