// @flow
import _ from 'lodash';
import { matchPath } from 'react-router';
import { saveSelectedRecentSearchRequest } from 'src/carBooking/actions/carBookingActions';
import { getModalId } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { isOnWebViewLandingPage } from 'src/shared/helpers/webViewHelper';
import { getCurrentRouteState, hasAllInState } from 'src/shared/routeUtils/routeStateHelper';

const carBookingSearchInterceptor = (searchPagePath: string) => (interceptorContext: InterceptorContext) => {
  const { store, flowConfig } = interceptorContext;
  const state = _.cloneDeep(store.getState());
  const persistentHistory = _.get(state, 'persistentHistory');
  const currentRouteState = getCurrentRouteState(persistentHistory);
  const currentPathName = _.get(currentRouteState, 'pathname');
  const currentBackFrom = _.get(currentRouteState, 'backFrom.pathname');
  const isOnSearchPage = matchPath(currentPathName, { path: searchPagePath, exact: true });
  const isBackFromRecentPage = matchPath(currentBackFrom, { path: getNormalizedRoute({ routeName: 'recent' }), exact: true });
  const isWebViewReRoute = _.get(state, 'app.webView.isReRoute');
  const isModal = !!getModalId();
  const currentState = _.get(currentRouteState, 'state');
  const flowCleaner = _.get(flowConfig, 'flowCleaner');

  if (isOnWebViewLandingPage(persistentHistory, searchPagePath)) {
    if (hasAllInState(currentState, ['pickUp', 'dropOff'])) {
      return {
        interceptor() {
          store.dispatch(saveSelectedRecentSearchRequest(currentState));
        },
        ...interceptorContext
      };
    } else {
      return {
        interceptor() {
          !isWebViewReRoute && _.isFunction(flowCleaner) && flowCleaner();
        },
        ...interceptorContext
      };
    }
  }

  if (isOnSearchPage && (isBackFromRecentPage || isModal)) {
    return interceptorContext;
  }
};

export default carBookingSearchInterceptor;
