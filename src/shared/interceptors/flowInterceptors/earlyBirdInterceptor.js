import _ from 'lodash';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import forceBackToHomeInterceptor from 'src/shared/interceptors/forceBackToHomeInterceptor';
import payPalResumeInterceptor from 'src/shared/interceptors/payPalResumeInterceptor';
import cleanFlowWhenHasQueryFlagInterceptor from 'src/shared/interceptors/cleanFlowWhenHasQueryFlagInterceptor';

const config = {
  name: 'earlyBird',
  path: '/earlybird',
  pages: {
    earlyBirdReviewFromPayPalPage: '^/earlybird/(checkin/[0-9A-Z]{6}/)?(review|purchase)(/(paypal|paypal-canceled))?$'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    payPalResumeInterceptor(config.pages.earlyBirdReviewFromPayPalPage),
    cleanFlowWhenHasQueryFlagInterceptor,
    cleanFlowInterceptor,
    redirectFlowInterceptor,
    forceBackToHomeInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
