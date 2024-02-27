import _ from 'lodash';
import { getCurrentRouteState, getPrevRouteState, isRefresh } from 'src/shared/routeUtils/routeStateHelper';

const recentSearchRefreshInterceptor = (interceptorContext) => {
  const { history, store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);
  const previousState = getPrevRouteState(persistentHistory);

  if (isRefresh(currentState)) {
    if (_.isEmpty(previousState)) {
      return {
        interceptor() {
          history.replace('/flight-status');
        },
        ...interceptorContext
      };
    }

    return {
      interceptor() {
        history.goBack();
      },
      ...interceptorContext
    };
  }

  return interceptorContext;
};

export default recentSearchRefreshInterceptor;
