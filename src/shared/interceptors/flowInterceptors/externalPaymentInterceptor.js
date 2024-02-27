import _ from 'lodash';
import externalPaymentPageInterceptor from 'src/shared/interceptors/externalPaymentPageInterceptor';
import forceRedirectToHomeInterceptor from 'src/shared/interceptors/forceRedirectToHomeInterceptor';

const config = {
  name: 'externalPayment',
  path: '/payment/external',
  pages: {
    externalPaymentPage: '/payment/external'
  }
};

const interceptor = (interceptorContext) =>
  _.someExecute([externalPaymentPageInterceptor, forceRedirectToHomeInterceptor])(interceptorContext);

export default {
  ...config,
  interceptor
};
