import * as HistoryActions from 'src/shared/actions/historyActions';
import { setIsRedirectingPath } from 'src/shared/actions/sharedActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { getCurrentRouteState, isOnExitRoute } from 'src/shared/routeUtils/routeStateHelper';

const { COMPLETED } = STATUS;
const homeRoutePath = '/';

const forceRedirect = (dispatch, routeName) => {
  dispatch(HistoryActions.addHistoryForceRedirect(routeName));

  return routeName;
};

const transition = (transitionTo, routeName) => transitionTo(routeName);

const standbyRedirectFlowInterceptor = (interceptorContext) => {
  const { flowConfig, history, store } = interceptorContext;

  if (!flowConfig || Object.keys(flowConfig).length === 0) {
    return;
  }
  const state = { ...store.getState() };

  const { persistentHistory } = state;
  const isWebView = state.app?.webView?.isWebView;
  const { exit: exitRouteName, flowStatusGetter } = flowConfig;
  const flowStatus = flowStatusGetter();

  const currentState = getCurrentRouteState(persistentHistory);
  const currentRouteName = currentState.pathname;
  const onExitRoute = isOnExitRoute(currentRouteName, exitRouteName);

  let redirectPath;

  if (flowStatus === COMPLETED && !onExitRoute) {
    redirectPath = homeRoutePath;

    !isWebView && store.dispatch(setIsRedirectingPath(true));
  }

  return (
    redirectPath && {
      interceptor() {
        if (isWebView) {
          store.dispatch(WebViewActions.exitWebView());
        } else {
          forceRedirect(store.dispatch, redirectPath);
          transition(history.push, redirectPath);
        }
      },
      ...interceptorContext
    }
  );
};

export default standbyRedirectFlowInterceptor;
