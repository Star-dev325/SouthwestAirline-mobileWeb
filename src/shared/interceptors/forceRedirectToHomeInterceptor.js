// @flow
import _ from 'lodash';

const forceRedirectToHomeInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { action, history } = interceptorContext;
  const nextPathname = _.get(action, 'payload.location.pathname');
  const shouldDoRefreshTransition = nextPathname !== '/';

  if (shouldDoRefreshTransition) {
    return {
      interceptor() {
        return history.push('/');
      },
      ...interceptorContext
    };
  }

  return interceptorContext;
};

export default forceRedirectToHomeInterceptor;
