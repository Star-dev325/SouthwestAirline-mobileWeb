// @flow
import { getPrevRouteState } from 'src/shared/routeUtils/routeStateHelper';

const forceRedirectInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { store, history } = interceptorContext;
  const prevRouteState = getPrevRouteState(store.getState().persistentHistory);

  return {
    interceptor() {
      return history.push(prevRouteState.forceRedirect);
    },
    ...interceptorContext
  };
};

export default forceRedirectInterceptor;
