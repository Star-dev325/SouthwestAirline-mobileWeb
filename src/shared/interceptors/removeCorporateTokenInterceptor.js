// @flow
import { removeSelectedCompany } from 'src/shared/actions/accountActions';

const removeCorporateTokenInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { store } = interceptorContext;

  return {
    interceptor() {
      store.dispatch(removeSelectedCompany());
    },
    ...interceptorContext
  };
};

export default removeCorporateTokenInterceptor;
