// @flow
import _ from 'lodash';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';

const forceBackToHomeInterceptor = (interceptorContext: InterceptorContext) => {
  const { history, store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);

  const forceBackToHome = _.get(currentState, 'forceBackToHome');

  if (forceBackToHome) {
    return {
      interceptor() {
        return history.push('/');
      },
      ...interceptorContext
    };
  }
};

export default forceBackToHomeInterceptor;
