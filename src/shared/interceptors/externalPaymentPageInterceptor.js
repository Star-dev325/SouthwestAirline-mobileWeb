// @flow
import _ from 'lodash';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';

const externalPaymentPageInterceptor = (interceptorContext: InterceptorContext) => {
  const { action } = interceptorContext;
  const search = _.get(action, 'payload.location.search');

  const { persistenceIdentifier, provider, paymentMethod } = transformSearchToQuery(search) || {};

  if (persistenceIdentifier && provider && paymentMethod) {
    return {
      interceptor() {},
      ...interceptorContext
    };
  }
};

export default externalPaymentPageInterceptor;
