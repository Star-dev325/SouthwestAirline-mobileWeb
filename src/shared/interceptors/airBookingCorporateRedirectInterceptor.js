// @flow
import _ from 'lodash';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { matchPath } from 'react-router';

const airBookingCorporateRedirectInterceptor = (interceptorContext: InterceptorContext) => {
  const { flowConfig, history, store } = interceptorContext;
  const state = _.cloneDeep(store.getState());
  const isTokenConverted = _.get(state, 'app.account.isTokenConverted', false);
  const { persistentHistory } = state;
  const currentState = getCurrentRouteState(persistentHistory);
  const entryPage = _.get(flowConfig, 'entry');
  const backFrom = _.get(currentState, 'backFrom.pathname');
  const isBackFromNonBookingPage = backFrom && !matchPath(backFrom, { path: '/air/booking', exact: false });
  const isAirBookingEntryPage = entryPage === currentState.pathname;

  const shouldRedirect = () => isTokenConverted && isBackFromNonBookingPage && !isAirBookingEntryPage;

  if (shouldRedirect()) {
    return {
      interceptor() {
        history.push(entryPage);
      },
      ...interceptorContext
    };
  }
};

export default airBookingCorporateRedirectInterceptor;
