// @flow
import _ from 'lodash';

const addForceRedirectFlagInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { action, history } = interceptorContext;

  return {
    interceptor() {
      if (_.isEqual(history.location.state, { popup: 'open' })) {
        return history.push({ pathname: action.payload.pathname, state: { popup: 'open' } });
      } else {
        return history.push(action.payload.pathname);
      }
    },
    ...interceptorContext
  };
};

export default addForceRedirectFlagInterceptor;
