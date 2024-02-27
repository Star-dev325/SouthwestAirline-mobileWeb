import _ from 'lodash';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';

const config = {
  name: 'sameDay',
  path: '/same-day',
  pages: {
    sameDayPriceDifferenceFromPayPalPage: '^/same-day/price-difference(/(paypal|paypal-canceled))?$',
    sameDayRefundMethodFromPayPalPage: '^/same-day/refund-method(/(paypal|paypal-canceled))?$'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = { ..._.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {}) };
  const state = store.getState();

  if (state?.app?.webView?.isWebView) {
    flowConfig.entry = '/same-day/bound-selection'; 
  }

  return _.someExecute([
    payPalResumeInterceptor(config.pages.sameDayPriceDifferenceFromPayPalPage),
    payPalResumeInterceptor(config.pages.sameDayRefundMethodFromPayPalPage),
    cleanFlowInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
