import _ from 'lodash';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import forceBackToHomeInterceptor from 'src/shared/interceptors/forceBackToHomeInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';

const config = {
  name: 'companion',
  path: '/companion',
  pages: {
    purchaseReviewFromPayPalPage: '^/companion/purchase(/(paypal|paypal-canceled))?$'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    payPalResumeInterceptor(config.pages.purchaseReviewFromPayPalPage),
    cleanFlowInterceptor,
    redirectFlowInterceptor,
    forceBackToHomeInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
